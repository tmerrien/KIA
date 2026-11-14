// Scripted greedy player used by the playthrough and balance tests (not used by the game itself).
// Strategy: always work towards the cheapest available tech. Start its site for free, pour every coin into it,
// gather / craft the items it needs, and otherwise make money by gathering, crafting and selling at the stall.
import { BUILDINGS, ITEMS, NODES, NODE_FOR_ITEM, TECHS, TUNING, WORKSHOP_FOR_ITEM, type TechDef } from './content';
import { buyTech, pour, siteNeeds, takeFromWarehouse } from './economy';
import { canAfford, effects, era, techStatus } from './effects';
import { orderPlayer } from './player';
import { isAdjacent, pathFor, walkGrid } from './path';
import { tick } from './state';
import { bagCount, bagKeys, bagTotal } from './util';
import type { GameEvent, GameState, ItemId, Ref } from './types';

export interface BotMemory { hold: number; wait: number; take: { item: ItemId; n: number } | null; log: string[]; noStall: boolean; hoard: Record<ItemId, number> | null }
export function newBotMemory(): BotMemory { return { hold: 0, wait: 0, take: null, log: [], noStall: false, hoard: null }; }

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

function nearestNode(s: GameState, item: ItemId, ripeOnly = false, minStock = 1): number | null {
  const kind = NODE_FOR_ITEM[item];
  if (!kind) return null;
  const grid = walkGrid(s);
  let best: number | null = null, bestLen = Infinity;
  s.nodes.forEach((n, i) => {
    if (!n.active || n.kind !== kind) return;
    const def = NODES[kind];
    if (def.crop ? !(n.crop === 'ripe' || (!ripeOnly && n.crop === 'empty')) : (!def.infinite && n.amount < minStock)) return;
    const p = pathFor(s, s.player, { k: 'node', i }, grid);
    if (p && p.length < bestLen) { best = i; bestLen = p.length; }
  });
  return best;
}

function gather(s: GameState, mem: BotMemory, item: ItemId): boolean {
  if (room(s) <= 0) return unload(s, mem.noStall);
  const i = nearestNode(s, item, false, 2) ?? nearestNode(s, item, false, 1);
  if (i === null) return false;
  return go(s, { k: 'node', i });
}

function unload(s: GameState, holding = false): boolean {
  if (holding) return false;
  if (bagTotal(s.shelf) < effects(s).shelf) return go(s, STALL);
  if (s.built.warehouse) return go(s, WAREHOUSE);
  return false;
}

/**
 * Try to make progress towards `qty` more of `item`. Returns true if an order was issued.
 * While hoarding for a tech bought with items (mem.hoard), the bot never visits the warehouse (that would deposit
 * the hoard) and never loads hoarded goods into a workshop; it lets porters bring inputs instead.
 */
function produce(s: GameState, mem: BotMemory, item: ItemId, qty: number, depth = 0): boolean {
  if (depth > 4) return false;
  if (!WORKSHOP_FOR_ITEM[item]) return gather(s, mem, item);
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
      if (mem.hoard) {
        if (s.helpers.some((h) => h.kind === 'porter') && inW >= r.in[it]) continue;
        if (s.helpers.some((h) => h.kind === 'porter')) { mem.wait = 0.5; return true; }
      } else {
        mem.take = { item: it, n: want - inW - carried };
        return go(s, WAREHOUSE);
      }
    }
    if (inW < r.in[it] || !w.busy) {
      if (produce(s, mem, it, want - inW - carried, depth + 1)) return true;
    }
  }
  if (mem.hoard && (w.busy || w.output > 0)) {
    // camp next to the workshop and grab each finished item before a porter does
    if (!s.player.target || s.player.target.k !== 'bld' || s.player.target.id !== wid) return go(s, { k: 'bld', id: wid });
    mem.wait = 0.3;
    return true;
  }
  return false;
}

