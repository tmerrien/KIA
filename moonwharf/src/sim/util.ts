// Small deterministic utilities: seeded rng and Bag arithmetic.
import type { Bag, GameState, ItemId } from './types';

/** mulberry32 step on s.rngSeed. Returns a float in [0, 1). The only randomness source in the sim. */
export function rand(s: GameState): number {
  s.rngSeed = (s.rngSeed + 0x6d2b79f5) | 0;
  let t = s.rngSeed;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
/** Integer in [lo, hi] inclusive. */
export function randInt(s: GameState, lo: number, hi: number): number {
  return lo + Math.floor(rand(s) * (hi - lo + 1));
}

export function bagCount(b: Bag, item: ItemId): number { return b[item] ?? 0; }
export function bagTotal(b: Bag): number {
  let n = 0;
  for (const k in b) n += b[k];
  return n;
}
export function bagAdd(b: Bag, item: ItemId, n: number): void {
  if (n === 0) return;
  const v = (b[item] ?? 0) + n;
  if (v > 0) b[item] = v; else delete b[item];
}
/** Removes up to n; returns how many were removed. */
export function bagTake(b: Bag, item: ItemId, n: number): number {
  const have = b[item] ?? 0;
  const k = Math.max(0, Math.min(have, n));
  bagAdd(b, item, -k);
  return k;
}
/** Sorted item keys (stable iteration order for determinism across JS and Swift). */
export function bagKeys(b: Bag): ItemId[] { return Object.keys(b).sort(); }
