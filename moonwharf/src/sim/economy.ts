// Tech, construction sites, workshops, automation, drydock contracts, shipyard and fleet.
import {
  AUTOMATION_PERIOD, BUILDINGS, ITEMS, MAX_CONTRACTS, NODES, SHIP_NAMES, TECH_BY_ID, TECH_FOR_BUILDING, TUNING, itemName,
} from './content';
import { repathCrews } from './crews';
import { availableProducts, canAfford, consumedItems, effects, shelfCap, techStatus } from './effects';
import { repathHelpers, shelfAvailable, syncHelpers } from './helpers';
import { byTierDesc, describeBag, moveItem } from './inventory';
import { isAdjacent, nudgeOut, pathFor, walkGrid } from './path';
import { bagAdd, bagCount, bagKeys, bagTake, bagTotal, randInt } from './util';
import type { Bag, BuildingId, Contract, GameEvent, GameState, ItemId, TechId } from './types';

// ---------- map changes ----------

/** Call after anything that blocks new tiles: nudges movers off blocked tiles and re-plans their routes. */
export function afterMapChange(s: GameState): void {
  const grid = walkGrid(s);
  const p = s.player;
  const moved = nudgeOut(s, p, grid);
  if (p.path.length || moved) {
    if (p.target) {
      const np = pathFor(s, p, p.target, grid);
      if (np) p.path = np; else { p.path = []; p.target = null; p.action = null; }
    } else p.path = [];
  }
  repathHelpers(s);
  repathCrews(s);
}

// ---------- paying ----------

/** Takes items from satchel first, then warehouse. Caller checks affordability. */
export function payItems(s: GameState, items: Bag): void {
  for (const it of bagKeys(items)) {
    const left = items[it] - bagTake(s.satchel, it, items[it]);
    bagTake(s.warehouse, it, left);
  }
}

function missingText(s: GameState, coins: number, items: Bag): string {
  const parts: string[] = [];
  if (s.coins < coins) parts.push(`${Math.ceil(coins - s.coins)} more coins`);
  for (const it of bagKeys(items)) {
    const have = bagCount(s.satchel, it) + bagCount(s.warehouse, it);
    if (have < items[it]) parts.push(`${items[it] - have} more ${itemName(it)}`);
  }
  return `You need ${parts.join(' and ')}.`;
}

// ---------- tech ----------

export function buyTech(s: GameState, id: TechId): GameEvent[] {
  const t = TECH_BY_ID[id];
  if (!t) return [];
  const st = techStatus(s, id);
  if (st === 'owned') return [{ t: 'toast', text: `You already have ${t.name}.` }];
  if (st === 'site') return [{ t: 'toast', text: `${t.name} is already under construction.` }];
  if (st === 'locked') {
    const need = (t.req ?? []).filter((r) => !s.tech[r]).map((r) => TECH_BY_ID[r]?.name ?? r);
    return [{ t: 'toast', text: `Requires ${need.join(' and ')} first.` }];
  }
  if (t.build) {
    s.sites[t.build] = { coins: 0, items: {} };
    afterMapChange(s);
    return [{ t: 'toast', text: `${t.name}: construction site placed. Pour coins and deliver materials.` }];
  }
  const items = t.items ?? {};
  if (!canAfford(s, t.cost, items)) return [{ t: 'toast', text: missingText(s, t.cost, items) }];
  s.coins -= t.cost;
  payItems(s, items);
  return acquireTech(s, id);
}

/** Marks a tech owned and applies its one-time consequences. */
function acquireTech(s: GameState, id: TechId): GameEvent[] {
  const t = TECH_BY_ID[id];
  s.tech[id] = true;
  const kind = t.effect?.activateNodes;
  if (kind) {
    let changed = false;
    for (const n of s.nodes) {
      if (n.kind !== kind || n.active) continue;
      n.active = true; n.timer = 0; changed = true;
      n.amount = NODES[n.kind].max ?? 0;
      if (NODES[n.kind].crop) n.crop = 'empty';
    }
    if (changed) afterMapChange(s);
  }
  syncHelpers(s);
  return [{ t: 'tech', tech: id }];
}