function makeMoney(s: GameState, mem: BotMemory, goalItems: Record<ItemId, number>): boolean {
  // collect finished goods (goods a pending purchase needs stay in the workshop until we buy)
  for (const id of Object.keys(s.workshops).sort()) {
    if (goalItems[BUILDINGS[id].recipe!.out]) continue;
    if (s.workshops[id].output > 0 && room(s) > 0) return go(s, { k: 'bld', id });
  }
  // fetch workshop inputs from the warehouse
  if (s.built.warehouse && room(s) > 0) {
    const shops = Object.keys(s.workshops).sort((a, b) => ITEMS[BUILDINGS[b].recipe!.out].price - ITEMS[BUILDINGS[a].recipe!.out].price);
    const wants: [ItemId, number][] = [];
    for (const id of shops) {
      const r = BUILDINGS[id].recipe!;
      for (const it of bagKeys(r.in)) {
        const d = TUNING.workshopInputCap - bagCount(s.workshops[id].input, it) - bagCount(s.satchel, it);
        if (d >= Math.max(r.in[it], 4) && bagCount(s.warehouse, it) >= r.in[it]) wants.push([it, Math.min(d, s.warehouse[it])]);
      }
    }
    if (wants.length) {
      if (!isAdjacent(s, WAREHOUSE)) return go(s, WAREHOUSE);
      for (const [it, n] of wants) if (room(s) > 0) takeFromWarehouse(s, it, n);
    }
  }
  // feed workshops whose input we carry
  for (const id of Object.keys(s.workshops).sort()) {
    const r = BUILDINGS[id].recipe!;
    const w = s.workshops[id];
    if (bagKeys(r.in).some((it) => bagCount(s.satchel, it) >= r.in[it] && bagCount(w.input, it) < TUNING.workshopInputCap - r.in[it])) {
      return go(s, { k: 'bld', id });
    }
  }
  const holding = bagKeys(goalItems).some((it) => bagCount(s.satchel, it) > 0);
  const shelfRoom = holding ? 0 : effects(s).shelf - bagTotal(s.shelf);
  const products = bagKeys(s.satchel).filter((it) => WORKSHOP_FOR_ITEM[it]).reduce((n, it) => n + s.satchel[it], 0);
  if (bagTotal(s.satchel) > 0 && (room(s) <= 0 || products > 0) && shelfRoom > 0) return go(s, STALL);
  // shelf has room and the warehouse holds products: fetch some to sell
  if (s.built.warehouse && shelfRoom >= 4 && room(s) > 0) {
    const sellable = bagKeys(s.warehouse).filter((it) => WORKSHOP_FOR_ITEM[it] && !goalItems[it] && !Object.keys(s.workshops).some((w) => BUILDINGS[w].recipe!.in[it]))
      .sort((a, b) => (ITEMS[b].price - ITEMS[a].price));
    if (sellable.length) {
      if (isAdjacent(s, WAREHOUSE)) { takeFromWarehouse(s, sellable[0], Math.min(shelfRoom, room(s))); return go(s, STALL); }
      return go(s, WAREHOUSE);
    }
  }
  if (room(s) <= 0) return unload(s, holding);
  // gather: workshop inputs first (they become pricier goods), else the priciest raw item in stock
  const wanted: ItemId[] = [];
  for (const id of Object.keys(s.workshops).sort()) {
    const r = BUILDINGS[id].recipe!;
    for (const it of bagKeys(r.in)) if (!WORKSHOP_FOR_ITEM[it] && bagCount(s.workshops[id].input, it) < TUNING.workshopInputCap) wanted.push(it);
  }
  const raws = ['crystal', 'scrap', 'ore', 'moss', 'ice'];
  for (const minStock of [2, 1]) {
    for (const it of [...wanted, ...raws]) {
      const i = nearestNode(s, it, true, minStock);
      if (i !== null) return go(s, { k: 'node', i });
    }
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
    if (g.build && s.sites[g.build]) {
      const needs = siteNeeds(s, g.build)!.items;
      // deliver what we already have
      if (bagKeys(needs).some((it) => have(s, it) > 0) && go(s, { k: 'bld', id: g.build }) && s.player.path.length) return;
      for (const it of bagKeys(needs)) {
        const missing = needs[it] - have(s, it);
        if (missing > 0 && produce(s, mem, it, missing)) return;
      }
    } else if (st === 'available' && bagTotal(g.items ?? {}) > 0 && s.coins >= g.cost) {
      // bought with items, coins ready: make the items without visiting the stall (it would sell them)
      const items = g.items!;
      const holding = bagKeys(items).some((it) => bagCount(s.satchel, it) > 0);
      const shelfRoom = effects(s).shelf - bagTotal(s.shelf);
      const useful = (it: ItemId) => Object.keys(s.workshops).some((w) => BUILDINGS[w].recipe!.in[it]);
      if (!holding && bagKeys(s.satchel).some((it) => !useful(it)) && shelfRoom >= bagTotal(s.satchel)) { go(s, STALL); return; }
      mem.noStall = true; mem.hoard = items;
      try {
        // most valuable first: small, pricey items take satchel space first, bulk fills the rest
        for (const it of bagKeys(items).sort((a, b) => ITEMS[b].price - ITEMS[a].price)) {
          const missing = items[it] - have(s, it);
          if (missing > 0 && produce(s, mem, it, missing)) return;
        }
      } finally { mem.noStall = false; mem.hoard = null; }
      mem.wait = 0.5;
      return;
    }
  }
  const goalItems: Record<ItemId, number> = {};
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
  return res;
}
