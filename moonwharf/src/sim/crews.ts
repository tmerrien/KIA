// Customer crews: spawn on the pier, walk to the market spot, buy from the shelf, walk back and leave.
import { CREW_WAIT, ITEMS, MAP, MAX_CREWS, TUNING } from './content';
import { effects } from './effects';
import { pathFor, stepMover, walkGrid, nudgeOut } from './path';
import { bagAdd, bagKeys, bagTotal, rand, randInt } from './util';
import type { Crew, GameEvent, GameState, ItemId, Ref } from './types';

const CREW_COLORS = 6;

function marketRef(): Ref { return { k: 'tile', x: MAP.crewMarketSpot.x, y: MAP.crewMarketSpot.y }; }
function nearestSpawn(c: { x: number; y: number }): Ref {
  let best = MAP.crewSpawns[0];
  for (const sp of MAP.crewSpawns) {
    if (Math.abs(sp.x - c.x) + Math.abs(sp.y - c.y) < Math.abs(best.x - c.x) + Math.abs(best.y - c.y)) best = sp;
  }
  return { k: 'tile', x: best.x, y: best.y };
}

/** Seconds until the next crew: customerInterval / customerRate, jittered to 70%..130%. */
export function nextCrewDelay(s: GameState): number {
  return (TUNING.customerInterval / effects(s).customerRate) * (0.7 + 0.6 * rand(s));
}

/** Picks one shelf item, weighted by count. */
export function pickShelfItem(s: GameState): ItemId | null {
  const total = bagTotal(s.shelf);
  if (total <= 0) return null;
  let r = Math.floor(rand(s) * total);
  for (const it of bagKeys(s.shelf)) {
    r -= s.shelf[it];
    if (r < 0) return it;
  }
  return null;
}

/** One sale of one shelf item. */
export function sellOne(s: GameState, item: ItemId): number {
  const p = ITEMS[item]?.price ?? 0;
  bagAdd(s.shelf, item, -1);
  s.coins += p; s.earned += p; s.sold += 1;
  return p;
}

export function tickCrews(s: GameState, dt: number): GameEvent[] {
  const ev: GameEvent[] = [];
  s.crewTimer -= dt;
  if (s.crewTimer <= 0) {
    s.crewTimer += nextCrewDelay(s);
    if (s.crewTimer <= 0) s.crewTimer = nextCrewDelay(s);
    if (s.crews.length < MAX_CREWS && s.built.stall) spawnCrew(s);
  }
  for (const c of s.crews) {
    if (c.path.length) { stepMover(c, TUNING.helperSpeed, dt); continue; }
    if (c.state === 'arriving') { c.state = 'shopping'; c.wait = CREW_WAIT; continue; }
    if (c.state === 'shopping') {
      c.wait -= dt;
      if (c.wait > 0) continue;
      buy(s, c, ev);
      c.state = 'leaving';
      c.path = pathFor(s, c, nearestSpawn(c)) ?? [];
      continue;
    }
    if (c.state === 'leaving') c.wait = -1; // arrived at the spawn: despawn below
  }
  s.crews = s.crews.filter((c) => !(c.state === 'leaving' && c.path.length === 0 && c.wait === -1));
  return ev;
}

function spawnCrew(s: GameState): void {
  const sp = MAP.crewSpawns[randInt(s, 0, MAP.crewSpawns.length - 1)];
  const c: Crew = {
    id: s.nextId++, state: 'arriving', wait: 0, bought: null, disappointed: false,
    color: randInt(s, 0, CREW_COLORS - 1), x: sp.x, y: sp.y, path: [], dir: 1, walkT: 0,
  };
  c.path = pathFor(s, c, marketRef()) ?? [];
  s.crews.push(c);
}

function buy(s: GameState, c: Crew, ev: GameEvent[]): void {
  const n = randInt(s, 1, TUNING.customerBuysMax);
  for (let i = 0; i < n; i++) {
    const it = pickShelfItem(s);
    if (!it) break;
    const coins = sellOne(s, it);
    c.bought = it;
    ev.push({ t: 'sale', x: c.x, y: c.y, coins, item: it });
  }
  if (!c.bought) c.disappointed = true;
}

export function repathCrews(s: GameState): void {
  const grid = walkGrid(s);
  for (const c of s.crews) {
    nudgeOut(s, c, grid);
    if (!c.path.length) continue;
    const dest = c.state === 'arriving' ? marketRef() : nearestSpawn(c);
    c.path = pathFor(s, c, dest, grid) ?? [];
  }
}
