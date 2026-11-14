// Standalone renderer preview: a hand-built GameState with everything on screen, a draggable camera and a tiny
// fake "sim" that walks people around and emits events. Works without src/sim being implemented.
// URL params: ?cam=x,y  &zoom=36  &sites=lodge,tinker  &shopfront=0  &rails=0  &pour=lodge  &sel=bld:smelter
import type { GameState, GameEvent, Ref, Helper, Crew, Mover } from '../sim/types';
import { createRenderer } from './api';
import mapJson from '../content/map.json';
import buildingsJson from '../content/buildings.json';

const Q = new URLSearchParams(location.search);
const BUILD = buildingsJson as unknown as Record<string, { x: number; y: number; w: number; h: number; kind: string }>;

function fakeState(): GameState {
  const sites = (Q.get('sites') ?? 'lodge,tinker').split(',').filter(Boolean);
  const built: Record<string, true> = {};
  for (const id in BUILD) if (!sites.includes(id)) built[id] = true;
  const tech: Record<string, true> = { ...built };
  if (Q.get('shopfront') !== '0') tech.shopfront = true;
  if (Q.get('rails') !== '0') tech.rails = true;
  const nodes = (mapJson.nodes as { kind: string; x: number; y: number; active: boolean }[]).map((n, i) => ({
    kind: n.kind as GameState['nodes'][number]['kind'], x: n.x, y: n.y, active: n.active || i === 13 || i === 14,
    amount: n.kind === 'ore' ? i % 4 : n.kind === 'crystal' ? i % 3 : n.kind === 'wreck' ? (i % 2 ? 4 : 1) : 0,
    timer: n.kind === 'moss' ? (i * 5) % 18 : 0,
    crop: n.kind === 'moss' ? (['ripe', 'growing', 'empty', 'growing', 'ripe'] as const)[i % 5] : undefined,
  }));
  const W = (busy: boolean, progress: number, output: number, input: Record<string, number> = {}) => ({ busy, progress, output, input });
  const mover = (x: number, y: number): Mover => ({ x, y, path: [], dir: 1, walkT: 0 });
  const helpers: Helper[] = [
    { ...mover(6, 9), id: 1, kind: 'dockhand', carry: { ore: 3 }, task: 'Hauling ore', action: null },
    { ...mover(4, 11), id: 2, kind: 'dockhand', carry: {}, task: 'Harvesting', action: { t: 0.3, d: 0.7 } },
    { ...mover(20, 13), id: 3, kind: 'porter', carry: { ingot: 4 }, task: 'Feeding workshops', action: null },
    { ...mover(23, 14), id: 4, kind: 'porter', carry: { sailcloth: 2 }, task: 'Stocking shop', action: null },
  ];
  const crews: Crew[] = [0, 1, 2, 3, 4].map((i) => ({ ...mover(18, 24 - i), id: 10 + i, state: 'arriving', wait: 0, bought: i === 2 ? 'ration' : null, disappointed: false, color: i }));
  crews[3].state = 'leaving'; crews[3].disappointed = true;
  return {
    version: 1, time: 0, rngSeed: 1, coins: 12480, earned: 50000, sold: 900,
    satchel: { crystal: 6, ore: 2 }, shelf: { ingot: 4, ration: 3, fuelcell: 2, tools: 1, sailcloth: 3, engine: 1, solarsail: 1 },
    warehouse: { ore: 120, moss: 60, ingot: 40, scrap: 30 }, tech, built,
    sites: Object.fromEntries(sites.map((id, i) => [id, { coins: Math.round([0.35, 0.72, 0.1][i % 3] * ({ lodge: 8000, tinker: 1500, galley: 300, shipyard: 150000, drydock: 60000 } as Record<string, number>)[id] || 100), items: {} }])),
    workshops: {
      smelter: W(true, 5, 7), loom: W(true, 3, 0), galley: W(false, 0, 2, { moss: 1 }), cutter: W(true, 9, 3),
      tinker: W(false, 0, 0), rigger: W(true, 12, 1), machinist: W(false, 0, 20), sailmaker: W(true, 18, 0),
    },
    nodes,
    player: { ...mover(17, 15), target: null, action: { t: 0.6, d: 1.2, label: 'Mining' } },
    helpers, crews,
    contracts: [{ id: 1, ship: 'Bright Kestrel', items: { engine: 2 }, reward: 900 }, { id: 2, ship: 'Lantern Moth', items: { rigging: 2 }, reward: 600 }],
    fleet: [{ id: 1, name: 'Dawnreach', voyage: 8 }, { id: 2, name: 'Quiet Comet', voyage: 20 }, { id: 3, name: 'Saltwind', voyage: 3 }],
    shipyard: { progress: 26, busy: true, input: {} },
    nextId: 100, crewTimer: 0,
  };
}

