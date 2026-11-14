// Hired hands. Helpers work only once the warehouse is built.
//
// Dockhand job priority:
//   0. carrying >= HELPER_CARRY            -> deposit at the warehouse
//   1. moss beds that are ripe or empty    -> harvest (then replant) / plant
//   2. ore, crystal, wreck nodes with >= 2 stock whose item has < 40 in the warehouse -> gather until full/empty
//   3. ice if the warehouse has < 40 ice   -> gather until full
//   otherwise deposit what it carries, or idle.
// Porter job priority:
//   0. carrying anything                   -> deposit at the warehouse
//   1. a workshop with >= 2 finished goods -> take them, put what fits on the shelf, the rest into the warehouse
//   2. a workshop short of a recipe input  -> bring it from the warehouse (input below 2 batches)
//   3. shelf has room                      -> restock it with warehouse products (highest tier first, keeping a
//                                              reserve of anything a workshop consumes and anything a site needs)
// Each job has a claim key; a helper never takes a job another helper already claimed. Within a priority level the
// nearest job (by path length) wins. An idle helper re-checks for work every second.
import {
  BUILDINGS, DOCKHAND_STOCK_TARGET, HELPER_CARRY, ITEMS, MAP, NODES, TECH_FOR_BUILDING, TUNING, WORKSHOP_RESERVE, itemName,
} from './content';
import { consumedItems, effects, shelfCap } from './effects';
import { byTierDesc, fillShelf, moveAll, moveItem } from './inventory';
import { goalTiles, pathFor, stepMover, walkGrid, nudgeOut } from './path';
import { bagAdd, bagCount, bagKeys, bagTotal } from './util';
import type { GameEvent, GameState, Helper, HelperJob, HelperStep, NodeKind, Ref } from './types';

const IDLE_RECHECK = 1;
const WAREHOUSE: Ref = { k: 'bld', id: 'warehouse' };
const STALL: Ref = { k: 'bld', id: 'stall' };

const GATHER_VERB: Record<NodeKind, string> = {
  ore: 'Mining ore', crystal: 'Chipping star-crystal', moss: 'Tending glowmoss', ice: 'Cutting ice', wreck: 'Salvaging scrap',
};

/** Make sure the right number of helpers exist: 1 per hut + extraCrews each. New ones appear beside their hut. */
export function syncHelpers(s: GameState): void {
  const extra = effects(s).extraCrews;
  const want: [Helper['kind'], string][] = [['dockhand', 'bunkhouse'], ['porter', 'lodge']];
  for (const [kind, hut] of want) {
    const target = s.built[hut] ? 1 + extra : 0;
    let have = s.helpers.filter((h) => h.kind === kind).length;
    while (have < target) {
      const [x, y] = spawnTile(s, hut);
      s.helpers.push({
        id: s.nextId++, kind, carry: {}, task: 'Idle', action: null, job: null,
        x, y, path: [], dir: 1, walkT: 0,
      });
      have++;
    }
  }
}

function spawnTile(s: GameState, hut: string): [number, number] {
  const grid = walkGrid(s);
  const tiles = goalTiles(s, { k: 'bld', id: hut })
    .filter(([x, y]) => x >= 0 && y >= 0 && x < MAP.width && y < MAP.height && grid[y * MAP.width + x])
    .sort((a, b) => b[1] - a[1] || a[0] - b[0]); // prefer the tiles below the door
  if (tiles.length) return tiles[0];
  const b = BUILDINGS[hut];
  const m = { x: b.x, y: b.y, path: [] as [number, number][], dir: 1 as const, walkT: 0 };
  nudgeOut(s, m, grid);
  return [m.x, m.y];
}