// ---------- construction sites ----------

export function siteNeeds(s: GameState, b: BuildingId): { coinsLeft: number; items: Bag } | null {
  const site = s.sites[b];
  const t = TECH_FOR_BUILDING[b];
  if (!site || !t) return null;
  const items: Bag = {};
  for (const it of bagKeys(t.items ?? {})) {
    const left = (t.items ?? {})[it] - bagCount(site.items, it);
    if (left > 0) items[it] = left;
  }
  return { coinsLeft: Math.max(0, t.cost - site.coins), items };
}

/** Hold-to-pour: rate = max(minRate, cost * (baseFraction + accelPerSecond * holdSeconds)) coins per second. */
export function pourRate(cost: number, holdSeconds: number): number {
  const p = TUNING.pour;
  return Math.max(p.minRate, cost * (p.baseFraction + p.accelPerSecond * holdSeconds));
}

export function pour(s: GameState, b: BuildingId, holdSeconds: number, dt: number): GameEvent[] {
  const site = s.sites[b];
  const t = TECH_FOR_BUILDING[b];
  if (!site || !t) return [];
  const left = t.cost - site.coins;
  const ev: GameEvent[] = [];
  if (left > 0) {
    if (s.coins <= 0) return [];
    let amt = Math.min(pourRate(t.cost, holdSeconds) * dt, s.coins, left);
    if (left - amt < 1e-6) amt = left;
    if (amt > 0) {
      site.coins = Math.min(t.cost, site.coins + amt);
      s.coins = Math.max(0, s.coins - amt);
      if (s.coins < 1e-9) s.coins = 0;
      ev.push({ t: 'poured', building: b, coins: amt });
    }
  }
  ev.push(...checkSite(s, b));
  return ev;
}

/** Moves needed items into a site, from the satchel first, then the warehouse. */
export function deliverToSite(s: GameState, b: BuildingId): GameEvent[] {
  const site = s.sites[b];
  const need = siteNeeds(s, b);
  if (!site || !need) return [];
  const got: Bag = {};
  for (const it of bagKeys(need.items)) {
    let k = moveItem(s.satchel, site.items, it, need.items[it]);
    k += moveItem(s.warehouse, site.items, it, need.items[it] - k);
    if (k > 0) got[it] = k;
  }
  const ev: GameEvent[] = [];
  if (bagTotal(got) > 0) ev.push({ t: 'toast', text: `Delivered ${describeBag(got)}.` });
  const after = siteNeeds(s, b)!;
  if (bagTotal(after.items) > 0 && bagTotal(got) === 0) {
    ev.push({ t: 'toast', text: `The site still needs ${describeBag(after.items)}.` });
  }
  ev.push(...checkSite(s, b));
  return ev;
}

/** Completes the site if all coins and items are in. */
export function checkSite(s: GameState, b: BuildingId): GameEvent[] {
  const need = siteNeeds(s, b);
  if (!need || need.coinsLeft > 1e-6 || bagTotal(need.items) > 0) return [];
  const t = TECH_FOR_BUILDING[b];
  delete s.sites[b];
  s.built[b] = true;
  const def = BUILDINGS[b];
  if (def.kind === 'workshop') s.workshops[b] = { input: {}, output: 0, busy: false, progress: 0 };
  if (def.kind === 'shipyard') s.shipyard = { progress: 0, busy: false, input: {} };
  const ev: GameEvent[] = [{ t: 'built', building: b }];
  ev.push(...acquireTech(s, t.id));
  return ev;
}

// ---------- workshops ----------

