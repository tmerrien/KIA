// TEMPORARY local stand-ins for sim/render so the UI can be viewed before the real modules land.
// Only used via the scratch vite config; main.ts always imports the real ../sim/api and ../render/api.
import type { GameState, GameEvent, Ref, Bag } from '../sim/types';
import type { Camera, Renderer } from '../render/api';
import mapJson from '../content/map.json';
import { BUILDINGS, TECH, TECH_BY_ID, TUNING, bagTotal } from './content';
export type { GameState, GameEvent, Ref } from '../sim/types';

export function newGame(): GameState {
  return {
    version: 1, time: 0, rngSeed: 1, coins: TUNING.startCoins, earned: 0, sold: 0,
    satchel: {}, shelf: {}, warehouse: {}, tech: {}, built: { stall: true, board: true }, sites: {}, workshops: {},
    nodes: mapJson.nodes.map(n => ({ kind: n.kind as never, x: n.x, y: n.y, active: n.active, amount: 3, timer: 0, crop: 'empty' })),
    player: { x: 17, y: 16, path: [], dir: 1, walkT: 0, target: null, action: null },
    helpers: [], crews: [], contracts: [], fleet: [], shipyard: null, nextId: 1, crewTimer: 0,
  };
}
export function tick(s: GameState, dt: number): GameEvent[] { s.time += dt; return []; }
export function catchUp(): GameEvent[] { return []; }
export function orderPlayer(s: GameState, ref: Ref): GameEvent[] {
  if (ref.k === 'node') { const n = s.nodes[ref.i]; s.player.x = n.x; s.player.y = n.y + 1; s.satchel.scrap = (s.satchel.scrap ?? 0) + 4; return [{ t: 'gather', x: n.x, y: n.y, item: 'scrap', n: 1 }]; }
  if (ref.k === 'bld') { const b = BUILDINGS[ref.id]; s.player.x = b.x; s.player.y = b.y + b.h; if (ref.id === 'stall') { s.shelf = { ...s.satchel }; s.satchel = {}; s.coins += 40; s.sold += 3; s.earned += 40; return [{ t: 'sale', x: b.x, y: b.y, coins: 40, item: 'scrap' }]; } }
  if (ref.k === 'tile') { s.player.x = ref.x; s.player.y = ref.y; }
  return [];
}
export function pour(s: GameState, b: string, _h: number, dt: number): GameEvent[] {
  const site = s.sites[b]; const t = TECH.find(x => x.build === b)!; const n = Math.min(s.coins, Math.ceil(30 * dt), t.cost - site.coins);
  if (n <= 0) return []; s.coins -= n; site.coins += n; return [{ t: 'poured', building: b, coins: n }];
}
export function buyTech(s: GameState, id: string): GameEvent[] { const t = TECH_BY_ID[id]; if (t.build) s.sites[t.build] = { coins: 0, items: {} }; else { s.tech[id] = true; s.coins -= t.cost; } return [{ t: 'tech', tech: id }]; }
export function takeFromWarehouse(): GameEvent[] { return []; }
export function fulfillContract(): GameEvent[] { return []; }
export function era(s: GameState): number { let e = 1; for (const k in s.tech) e = Math.max(e, TECH_BY_ID[k]?.era ?? 1); return e; }
export function carryCap(s: GameState): number { return s.tech.satchel ? 20 : 10; }
export function shelfCap(): number { return 8; }
export function techStatus(s: GameState, id: string): 'owned' | 'site' | 'available' | 'locked' {
  const t = TECH_BY_ID[id]; if (s.tech[id]) return 'owned'; if (t.build && s.sites[t.build]) return 'site';
  return (t.req ?? []).every(r => s.tech[r]) ? 'available' : 'locked';
}
export function canAfford(s: GameState, coins: number, items: Bag): boolean { return s.coins >= coins && Object.keys(items).every(k => (s.satchel[k] ?? 0) + (s.warehouse[k] ?? 0) >= items[k]); }
export function siteNeeds(s: GameState, b: string): { coinsLeft: number; items: Bag } | null {
  const site = s.sites[b]; if (!site || s.built[b]) return null; const t = TECH.find(x => x.build === b)!;
  const items: Bag = {}; for (const k in t.items ?? {}) { const l = t.items![k] - (site.items[k] ?? 0); if (l > 0) items[k] = l; }
  return { coinsLeft: t.cost - site.coins, items };
}
export function refAt(s: GameState, x: number, y: number): Ref {
  const i = s.nodes.findIndex(n => n.x === x && n.y === y); if (i >= 0) return { k: 'node', i };
  for (const id in BUILDINGS) { const b = BUILDINGS[id]; if (x >= b.x && x < b.x + b.w && y >= b.y && y < b.y + b.h && (b.startBuilt || s.sites[id] || s.built[id])) return { k: 'bld', id }; }
  return { k: 'tile', x, y };
}
export function isWalkable(): boolean { return true; }
export function isAdjacent(): boolean { return true; }
export function footprint(): { x: number; y: number; w: number; h: number } { return { x: 0, y: 0, w: 1, h: 1 }; }
export function serialize(s: GameState): string { return JSON.stringify(s); }
export function deserialize(j: string): GameState | null { try { return JSON.parse(j); } catch { return null; } }
void bagTotal;

export function createRenderer(canvas: HTMLCanvasElement): Renderer {
  const g = canvas.getContext('2d')!; let dpr = 1;
  return {
    resize(w, h, d) { dpr = d; canvas.width = w * d; canvas.height = h * d; },
    draw(s, cam: Camera) {
      g.setTransform(dpr, 0, 0, dpr, 0, 0); g.fillStyle = '#0d0b24'; g.fillRect(0, 0, canvas.width, canvas.height);
      const z = cam.zoom;
      mapJson.rows.forEach((row, y) => [...row].forEach((c, x) => {
        g.fillStyle = c === '#' ? '#3a3550' : c === '.' ? '#6d6880' : c === '=' ? '#8a5a35' : c === 'P' ? '#6b4325' : 'transparent';
        g.fillRect((x - cam.x) * z, (y - cam.y) * z, z - 1, z - 1);
      }));
      for (const id in BUILDINGS) { const b = BUILDINGS[id]; if (!(b.startBuilt || s.built[id] || s.sites[id])) continue; g.fillStyle = s.sites[id] ? '#a0703088' : '#c9973f'; g.fillRect((b.x - cam.x) * z, (b.y - cam.y) * z, b.w * z, b.h * z); }
      s.nodes.forEach(n => { g.fillStyle = n.kind === 'wreck' ? '#b08560' : '#9fd'; g.fillRect((n.x - cam.x) * z + 4, (n.y - cam.y) * z + 4, z - 8, z - 8); });
      g.fillStyle = '#ffb347'; g.beginPath(); g.arc((s.player.x + .5 - cam.x) * z, (s.player.y + .5 - cam.y) * z, z * .35, 0, 7); g.fill();
    },
    screenToTile(cam, px, py) { return { x: Math.floor(px / cam.zoom + cam.x), y: Math.floor(py / cam.zoom + cam.y) }; },
  };
}