export function tickHelpers(s: GameState, dt: number): GameEvent[] {
  const ev: GameEvent[] = [];
  for (const h of s.helpers) {
    if (!s.built.warehouse) {
      h.job = null; h.path = []; h.action = null; h.task = 'Waiting for a warehouse';
      continue;
    }
    if (h.action) {
      h.action.t += dt;
      if (h.action.t < h.action.d) continue;
      h.action = null;
      if (h.job && h.job.steps.length && h.job.steps[0].op === 'gather') {
        gatherOnce(s, h, ev);
        continueGather(s, h);
      }
      continue;
    }
    if (h.path.length) {
      if (stepMover(h, TUNING.helperSpeed, dt)) arrive(s, h, ev);
      continue;
    }
    if (h.job) { startStep(s, h, ev); continue; }
    pickJob(s, h);
    if (h.job) startStep(s, h, ev);
    else { h.task = 'Idle'; h.action = { t: 0, d: IDLE_RECHECK }; }
  }
  return ev;
}

/** Re-path every walking helper after the map changed. Jobs whose target became unreachable are dropped. */
export function repathHelpers(s: GameState): void {
  const grid = walkGrid(s);
  for (const h of s.helpers) {
    nudgeOut(s, h, grid);
    if (!h.path.length || !h.job || !h.job.steps.length) continue;
    const p = pathFor(s, h, h.job.steps[0].ref, grid);
    if (p) h.path = p; else { h.path = []; h.job = null; }
  }
}

function claimsExcept(s: GameState, me: Helper): Set<string> {
  const c = new Set<string>();
  for (const h of s.helpers) if (h !== me && h.job) c.add(h.job.claim);
  return c;
}

function nearest<T>(s: GameState, h: Helper, cands: { ref: Ref; v: T }[]): { ref: Ref; v: T } | null {
  const grid = walkGrid(s);
  let best: { ref: Ref; v: T } | null = null;
  let bestLen = Infinity;
  for (const c of cands) {
    const p = pathFor(s, h, c.ref, grid);
    if (p && p.length < bestLen) { best = c; bestLen = p.length; }
  }
  return best;
}

function pickJob(s: GameState, h: Helper): void {
  h.job = h.kind === 'dockhand' ? dockhandJob(s, h) : porterJob(s, h);
}

function depositJob(): HelperJob { return { claim: '', steps: [{ ref: WAREHOUSE, op: 'deposit' }] }; }

function dockhandJob(s: GameState, h: Helper): HelperJob | null {
  if (bagTotal(h.carry) >= HELPER_CARRY) { h.task = 'Storing goods'; return depositJob(); }
  const claims = claimsExcept(s, h);
  const free = (i: number) => s.nodes[i].active && !claims.has('node:' + i);
  const levels: number[][] = [[], [], []];
  s.nodes.forEach((n, i) => {
    if (!free(i)) return;
    const def = NODES[n.kind];
    if (def.crop) { if (n.crop === 'ripe' || n.crop === 'empty') levels[0].push(i); }
    else if (!def.infinite) { if (n.amount >= 2 && bagCount(s.warehouse, def.gives) < DOCKHAND_STOCK_TARGET) levels[1].push(i); }
    else if (bagCount(s.warehouse, def.gives) < DOCKHAND_STOCK_TARGET) levels[2].push(i);
  });
  for (const lvl of levels) {
    const best = nearest(s, h, lvl.map((i) => ({ ref: { k: 'node', i } as Ref, v: i })));
    if (best) {
      const n = s.nodes[best.v];
      h.task = n.kind === 'moss' ? (n.crop === 'ripe' ? 'Harvesting glowmoss' : 'Planting glowmoss') : GATHER_VERB[n.kind];
      return { claim: 'node:' + best.v, steps: [{ ref: best.ref, op: 'gather' }] };
    }
  }
  if (bagTotal(h.carry) > 0) { h.task = 'Storing goods'; return depositJob(); }
  return null;
}