function earlyState(): GameState {
  const st = fakeState();
  st.built = { stall: true, board: true }; st.tech = {}; st.sites = Q.get('sites') ? st.sites : {}; st.workshops = {};
  st.helpers = []; st.fleet = []; st.shipyard = null; st.contracts = []; st.warehouse = {};
  st.shelf = { ore: 3, moss: 2 }; st.satchel = { ore: 2 };
  st.nodes.forEach((n) => { if (n.kind === 'moss') n.active = [10, 11, 12].includes(st.nodes.indexOf(n)); });
  return st;
}
const s = Q.get('early') === '1' ? earlyState() : fakeState();
const canvas = document.getElementById('c') as HTMLCanvasElement;
const R = createRenderer(canvas);
const cam = { x: 0, y: 0, zoom: Number(Q.get('zoom') ?? 36) };
const camQ = Q.get('cam');
if (camQ) { const [x, y] = camQ.split(',').map(Number); cam.x = x; cam.y = y; }
let selected: Ref | null = null;
const sel = Q.get('sel');
if (sel) { const [k, v] = sel.split(':'); selected = k === 'bld' ? { k: 'bld', id: v } : k === 'node' ? { k: 'node', i: Number(v) } : null; }
let pouring: string | null = Q.get('pour');

function resize() {
  R.resize(innerWidth, innerHeight, devicePixelRatio || 1);
  if (!camQ) { cam.x = 17.5 - innerWidth / cam.zoom / 2; cam.y = 16 - innerHeight / cam.zoom / 2; }
}
addEventListener('resize', resize);
resize();

// --- pan / zoom / select
let drag: { x: number; y: number; cx: number; cy: number; moved: boolean } | null = null;
canvas.addEventListener('pointerdown', (e) => { drag = { x: e.clientX, y: e.clientY, cx: cam.x, cy: cam.y, moved: false }; canvas.setPointerCapture(e.pointerId); });
canvas.addEventListener('pointermove', (e) => {
  if (!drag) return;
  const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
  if (Math.abs(dx) + Math.abs(dy) > 6) drag.moved = true;
  cam.x = drag.cx - dx / cam.zoom; cam.y = drag.cy - dy / cam.zoom;
});
canvas.addEventListener('pointerup', (e) => {
  if (drag && !drag.moved) {
    const t = R.screenToTile(cam, e.clientX, e.clientY);
    const ni = s.nodes.findIndex((n) => n.x === t.x && n.y === t.y);
    const bid = Object.keys(BUILD).find((id) => { const d = BUILD[id]; return t.x >= d.x && t.x < d.x + d.w && t.y >= d.y && t.y < d.y + d.h; });
    selected = ni >= 0 ? { k: 'node', i: ni } : bid ? { k: 'bld', id: bid } : { k: 'tile', x: t.x, y: t.y };
  }
  drag = null;
});
canvas.addEventListener('wheel', (e) => {
  e.preventDefault();
  const before = { x: cam.x + e.clientX / cam.zoom, y: cam.y + e.clientY / cam.zoom };
  cam.zoom = Math.max(18, Math.min(80, cam.zoom * Math.exp(-e.deltaY * 0.0015)));
  cam.x = before.x - e.clientX / cam.zoom; cam.y = before.y - e.clientY / cam.zoom;
}, { passive: false });
addEventListener('keydown', (e) => { if (e.key === 'p') pouring = Object.keys(s.sites)[0] ?? null; });
addEventListener('keyup', (e) => { if (e.key === 'p') pouring = Q.get('pour'); });

