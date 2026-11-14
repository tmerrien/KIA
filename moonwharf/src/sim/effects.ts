// Derived values from owned tech: capacities, multipliers, era and tech status. All pure queries.
import { BUILDINGS, TECHS, TECH_BY_ID, TUNING, WORKSHOP_FOR_ITEM } from './content';
import { bagCount } from './util';
import type { Bag, GameState, ItemId, TechId } from './types';

export interface Effects {
  carry: number; shelf: number; speed: number; customerRate: number; workSpeed: number;
  fleetIncome: number; extraCrews: number; automation: boolean;
}

/** carry/shelf: the largest value wins. speed/customerRate/workSpeed/fleetIncome multiply. extraCrews adds. */
export function effects(s: GameState): Effects {
  const e: Effects = {
    carry: TUNING.carry, shelf: TUNING.shelf, speed: 1, customerRate: 1, workSpeed: 1,
    fleetIncome: 1, extraCrews: 0, automation: false,
  };
  for (const t of TECHS) {
    if (!s.tech[t.id] || !t.effect) continue;
    const f = t.effect;
    if (f.carry !== undefined) e.carry = Math.max(e.carry, f.carry);
    if (f.shelf !== undefined) e.shelf = Math.max(e.shelf, f.shelf);
    if (f.speed !== undefined) e.speed *= f.speed;
    if (f.customerRate !== undefined) e.customerRate *= f.customerRate;
    if (f.workSpeed !== undefined) e.workSpeed *= f.workSpeed;
    if (f.fleetIncome !== undefined) e.fleetIncome *= f.fleetIncome;
    if (f.extraCrews !== undefined) e.extraCrews += f.extraCrews;
    if (f.automation) e.automation = true;
  }
  return e;
}

export function carryCap(s: GameState): number { return effects(s).carry; }
export function shelfCap(s: GameState): number { return effects(s).shelf; }

export function era(s: GameState): number {
  let e = 1;
  for (const t of TECHS) if (s.tech[t.id]) e = Math.max(e, t.era);
  return e;
}

export function techStatus(s: GameState, id: TechId): 'owned' | 'site' | 'available' | 'locked' {
  const t = TECH_BY_ID[id];
  if (!t) return 'locked';
  if (s.tech[id]) return 'owned';
  if (t.build && s.sites[t.build]) return 'site';
  for (const r of t.req ?? []) if (!s.tech[r]) return 'locked';
  return 'available';
}

/** Can the player pay `coins` and `items`, counting satchel + warehouse together. */
export function canAfford(s: GameState, coins: number, items: Bag): boolean {
  if (s.coins < coins) return false;
  for (const k in items) if (bagCount(s.satchel, k) + bagCount(s.warehouse, k) < items[k]) return false;
  return true;
}

/** Items consumed by any built workshop (or the shipyard). Automation and porters keep a reserve of these. */
export function consumedItems(s: GameState): Set<ItemId> {
  const out = new Set<ItemId>();
  for (const id of Object.keys(s.workshops)) for (const k in BUILDINGS[id].recipe?.in ?? {}) out.add(k);
  if (s.built.shipyard) for (const k in BUILDINGS.shipyard.shipRecipe?.in ?? {}) out.add(k);
  return out;
}

/** Products (tier >= 1) whose workshop is built. */
export function availableProducts(s: GameState): ItemId[] {
  return Object.keys(WORKSHOP_FOR_ITEM).filter((it) => s.built[WORKSHOP_FOR_ITEM[it]]).sort();
}