function porterJob(s: GameState, h: Helper): HelperJob | null {
  if (bagTotal(h.carry) > 0) { h.task = 'Storing goods'; return depositJob(); }
  const claims = claimsExcept(s, h);
  const shops = Object.keys(s.workshops).sort();
  // 1. collect finished goods
  const outs = shops.filter((id) => s.workshops[id].output >= 2 && !claims.has('out:' + id));
  const o = nearest(s, h, outs.map((id) => ({ ref: { k: 'bld', id } as Ref, v: id })));
  if (o) {
    const item = BUILDINGS[o.v].recipe!.out;
    h.task = `Carrying ${itemName(item)} to the shop`;
    return {
      claim: 'out:' + o.v,
      steps: [{ ref: o.ref, op: 'takeOutput' }, { ref: STALL, op: 'shelf' }, { ref: WAREHOUSE, op: 'deposit' }],
    };
  }
  // 2. feed workshops
  const feeds: { ref: Ref; v: [string, string] }[] = [];
  for (const id of shops) {
    const w = s.workshops[id];
    const r = BUILDINGS[id].recipe!;
    if (w.output >= TUNING.workshopOutputCap) continue;
    for (const it of bagKeys(r.in)) {
      if (bagCount(w.input, it) < r.in[it] * 2 && bagCount(s.warehouse, it) > 0 && !claims.has(`in:${id}:${it}`)) {
        feeds.push({ ref: { k: 'bld', id }, v: [id, it] });
      }
    }
  }
  if (feeds.length) {
    const f = feeds[0]; // first workshop in id order; every feed run starts at the warehouse anyway
    const [id, it] = f.v;
    const n = Math.min(HELPER_CARRY, TUNING.workshopInputCap - bagCount(s.workshops[id].input, it));
    h.task = `Bringing ${itemName(it)} to the ${BUILDINGS[id].name}`;
    return {
      claim: `in:${id}:${it}`,
      steps: [{ ref: WAREHOUSE, op: 'take', item: it, n }, { ref: f.ref, op: 'load' }],
    };
  }
  // 3. restock the shelf
  const room = shelfCap(s) - bagTotal(s.shelf);
  if (room > 0 && !claims.has('shelf') && s.built.stall) {
    const item = shelfCandidate(s);
    if (item) {
      h.task = `Stocking the shop with ${itemName(item)}`;
      return {
        claim: 'shelf',
        steps: [{ ref: WAREHOUSE, op: 'take', item, n: Math.min(HELPER_CARRY, room) }, { ref: STALL, op: 'shelf' }, { ref: WAREHOUSE, op: 'deposit' }],
      };
    }
  }
  return null;
}

/** Best warehouse product for the shelf: highest tier first, keeping WORKSHOP_RESERVE of anything a workshop consumes. */
export function shelfAvailable(s: GameState, item: string, reserve = consumedItems(s)): number {
  return bagCount(s.warehouse, item) - (reserve.has(item) ? WORKSHOP_RESERVE : 0) - siteDemand(s, item);
}

/** How many of `item` open construction sites still need. Shelf restocking never sells these. */
export function siteDemand(s: GameState, item: string): number {
  let n = 0;
  for (const b of Object.keys(s.sites)) {
    const t = TECH_FOR_BUILDING[b];
    if (t) n += Math.max(0, bagCount(t.items ?? {}, item) - bagCount(s.sites[b].items, item));
  }
  return n;
}
function shelfCandidate(s: GameState): string | null {
  const reserve = consumedItems(s);
  for (const it of byTierDesc(bagKeys(s.warehouse))) {
    if ((ITEMS[it]?.tier ?? 0) < 1) continue;
    if (shelfAvailable(s, it, reserve) > 0) return it;
  }
  return null;
}

function startStep(s: GameState, h: Helper, ev: GameEvent[]): void {
  const job = h.job!;
  // skip steps that have nothing to do
  while (job.steps.length) {
    const st = job.steps[0];
    if ((st.op === 'deposit' || st.op === 'shelf' || st.op === 'load') && bagTotal(h.carry) === 0) { job.steps.shift(); continue; }
    break;
  }
  if (!job.steps.length) { h.job = null; return; }
  const p = pathFor(s, h, job.steps[0].ref);
  if (!p) { h.job = null; h.task = 'Idle'; h.action = { t: 0, d: IDLE_RECHECK }; return; }
  if (p.length) { h.path = p; return; }
  arrive(s, h, ev);
}

