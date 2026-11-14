// Map queries, walkability, 4-direction BFS pathing and mover stepping.
// Coordinates: a mover at integer (x, y) stands on the center of tile (x, y). Waypoints are tile coords.
import { BUILDINGS, MAP } from './content';
import type { BuildingId, GameState, Mover, Ref } from './types';

export interface Rect { x: number; y: number; w: number; h: number }

const W = MAP.width;
const H = MAP.height;
// Neighbour order is fixed so BFS results are identical in every port: right, left, down, up.
const DIRS: [number, number][] = [[1, 0], [-1, 0], [0, 1], [0, -1]];

function baseWalkable(x: number, y: number): boolean {
  if (x < 0 || y < 0 || x >= W || y >= H) return false;
  const c = MAP.rows[y][x];
  return c === '.' || c === '=' || c === 'P';
}

/** Buildings that physically stand on the map: built ones and construction sites. */
export function standingBuildings(s: GameState): BuildingId[] {
  const out: BuildingId[] = [];
  for (const id of Object.keys(BUILDINGS)) if (s.built[id] || s.sites[id]) out.push(id);
  return out;
}

/** Grid of walkable tiles (1 = walkable). Recomputed on demand; the map is tiny. */
export function walkGrid(s: GameState): Uint8Array {
  const g = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) g[y * W + x] = baseWalkable(x, y) ? 1 : 0;
  for (const n of s.nodes) if (n.active) g[n.y * W + n.x] = 0;
  for (const id of standingBuildings(s)) {
    const b = BUILDINGS[id];
    for (let y = b.y; y < b.y + b.h; y++) for (let x = b.x; x < b.x + b.w; x++) if (x >= 0 && y >= 0 && x < W && y < H) g[y * W + x] = 0;
  }
  return g;
}

export function isWalkable(s: GameState, x: number, y: number): boolean {
  if (x < 0 || y < 0 || x >= W || y >= H || x !== Math.floor(x) || y !== Math.floor(y)) return false;
  return walkGrid(s)[y * W + x] === 1;
}

export function footprint(s: GameState, ref: Ref): Rect {
  if (ref.k === 'node') { const n = s.nodes[ref.i]; return { x: n.x, y: n.y, w: 1, h: 1 }; }
  if (ref.k === 'bld') { const b = BUILDINGS[ref.id]; return { x: b.x, y: b.y, w: b.w, h: b.h }; }
  return { x: ref.x, y: ref.y, w: 1, h: 1 };
}

export function refAt(s: GameState, x: number, y: number): Ref {
  for (let i = 0; i < s.nodes.length; i++) {
    const n = s.nodes[i];
    if (n.active && n.x === x && n.y === y) return { k: 'node', i };
  }
  for (const id of standingBuildings(s)) {
    const b = BUILDINGS[id];
    if (x >= b.x && x < b.x + b.w && y >= b.y && y < b.y + b.h) return { k: 'bld', id };
  }
  return { k: 'tile', x, y };
}

export function sameRef(a: Ref | null, b: Ref | null): boolean {
  if (!a || !b) return a === b;
  if (a.k === 'node' && b.k === 'node') return a.i === b.i;
  if (a.k === 'bld' && b.k === 'bld') return a.id === b.id;
  if (a.k === 'tile' && b.k === 'tile') return a.x === b.x && a.y === b.y;
  return false;
}

/** Tiles a mover may stand on to use a ref: the edge-adjacent tiles around its footprint ('tile' refs: the tile itself). */
export function goalTiles(s: GameState, ref: Ref): [number, number][] {
  if (ref.k === 'tile') return [[ref.x, ref.y]];
  const r = footprint(s, ref);
  const out: [number, number][] = [];
  for (let x = r.x; x < r.x + r.w; x++) { out.push([x, r.y - 1]); out.push([x, r.y + r.h]); }
  for (let y = r.y; y < r.y + r.h; y++) { out.push([r.x - 1, y]); out.push([r.x + r.w, y]); }
  return out;
}

export function tileOf(m: Mover): [number, number] { return [Math.round(m.x), Math.round(m.y)]; }

/** True if (x,y) is a tile from which `ref` can be used. */
export function tileServes(s: GameState, ref: Ref, x: number, y: number): boolean {
  return goalTiles(s, ref).some(([gx, gy]) => gx === x && gy === y);
}

/**
 * BFS from (sx,sy) to any walkable goal tile of `ref`. Returns waypoints excluding the start tile,
 * [] if already there, or null if unreachable. The start tile itself may be blocked (we only walk off it).
 */