export function tickWorkshops(s: GameState, dt: number): GameEvent[] {
  const ev: GameEvent[] = [];
  const speed = effects(s).workSpeed;
  for (const id of Object.keys(s.workshops).sort()) {
    const w = s.workshops[id];
    const r = BUILDINGS[id].recipe!;
    if (!w.busy) {
      if (w.output >= TUNING.workshopOutputCap) continue;
      if (bagKeys(r.in).some((it) => bagCount(w.input, it) < r.in[it])) continue;
      for (const it of bagKeys(r.in)) bagAdd(w.input, it, -r.in[it]);
      w.busy = true; w.progress = 0;
    }
    w.progress += dt * speed;
    if (w.progress >= r.time) {
      w.busy = false; w.progress = 0; w.output += 1;
      ev.push({ t: 'crafted', building: id, item: r.out });
    }
  }
  return ev;
}

/** Player at a workshop: load recipe inputs from satchel (cap each), take finished goods into the satchel. */
export function useWorkshop(s: GameState, id: BuildingId, room: number): GameEvent[] {
  const w = s.workshops[id];
  const r = BUILDINGS[id].recipe!;
  if (!w) return [];
  let loaded = 0;
  for (const it of bagKeys(r.in)) loaded += moveItem(s.satchel, w.input, it, TUNING.workshopInputCap - bagCount(w.input, it));
  const take = Math.min(w.output, Math.max(0, room + loaded));
  if (take > 0) { w.output -= take; bagAdd(s.satchel, r.out, take); }
  const ev: GameEvent[] = [];
  if (take > 0) ev.push({ t: 'gather', x: BUILDINGS[id].x, y: BUILDINGS[id].y, item: r.out, n: take });
  if (w.output > 0 && take === 0) ev.push({ t: 'toast', text: 'Your satchel is full. Sell at the market stall.' });
  if (loaded === 0 && take === 0 && w.output === 0 && !w.busy) {
    ev.push({ t: 'toast', text: `The ${BUILDINGS[id].name} needs ${describeBag(r.in)} per ${itemName(r.out)}.` });
  }
  return ev;
}

// ---------- automation (Cargo rails) ----------

export function tickAutomation(s: GameState, prevTime: number): void {
  if (!s.built.warehouse || !effects(s).automation) return;
  if (Math.floor(s.time / AUTOMATION_PERIOD) === Math.floor(prevTime / AUTOMATION_PERIOD)) return;
  runAutomation(s);
}

export function runAutomation(s: GameState): void {
  for (const id of Object.keys(s.workshops).sort()) {
    const w = s.workshops[id];
    const r = BUILDINGS[id].recipe!;
    if (w.output > 0) { bagAdd(s.warehouse, r.out, w.output); w.output = 0; }
    for (const it of bagKeys(r.in)) moveItem(s.warehouse, w.input, it, TUNING.workshopInputCap - bagCount(w.input, it));
  }
  let room = shelfCap(s) - bagTotal(s.shelf);
  const reserve = consumedItems(s);
  for (const it of byTierDesc(bagKeys(s.warehouse))) {
    if (room <= 0) break;
    const k = moveItem(s.warehouse, s.shelf, it, Math.min(room, shelfAvailable(s, it, reserve)));
    room -= k;
  }
}

// ---------- drydock contracts ----------

export function contractReward(items: Bag): number {
  let v = 0;
  for (const it of bagKeys(items)) v += (ITEMS[it]?.price ?? 0) * items[it];
  return Math.round(v * TUNING.contractMultiplier);
}

function newContract(s: GameState): Contract | null {
  const products = availableProducts(s);
  if (!products.length) return null;
  const kinds = randInt(s, 1, Math.min(2, products.length));
  const pool = [...products];
  const items: Bag = {};
  for (let i = 0; i < kinds; i++) {
    const it = pool.splice(randInt(s, 0, pool.length - 1), 1)[0];
    items[it] = (ITEMS[it]?.tier ?? 1) >= 2 ? randInt(s, 1, 3) : randInt(s, 2, 6);
  }
  return { id: s.nextId++, ship: SHIP_NAMES[randInt(s, 0, SHIP_NAMES.length - 1)], items, reward: contractReward(items) };
}