function finishStep(h: Helper): void {
  if (!h.job) return;
  h.job.steps.shift();
  if (!h.job.steps.length) h.job = null;
}

function arrive(s: GameState, h: Helper, ev: GameEvent[]): void {
  const job = h.job;
  if (!job || !job.steps.length) return;
  const st: HelperStep = job.steps[0];
  switch (st.op) {
    case 'gather': continueGather(s, h); return;
    case 'deposit': moveAll(h.carry, s.warehouse); break;
    case 'takeOutput': {
      const id = (st.ref as { id: string }).id;
      const w = s.workshops[id];
      const k = Math.min(w ? w.output : 0, HELPER_CARRY - bagTotal(h.carry));
      if (w && k > 0) { w.output -= k; bagAdd(h.carry, BUILDINGS[id].recipe!.out, k); }
      else { h.job = null; return; }
      break;
    }
    case 'shelf': {
      // goods a construction site is waiting for stay in hand and go to the warehouse instead
      const keep: Record<string, number> = {};
      for (const it of bagKeys(h.carry)) {
        const k = Math.min(h.carry[it], siteDemand(s, it));
        if (k > 0) { keep[it] = k; bagAdd(h.carry, it, -k); }
      }
      fillShelf(h.carry, s.shelf, shelfCap(s));
      for (const it of bagKeys(keep)) bagAdd(h.carry, it, keep[it]);
      break;
    }
    case 'take': {
      const k = moveItem(s.warehouse, h.carry, st.item!, Math.min(st.n ?? HELPER_CARRY, HELPER_CARRY - bagTotal(h.carry)));
      if (k === 0) { h.job = null; return; }
      break;
    }
    case 'load': {
      const id = (st.ref as { id: string }).id;
      const w = s.workshops[id];
      if (w) for (const it of bagKeys(BUILDINGS[id].recipe!.in)) {
        moveItem(h.carry, w.input, it, TUNING.workshopInputCap - bagCount(w.input, it));
      }
      break;
    }
  }
  void ev;
  finishStep(h);
}

/** At a node: start the next timed gather if there's work left, else finish the step. */
function continueGather(s: GameState, h: Helper): void {
  const st = h.job?.steps[0];
  if (!st || st.ref.k !== 'node') { finishStep(h); return; }
  const n = s.nodes[st.ref.i];
  const def = NODES[n.kind];
  const room = HELPER_CARRY - bagTotal(h.carry);
  if (!n.active) { finishStep(h); return; }
  if (def.crop) {
    if (n.crop === 'ripe' && room > 0) { h.task = 'Harvesting glowmoss'; h.action = { t: 0, d: def.work }; return; }
    if (n.crop === 'empty') { h.task = 'Planting glowmoss'; h.action = { t: 0, d: def.plantWork ?? def.work }; return; }
    finishStep(h); return;
  }
  if (room <= 0 || (!def.infinite && n.amount < 1)) { finishStep(h); return; }
  h.task = GATHER_VERB[n.kind];
  h.action = { t: 0, d: def.work };
}

function gatherOnce(s: GameState, h: Helper, ev: GameEvent[]): void {
  const st = h.job!.steps[0];
  if (st.ref.k !== 'node') return;
  const n = s.nodes[st.ref.i];
  const def = NODES[n.kind];
  const room = HELPER_CARRY - bagTotal(h.carry);
  if (def.crop) {
    if (n.crop === 'ripe') {
      const k = Math.min(def.yield ?? 1, room);
      bagAdd(h.carry, def.gives, k);
      n.crop = 'empty'; n.timer = 0;
      ev.push({ t: 'gather', x: n.x, y: n.y, item: def.gives, n: k });
    } else if (n.crop === 'empty') {
      n.crop = 'growing'; n.timer = 0;
    }
    return;
  }
  if (room <= 0) return;
  if (!def.infinite) { if (n.amount < 1) return; n.amount -= 1; }
  bagAdd(h.carry, def.gives, 1);
  ev.push({ t: 'gather', x: n.x, y: n.y, item: def.gives, n: 1 });
}