// --- fake life: patrol routes for movers
type Route = [number, number][];
const ROUTES = new Map<Mover, { r: Route; i: number }>();
const add = (m: Mover, r: Route) => ROUTES.set(m, { r, i: 0 });
add(s.player, [[17, 15], [21, 15], [21, 13], [17, 13]]);
if (s.helpers.length) add(s.helpers[0], [[6, 9], [6, 6], [10, 6], [10, 10], [16, 10], [16, 12], [6, 12]]);
if (s.helpers.length) add(s.helpers[2], [[20, 13], [26, 13], [26, 10], [20, 10]]);
if (s.helpers.length) add(s.helpers[3], [[23, 14], [23, 16], [19, 16], [19, 14]]);
s.crews.forEach((c, i) => add(c, [[18, 24 - i], [18, 19], [16, 19], [18, 19]]));

function step(m: Mover, dt: number) {
  const st = ROUTES.get(m);
  if (!st) return;
  const [tx, ty] = st.r[(st.i + 1) % st.r.length];
  m.path = [[tx, ty]];
  m.walkT += dt;
  const dx = tx - m.x, dy = ty - m.y, d = Math.abs(dx) + Math.abs(dy), v = 2.2 * dt;
  if (dx) m.dir = dx > 0 ? 1 : -1;
  if (d <= v) { m.x = tx; m.y = ty; st.i = (st.i + 1) % st.r.length; }
  else if (dx) m.x += Math.sign(dx) * Math.min(Math.abs(dx), v);
  else m.y += Math.sign(dy) * v;
}

let last = performance.now();
let drawMs = 0;
let evT = 0, evN = 0;
const still = Q.get('still') === '1';
function frame(now: number) {
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;
  const events: GameEvent[] = [];
  if (!still) {
    s.time += dt;
    for (const m of ROUTES.keys()) step(m, dt);
    for (const id in s.workshops) { const w = s.workshops[id]; if (w.busy) { w.progress += dt; if (w.progress > 12) { w.progress = 0; w.output++; events.push({ t: 'crafted', building: id, item: 'ingot' }); } } }
    for (const f of s.fleet) f.voyage = (f.voyage + dt) % 60;
    if (s.shipyard) s.shipyard.progress = (s.shipyard.progress + dt) % 40;
    if (s.player.action) { s.player.action.t += dt; if (s.player.action.t > s.player.action.d) s.player.action.t = 0; }
    for (const h of s.helpers) if (h.action) { h.action.t += dt; if (h.action.t > h.action.d) h.action.t = 0; }
    for (const n of s.nodes) if (n.crop === 'growing') n.timer = (n.timer + dt) % 18;
    evT += dt;
    if (evT > 1.6) {
      evT = 0; evN++;
      if (evN % 3 === 0) events.push({ t: 'sale', x: 17, y: 19, coins: 40 + evN, item: 'ingot' });
      else if (evN % 3 === 1) events.push({ t: 'gather', x: 5, y: 2, item: 'ore', n: 1 });
      else events.push({ t: 'crafted', building: 'cutter', item: 'fuelcell' });
      if (evN % 7 === 0) events.push({ t: 'built', building: 'galley' });
    }
  }
  if (pouring && s.sites[pouring]) s.sites[pouring].coins += dt * 300;
  const t0 = performance.now();
  R.draw(s, cam, dt, { selected, events, pouring, coinScreen: { x: 30, y: 31 } });
  drawMs = drawMs * 0.95 + (performance.now() - t0) * 0.05;
  (window as unknown as { __drawMs: number }).__drawMs = drawMs;
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
(window as unknown as { __state: GameState }).__state = s;