export function tickContracts(s: GameState): void {
  if (!s.built.drydock) return;
  while (s.contracts.length < MAX_CONTRACTS) {
    const c = newContract(s);
    if (!c) break;
    s.contracts.push(c);
  }
}

export function fulfillContract(s: GameState, contractId: number): GameEvent[] {
  const c = s.contracts.find((k) => k.id === contractId);
  if (!c) return [];
  if (!canAfford(s, 0, c.items)) return [{ t: 'toast', text: `The ${c.ship} needs ${describeBag(c.items)}. ${missingText(s, 0, c.items)}` }];
  payItems(s, c.items);
  s.coins += c.reward; s.earned += c.reward;
  s.contracts = s.contracts.filter((k) => k !== c);
  tickContracts(s);
  return [{ t: 'contract', ship: c.ship, coins: c.reward }];
}

// ---------- shipyard + fleet ----------

export function shipName(index: number): string {
  const base = SHIP_NAMES[index % SHIP_NAMES.length];
  const round = Math.floor(index / SHIP_NAMES.length);
  return round === 0 ? base : `${base} ${['II', 'III', 'IV', 'V', 'VI'][Math.min(round - 1, 4)]}`;
}

export function tickShipyard(s: GameState, dt: number): GameEvent[] {
  const y = s.shipyard;
  const recipe = BUILDINGS.shipyard?.shipRecipe;
  if (!y || !s.built.shipyard || !recipe) return [];
  const ev: GameEvent[] = [];
  if (!y.busy) {
    for (const it of bagKeys(recipe.in)) moveItem(s.warehouse, y.input, it, recipe.in[it] - bagCount(y.input, it));
    if (bagKeys(recipe.in).every((it) => bagCount(y.input, it) >= recipe.in[it])) {
      for (const it of bagKeys(recipe.in)) bagAdd(y.input, it, -recipe.in[it]);
      y.busy = true; y.progress = 0;
    }
  }
  if (y.busy) {
    y.progress += dt;
    if (y.progress >= recipe.time) {
      y.busy = false; y.progress = 0;
      const name = shipName(s.fleet.length);
      s.fleet.push({ id: s.nextId++, name, voyage: 0 });
      ev.push({ t: 'toast', text: `The ${name} slides down the ways and joins your fleet!` });
    }
  }
  return ev;
}

export function voyageIncome(s: GameState): number { return TUNING.fleetVoyageIncome * effects(s).fleetIncome; }

export function tickFleet(s: GameState, dt: number): GameEvent[] {
  const ev: GameEvent[] = [];
  for (const ship of s.fleet) {
    ship.voyage += dt;
    while (ship.voyage >= TUNING.fleetVoyageSeconds) {
      ship.voyage -= TUNING.fleetVoyageSeconds;
      const coins = voyageIncome(s);
      s.coins += coins; s.earned += coins;
      ev.push({ t: 'voyage', ship: ship.name, coins });
    }
  }
  return ev;
}

// ---------- warehouse ----------

export function takeFromWarehouse(s: GameState, item: ItemId, n: number): GameEvent[] {
  const ref = { k: 'bld', id: 'warehouse' } as const;
  if (!s.built.warehouse) return [];
  if (!isAdjacent(s, ref)) return [{ t: 'toast', text: 'Walk to the warehouse first.' }];
  const room = effects(s).carry - bagTotal(s.satchel);
  if (room <= 0) return [{ t: 'toast', text: 'Your satchel is full.' }];
  const k = moveItem(s.warehouse, s.satchel, item, Math.min(n, room));
  if (k === 0) return [{ t: 'toast', text: `The warehouse has no ${itemName(item)}.` }];
  return [];
}