export function findPath(s: GameState, sx: number, sy: number, ref: Ref, grid = walkGrid(s)): [number, number][] | null {
  const goal = new Uint8Array(W * H);
  let any = false;
  for (const [x, y] of goalTiles(s, ref)) {
    if (x >= 0 && y >= 0 && x < W && y < H && grid[y * W + x]) { goal[y * W + x] = 1; any = true; }
  }
  if (!any || sx < 0 || sy < 0 || sx >= W || sy >= H) return null;
  const start = sy * W + sx;
  if (goal[start]) return [];
  const prev = new Int32Array(W * H).fill(-1);
  prev[start] = start;
  const queue = [start];
  for (let qi = 0; qi < queue.length; qi++) {
    const cur = queue[qi];
    const cx = cur % W, cy = (cur - cx) / W;
    for (const [dx, dy] of DIRS) {
      const nx = cx + dx, ny = cy + dy;
      if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      const ni = ny * W + nx;
      if (prev[ni] !== -1 || !grid[ni]) continue;
      prev[ni] = cur;
      if (goal[ni]) {
        const path: [number, number][] = [];
        for (let p = ni; p !== start; p = prev[p]) path.push([p % W, Math.floor(p / W)]);
        return path.reverse();
      }
      queue.push(ni);
    }
  }
  return null;
}

/** Path for a mover that may be between tiles: snaps back to its nearest tile center first. */
export function pathFor(s: GameState, m: Mover, ref: Ref, grid = walkGrid(s)): [number, number][] | null {
  const [tx, ty] = tileOf(m);
  const p = findPath(s, tx, ty, ref, grid);
  if (!p) return null;
  if (m.x !== tx || m.y !== ty) p.unshift([tx, ty]);
  return p;
}

/** Path length in steps (for choosing the nearest job). Infinity if unreachable. */
export function pathLength(s: GameState, m: Mover, ref: Ref, grid = walkGrid(s)): number {
  const p = pathFor(s, m, ref, grid);
  return p ? p.length : Infinity;
}

/** Moves along the path. Returns true on the step the mover reaches its final waypoint. */
export function stepMover(m: Mover, speed: number, dt: number): boolean {
  if (m.path.length === 0) return false;
  let budget = speed * dt;
  m.walkT += dt;
  while (budget > 0 && m.path.length > 0) {
    const [tx, ty] = m.path[0];
    const dx = tx - m.x, dy = ty - m.y;
    const d = Math.abs(dx) + Math.abs(dy); // 4-dir movement: one axis at a time
    if (dx !== 0) m.dir = dx > 0 ? 1 : -1;
    if (d <= budget) {
      m.x = tx; m.y = ty; budget -= d; m.path.shift();
    } else {
      if (dx !== 0) m.x += Math.sign(dx) * Math.min(Math.abs(dx), budget);
      else m.y += Math.sign(dy) * budget;
      budget = 0;
    }
  }
  if (m.path.length === 0) { m.walkT = 0; return true; }
  return false;
}

/** If a mover stands on a blocked tile (a building just went up there), move it to the nearest walkable tile. */
export function nudgeOut(s: GameState, m: Mover, grid = walkGrid(s)): boolean {
  const [tx, ty] = tileOf(m);
  if (tx >= 0 && ty >= 0 && tx < W && ty < H && grid[ty * W + tx]) return false;
  const seen = new Uint8Array(W * H);
  const sx = Math.min(W - 1, Math.max(0, tx)), sy = Math.min(H - 1, Math.max(0, ty));
  const queue = [sy * W + sx];
  seen[queue[0]] = 1;
  for (let qi = 0; qi < queue.length; qi++) {
    const cur = queue[qi];
    const cx = cur % W, cy = (cur - cx) / W;
    if (grid[cur]) { m.x = cx; m.y = cy; m.path = []; return true; }
    for (const [dx, dy] of DIRS) {
      const nx = cx + dx, ny = cy + dy;
      if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      const ni = ny * W + nx;
      if (!seen[ni]) { seen[ni] = 1; queue.push(ni); }
    }
  }
  return false;
}

export function distance(m: { x: number; y: number }, r: Rect): number {
  const cx = Math.max(r.x, Math.min(m.x, r.x + r.w - 1));
  const cy = Math.max(r.y, Math.min(m.y, r.y + r.h - 1));
  return Math.abs(m.x - cx) + Math.abs(m.y - cy);
}

/** The player is standing still on a tile from which `ref` can be used. */
export function isAdjacent(s: GameState, ref: Ref): boolean {
  const p = s.player;
  if (p.path.length) return false;
  const [tx, ty] = tileOf(p);
  if (p.x !== tx || p.y !== ty) return false;
  return tileServes(s, ref, tx, ty);
}
