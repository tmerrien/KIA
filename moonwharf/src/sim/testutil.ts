// Shared helpers for the sim tests (parity checklist for the Swift port). Not used by the game.
import { BUILDINGS, TECH_BY_ID } from './content';
import { buyTech, checkSite } from './economy';
import { tick } from './state';
import type { Bag, GameEvent, GameState, TechId } from './types';
import { bagAdd } from './util';

/** Acquire techs through the real code paths: build techs via a fully supplied site, others by paying. */
export function grant(s: GameState, ...ids: TechId[]): void {
  for (const id of ids) {
    const t = TECH_BY_ID[id];
    if (s.tech[id]) continue;
    for (const r of t.req ?? []) grant(s, r);
    if (t.build) {
      buyTech(s, id);
      s.sites[t.build] = { coins: t.cost, items: { ...(t.items ?? {}) } };
      checkSite(s, t.build);
    } else {
      s.coins += t.cost;
      for (const [k, n] of Object.entries(t.items ?? {})) bagAdd(s.satchel, k, n);
      buyTech(s, id);
    }
    if (!s.tech[id]) throw new Error(`grant failed for ${id}`);
  }
}

/** Tick in 0.1s steps for `seconds`, collecting events. */
export function run(s: GameState, seconds: number, dt = 0.1): GameEvent[] {
  const ev: GameEvent[] = [];
  const steps = Math.round(seconds / dt);
  for (let i = 0; i < steps; i++) ev.push(...tick(s, dt));
  return ev;
}

/** Tick until `cond` holds (or `maxSeconds` pass). Returns seconds elapsed. */
export function runUntil(s: GameState, cond: () => boolean, maxSeconds: number, dt = 0.1): number {
  const start = s.time;
  while (!cond() && s.time - start < maxSeconds) tick(s, dt);
  return s.time - start;
}

export function toasts(ev: GameEvent[]): string[] {
  return ev.filter((e): e is { t: 'toast'; text: string } => e.t === 'toast').map((e) => e.text);
}

export function nodeIndex(s: GameState, kind: string, nth = 0): number {
  const idx = s.nodes.map((n, i) => (n.kind === kind ? i : -1)).filter((i) => i >= 0);
  return idx[nth];
}

export function total(b: Bag): number { return Object.values(b).reduce((a, c) => a + c, 0); }
export { BUILDINGS };
