// Scripted greedy player used by the playthrough and balance tests (not used by the game itself).
// Strategy: always work towards the cheapest available tech. Start its site for free, pour every coin into it,
// gather / craft the items it needs, and otherwise make money by gathering, crafting and selling at the stall.
import { BUILDINGS, NODES, NODE_FOR_ITEM, TECHS, TECH_BY_ID, TUNING, WORKSHOP_FOR_ITEM, type TechDef } from './content';
import { buyTech, pour, siteNeeds, takeFromWarehouse } from './economy';
import { canAfford, effects, era, techStatus } from './effects';
import { orderPlayer } from './player';
import { isAdjacent, pathFor, walkGrid } from './path';
import { tick } from './state';
import { bagCount, bagKeys, bagTotal } from './util';
import type { GameEvent, GameState, ItemId, Ref } from './types';

export interface BotMemory { hold: number; wait: number; take: { item: ItemId; n: number } | null; log: string[] }
export function newBotMemory(): BotMemory { return { hold: 0, wait: 0, take: null, log: [] }; }

const STALL: Ref = { k: 'bld', id: 'stall' };
const WAREHOUSE: Ref = { k: 'bld', id: 'warehouse' };

function room(s: GameState): number { return effects(s).carry - bagTotal(s.satchel); }
function have(s: GameState, it: ItemId): number { return bagCount(s.satchel, it) + bagCount(s.warehouse, it); }

/** Goal = the tech under construction, else the cheapest available tech. */
export function botGoal(s: GameState): TechDef | null {
  for (const b of Object.keys(s.sites)) { const t = TECHS.find((x) => x.build === b); if (t) return t; }
  let best: TechDef | null = null;
  for (const t of TECHS) if (techStatus(s, t.id) === 'available' && (!best || t.cost < best.cost)) best = t;
  return best;
}

function go(s: GameState, ref: Ref): boolean {
  const ev = orderPlayer(s, ref);
  return !ev.some((e) => e.t === 'toast' && e.text === "Can't get there.");
}

function nearestNode(s: GameState, item: ItemId, ripeOnly = false): number | null {
  const kind = NODE_FOR_ITEM[item];
  if (!kind) return null;
  const grid = walkGrid(s);
  let best: number | null = null, bestLen = Infinity;
  s.nodes.forEach((n, i) => {
    if (!n.active || n.kind !== kind) return;
    const def = NODES[kind];
    if (def.crop ? !(n.crop === 'ripe' || (!ripeOnly && n.crop === 'empty')) : (!def.infinite && n.amount < 1)) return;
    const p = pathFor(s, s.player, { k: 'node', i }, grid);
    if (p && p.length < bestLen) { best = i; bestLen = p.length; }
  });
  return best;
}

function gather(s: GameState, item: ItemId): boolean {
  if (room(s) <= 0) return unload(s);
  const i = nearestNode(s, item, false);
  if (i === null) return false;
  return go(s, { k: 'node', i });
}

function unload(s: GameState): boolean {
  if (s.built.warehouse) return go(s, WAREHOUSE);
  if (bagTotal(s.shelf) < effects(s).shelf) return go(s, STALL);
  return false;
}

/** Try to make progress towards `qty` more of `item`. Returns true if an order was issued. */
function produce(s: GameState, mem: BotMemory, item: ItemId, qty: number, depth = 0): boolean {
  if (depth > 4) return false;
  if (!WORKSHOP_FOR_ITEM[item]) return gather(s, item);
  const wid = WORKSHOP_FOR_ITEM[item];
  const w = s.workshops[wid];
  if (!w) return false;
  if (w.output > 0 && room(s) > 0) return go(s, { k: 'bld', id: wid });
  const r = BUILDINGS[wid].recipe!;
  const batches = Math.max(1, Math.min(6, qty - w.output - (w.busy ? 1 : 0)));
  for (const it of bagKeys(r.in)) {
    const inW = bagCount(w.input, it);
    const want = Math.min(TUNING.workshopInputCap, r.in[it] * batches);
    if (inW >= want) continue;
    const carried = bagCount(s.satchel, it);
    if (carried >= Math.min(want - inW, r.in[it]) && (carried >= want - inW || room(s) <= 0 || inW < r.in[it])) {
      return go(s, { k: 'bld', id: wid });
    }
    if (bagCount(s.warehouse, it) > 0 && s.built.warehouse && carried < want - inW) {
      mem.take = { item: it, n: want - inW - carried };
      return go(s, WAREHOUSE);
    }
    if (inW < r.in[it] || !w.busy) {
      if (produce(s, mem, it, Math.ceil((want - inW - carried) / 1), depth + 1)) return true;
    }
  }
  return false;
}

