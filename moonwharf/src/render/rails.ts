// Brass cargo rails (tech.rails): routed from the warehouse door to each built workshop and the stall
// with a BFS around buildings and nodes, plus little carts shuttling along them.
import type { GameState } from '../sim/types';
import { BUILDINGS, MAP, tileAt } from './content';
import { drawItem } from './glyphs';
import { Ctx, OUT, rr, ell, fs } from './util';

interface Route { id: string; pts: [number, number][]; len: number; seg: number[] }

let cacheKey = '';
let routes: Route[] = [];

function blockedGrid(s: GameState): Uint8Array {
  const W = MAP.width, H = MAP.height;
  const g = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const c = tileAt(x, y);
    if (c === '#' || c === ' ') g[y * W + x] = 1;
  }
  const mark = (id: string) => {
    const d = BUILDINGS[id]; if (!d) return;
    for (let y = d.y; y < d.y + d.h; y++) for (let x = d.x; x < d.x + d.w; x++) if (x >= 0 && y >= 0 && x < W && y < H) g[y * W + x] = 1;
  };
  for (const id in BUILDINGS) if (s.built[id] || s.sites[id] || BUILDINGS[id].startBuilt) mark(id);
  for (const n of s.nodes) g[n.y * W + n.x] = 1;
  return g;
}

function route(g: Uint8Array, sx: number, sy: number, id: string): [number, number][] | null {
  const W = MAP.width, H = MAP.height, d = BUILDINGS[id];
  const goal = new Map<number, [number, number]>(); // tile -> edge point of the building
  for (let x = d.x; x < d.x + d.w; x++) { goal.set((d.y + d.h) * W + x, [x + 0.5, d.y + d.h - 0.1]); goal.set((d.y - 1) * W + x, [x + 0.5, d.y + 0.2]); }
  for (let y = d.y; y < d.y + d.h; y++) { goal.set(y * W + d.x - 1, [d.x + 0.1, y + 0.5]); goal.set(y * W + d.x + d.w, [d.x + d.w - 0.1, y + 0.5]); }
  const prev = new Int32Array(W * H).fill(-2);
  const start = sy * W + sx;
  prev[start] = -1;
  const q = [start];
  for (let qi = 0; qi < q.length; qi++) {
    const cur = q[qi];
    if (goal.has(cur)) {
      const out: [number, number][] = [goal.get(cur)!];
      for (let c = cur; c !== -1; c = prev[c]) out.push([(c % W) + 0.5, Math.floor(c / W) + 0.5]);
      out.reverse();
      return out;
    }
    const cx = cur % W, cy = (cur / W) | 0;
    for (const [dx, dy] of [[0, 1], [1, 0], [-1, 0], [0, -1]]) {
      const nx = cx + dx, ny = cy + dy;
      if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      const ni = ny * W + nx;
      if (prev[ni] !== -2 || (g[ni] && !goal.has(ni))) continue;
      if (g[ni]) continue;
      prev[ni] = cur;
      q.push(ni);
    }
  }
  return null;
}

// collapse collinear points so corners are clean
function simplify(p: [number, number][]): [number, number][] {
  const out: [number, number][] = [p[0]];
  for (let i = 1; i < p.length - 1; i++) {
    const a = out[out.length - 1], b = p[i], c = p[i + 1];
    if ((Math.abs(a[0] - b[0]) < 1e-6 && Math.abs(b[0] - c[0]) < 1e-6) || (Math.abs(a[1] - b[1]) < 1e-6 && Math.abs(b[1] - c[1]) < 1e-6)) continue;
    out.push(b);
  }
  out.push(p[p.length - 1]);
  return out;
}

function ensure(s: GameState): void {
  const key = Object.keys(s.built).sort().join(',') + '|' + Object.keys(s.sites).sort().join(',') + '|' + s.nodes.length;
  if (key === cacheKey) return;
  cacheKey = key;
  routes = [];
  const wh = BUILDINGS.warehouse;
  if (!wh) return;
  const g = blockedGrid(s);
  const sx = wh.x + (wh.w >> 1), sy = wh.y + wh.h;
  if (g[sy * MAP.width + sx]) return;
  for (const id in BUILDINGS) {
    const d = BUILDINGS[id];
    if (!(d.kind === 'workshop' || d.kind === 'stall')) continue;
    if (!(s.built[id] || d.startBuilt)) continue;
    const r = route(g, sx, sy, id);
    if (!r) continue;
    const pts = simplify([[sx + 0.5, wh.y + wh.h - 0.1], ...r]);
    const seg: number[] = [];
    let len = 0;
    for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(l); len += l; }
    routes.push({ id, pts, len, seg });
  }
}

