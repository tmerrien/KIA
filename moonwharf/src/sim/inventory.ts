// Moving goods between bags with the game's ordering rules.
import { ITEMS } from './content';
import { bagAdd, bagCount, bagKeys, bagTake, bagTotal } from './util';
import type { Bag, ItemId } from './types';

/** Items sorted by price high -> low, then id (deterministic). */
export function byPriceDesc(items: ItemId[]): ItemId[] {
  return [...items].sort((a, b) => (ITEMS[b]?.price ?? 0) - (ITEMS[a]?.price ?? 0) || (a < b ? -1 : a > b ? 1 : 0));
}
/** Items sorted by tier high -> low, then price high -> low, then id. */
export function byTierDesc(items: ItemId[]): ItemId[] {
  return [...items].sort((a, b) =>
    (ITEMS[b]?.tier ?? 0) - (ITEMS[a]?.tier ?? 0) || (ITEMS[b]?.price ?? 0) - (ITEMS[a]?.price ?? 0) || (a < b ? -1 : a > b ? 1 : 0));
}

/** Moves items from `from` onto the shelf, highest price first, until the shelf holds `cap` items. Returns count moved. */
export function fillShelf(from: Bag, shelf: Bag, cap: number): number {
  let room = cap - bagTotal(shelf);
  let moved = 0;
  for (const it of byPriceDesc(bagKeys(from))) {
    if (room <= 0) break;
    const k = bagTake(from, it, room);
    bagAdd(shelf, it, k);
    room -= k; moved += k;
  }
  return moved;
}

/** Moves everything from `from` into `to`. Returns count moved. */
export function moveAll(from: Bag, to: Bag): number {
  let n = 0;
  for (const it of bagKeys(from)) { const k = bagCount(from, it); bagAdd(to, it, k); n += k; delete from[it]; }
  return n;
}

export function moveItem(from: Bag, to: Bag, item: ItemId, n: number): number {
  const k = bagTake(from, item, n);
  bagAdd(to, item, k);
  return k;
}

export function describeBag(b: Bag): string {
  return bagKeys(b).map((k) => `${b[k]} ${ITEMS[k]?.name ?? k}`).join(', ');
}