function makeMoney(s: GameState, mem: BotMemory, goalItems: Record<ItemId, number>): boolean {
  // holding goods for a tech bought with items: don't sell them (unless broke with an empty shelf)
  const holding = bagKeys(goalItems).some((it) => bagCount(s.satchel, it) > 0);
  if (holding && !(bagTotal(s.shelf) === 0 && s.coins < 1)) {
    for (const id of Object.keys(s.workshops).sort()) {
      if (s.workshops[id].output > 0 && room(s) > 0 && goalItems[BUILDINGS[id].recipe!.out]) return go(s, { k: 'bld', id });
    }
    return false;
  }
  // collect finished goods
  for (const id of Object.keys(s.workshops).sort()) {
    if (s.workshops[id].output > 0 && room(s) > 0 && !s.built.warehouse) return go(s, { k: 'bld', id });
  }
  // feed workshops whose input we carry
  for (const id of Object.keys(s.workshops).sort()) {
    const r = BUILDINGS[id].recipe!;
    const w = s.workshops[id];
    if (bagKeys(r.in).some((it) => bagCount(s.satchel, it) >= r.in[it] && bagCount(w.input, it) < TUNING.workshopInputCap - r.in[it])) {
      return go(s, { k: 'bld', id });
    }
  }
  const shelfRoom = effects(s).shelf - bagTotal(s.shelf);
  if (bagTotal(s.satchel) > 0 && (room(s) <= 0 || shelfRoom >= bagTotal(s.satchel)) && shelfRoom > 0) return go(s, STALL);
  if (room(s) <= 0) return unload(s);
  // gather: workshop inputs first (they become pricier goods), else the priciest raw item in stock
  const wanted: ItemId[] = [];
  for (const id of Object.keys(s.workshops).sort()) {
    const r = BUILDINGS[id].recipe!;
    for (const it of bagKeys(r.in)) if (!WORKSHOP_FOR_ITEM[it] && bagCount(s.workshops[id].input, it) < TUNING.workshopInputCap) wanted.push(it);
  }
  const raws = ['crystal', 'scrap', 'ore', 'moss', 'ice'];
  for (const it of [...wanted, ...raws]) {
    const i = nearestNode(s, it, true);
    if (i !== null) return go(s, { k: 'node', i });
  }
  if (bagTotal(s.satchel) > 0 && shelfRoom > 0) return go(s, STALL);
  void mem;
  return false;
}

/** One decision when the player is idle. */
export function botDecide(s: GameState, mem: BotMemory): void {
  if (mem.take && isAdjacent(s, WAREHOUSE)) {
    takeFromWarehouse(s, mem.take.item, mem.take.n);
    mem.take = null;
  }
  mem.take = null;
  const g = botGoal(s);
  if (g) {
    const st = techStatus(s, g.id);
    if (st === 'available' && g.build) { buyTech(s, g.id); mem.log.push(`${s.time.toFixed(0)}s site ${g.id}`); }
    else if (st === 'available' && canAfford(s, g.cost, g.items ?? {})) {
      buyTech(s, g.id); mem.log.push(`${s.time.toFixed(0)}s bought ${g.id}`);
      return;
    }
    let needs: Record<ItemId, number> = {};
    if (g.build && s.sites[g.build]) needs = siteNeeds(s, g.build)!.items;
    else for (const it of bagKeys(g.items ?? {})) if (have(s, it) < g.items![it]) needs[it] = g.items![it];
    // deliver what we already have
    if (g.build && s.sites[g.build] && bagKeys(needs).some((it) => have(s, it) > 0)) {
      if (go(s, { k: 'bld', id: g.build }) && s.player.path.length) return;
    }
    for (const it of bagKeys(needs)) {
      const missing = needs[it] - have(s, it);
      if (missing > 0 && produce(s, mem, it, missing)) return;
    }
  }
  const goalItems = g && !g.build ? (g.items ?? {}) : {};
  if (makeMoney(s, mem, goalItems)) return;
  mem.wait = 1;
}

/** Advance the world by dt with the bot playing. */
export function botStep(s: GameState, mem: BotMemory, dt: number): GameEvent[] {
  const ev: GameEvent[] = [];
  const sites = Object.keys(s.sites);
  if (sites.length && s.coins > 0) { for (const b of sites) ev.push(...pour(s, b, mem.hold, dt)); mem.hold += dt; }
  else mem.hold = 0;
  if (mem.wait > 0) mem.wait -= dt;
  else if (!s.player.path.length && !s.player.action) botDecide(s, mem);
  ev.push(...tick(s, dt));
  return ev;
}

export interface ProbeResult { eraReachedAt: Record<number, number>; techAt: Record<string, number>; finalTime: number }

/** Runs the bot until `until(s)` or maxSeconds. Records when each era and tech was first reached. */
export function runBot(s: GameState, maxSeconds: number, until: (s: GameState) => boolean, dt = 0.1, mem = newBotMemory()): ProbeResult {
  const res: ProbeResult = { eraReachedAt: { 1: 0 }, techAt: {}, finalTime: 0 };
  const start = s.time;
  while (s.time - start < maxSeconds && !until(s)) {
    botStep(s, mem, dt);
    const e = era(s);
    if (res.eraReachedAt[e] === undefined) res.eraReachedAt[e] = s.time;
    for (const id of Object.keys(s.tech)) if (res.techAt[id] === undefined) res.techAt[id] = s.time;
  }
  res.finalTime = s.time;
  void TECH_BY_ID;
  return res;
}