function offsetLine(pts: [number, number][], o: number): [number, number][] {
  const out: [number, number][] = [];
  for (let i = 0; i < pts.length; i++) {
    const a = pts[Math.max(0, i - 1)], b = pts[i], c = pts[Math.min(pts.length - 1, i + 1)];
    let n1x = 0, n1y = 0, n2x = 0, n2y = 0;
    if (i > 0) { const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1; n1x = -dy / l; n1y = dx / l; }
    if (i < pts.length - 1) { const dx = c[0] - b[0], dy = c[1] - b[1], l = Math.hypot(dx, dy) || 1; n2x = -dy / l; n2y = dx / l; }
    if (i === 0) { n1x = n2x; n1y = n2y; }
    if (i === pts.length - 1) { n2x = n1x; n2y = n1y; }
    let mx = n1x + n2x, my = n1y + n2y;
    const ml = Math.hypot(mx, my) || 1; mx /= ml; my /= ml;
    const k = 1 / Math.max(0.5, mx * n1x + my * n1y);
    out.push([b[0] + mx * o * k, b[1] + my * o * k]);
  }
  return out;
}

function stroke(ctx: Ctx, pts: [number, number][], col: string, w: number, dash?: number[]): void {
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.strokeStyle = col; ctx.lineWidth = w;
  if (dash) ctx.setLineDash(dash);
  ctx.stroke();
  if (dash) ctx.setLineDash([]);
}

export function drawRails(ctx: Ctx, s: GameState, t: number): void {
  ensure(s);
  if (!routes.length) return;
  ctx.lineJoin = 'round'; ctx.lineCap = 'butt';
  for (const r of routes) stroke(ctx, r.pts, 'rgba(70,70,100,0.35)', 0.5);
  for (const r of routes) stroke(ctx, r.pts, '#7a5634', 0.42, [0.07, 0.13]);
  ctx.lineCap = 'round';
  for (const r of routes) for (const o of [-0.13, 0.13]) {
    const p = offsetLine(r.pts, o);
    stroke(ctx, p, OUT, 0.085);
    stroke(ctx, p, '#d9ad55', 0.045);
  }
  // carts
  for (let i = 0; i < routes.length; i++) {
    const r = routes[i];
    const speed = 1.6;
    const cyc = (r.len * 2) / speed;
    const ph = ((t + i * 2.3) % cyc) / cyc;
    const outbound = ph < 0.5;
    const u = outbound ? ph * 2 : 2 - ph * 2;
    const [x, y] = along(r, u * r.len);
    const d = BUILDINGS[r.id];
    const item = d.kind === 'stall' ? pickShelf(s) : outbound ? Object.keys(d.recipe?.in ?? {})[0] : d.recipe?.out;
    cart(ctx, x, y, item ?? null);
  }
}

function pickShelf(s: GameState): string | null {
  let best: string | null = null, n = 0;
  for (const k in s.warehouse) if (s.warehouse[k] > n) { n = s.warehouse[k]; best = k; }
  return best ?? 'ingot';
}

function along(r: Route, dist: number): [number, number] {
  for (let i = 0; i < r.seg.length; i++) {
    if (dist <= r.seg[i] || i === r.seg.length - 1) {
      const k = r.seg[i] ? Math.min(1, dist / r.seg[i]) : 0;
      const a = r.pts[i], b = r.pts[i + 1];
      return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
    }
    dist -= r.seg[i];
  }
  return r.pts[0];
}

function cart(ctx: Ctx, x: number, y: number, item: string | null): void {
  ell(ctx, x, y + 0.14, 0.24, 0.07); ctx.fillStyle = 'rgba(30,25,60,0.3)'; ctx.fill();
  rr(ctx, x - 0.22, y - 0.12, 0.44, 0.22, 0.04); fs(ctx, '#8a5a36');
  ctx.fillStyle = '#d9ad55'; ctx.fillRect(x - 0.22, y - 0.03, 0.44, 0.04);
  for (const wx of [-0.13, 0.13]) { ell(ctx, x + wx, y + 0.11, 0.055, 0.055); fs(ctx, '#3a3550', 0.03); }
  if (item) drawItem(ctx, item, x, y - 0.16, 0.12);
}
