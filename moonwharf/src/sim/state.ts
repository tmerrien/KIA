// New game, the main tick and offline catch-up.
import { BUILDINGS, MAP, NODES, TUNING } from './content';
import { nextCrewDelay, pickShelfItem, sellOne, tickCrews } from './crews';
import { tickAutomation, tickContracts, tickFleet, tickShipyard, tickWorkshops } from './economy';
import { effects } from './effects';
import { tickHelpers } from './helpers';
import { tickPlayer } from './player';
import { bagTotal, randInt } from './util';
import type { GameEvent, GameState, ResourceNode } from './types';

export function newGame(seed = 1): GameState {
  const nodes: ResourceNode[] = MAP.nodes.map((n) => {
    const def = NODES[n.kind];
    const node: ResourceNode = { kind: n.kind, x: n.x, y: n.y, active: n.active, amount: def.max ?? 0, timer: 0 };
    if (def.crop) node.crop = n.active ? 'ripe' : 'empty';
    return node;
  });
  const built: Record<string, true> = {};
  for (const [id, b] of Object.entries(BUILDINGS)) if (b.startBuilt) built[id] = true;
  const s: GameState = {
    version: 1, time: 0, rngSeed: seed | 0,
    coins: TUNING.startCoins, earned: 0, sold: 0,
    satchel: {}, shelf: {}, warehouse: {},
    tech: {}, built, sites: {}, workshops: {}, nodes,
    player: { x: MAP.playerStart.x, y: MAP.playerStart.y, path: [], dir: 1, walkT: 0, target: null, action: null },
    helpers: [], crews: [], contracts: [], fleet: [], shipyard: null,
    nextId: 1, crewTimer: 0,
  };
  s.crewTimer = Math.min(2, nextCrewDelay(s));
  return s;
}

/** Regrow finite nodes and grow crops. */
export function tickNodes(s: GameState, dt: number): void {
  for (const n of s.nodes) {
    if (!n.active) continue;
    const def = NODES[n.kind];
    if (def.crop) {
      if (n.crop === 'growing') {
        n.timer += dt;
        if (n.timer >= (def.grow ?? 0)) { n.crop = 'ripe'; n.timer = 0; }
      }
      continue;
    }
    if (def.infinite || def.max === undefined || def.regrow === undefined) continue;
    if (n.amount >= def.max) { n.timer = 0; continue; }
    n.timer += dt;
    while (n.timer >= def.regrow && n.amount < def.max) { n.timer -= def.regrow; n.amount += 1; }
    if (n.amount >= def.max) n.timer = 0;
  }
}

export function tick(s: GameState, dt: number): GameEvent[] {
  if (!(dt > 0)) return [];
  const prev = s.time;
  s.time += dt;
  const ev: GameEvent[] = [];
  tickNodes(s, dt);
  ev.push(...tickPlayer(s, dt));
  ev.push(...tickHelpers(s, dt));
  ev.push(...tickWorkshops(s, dt));
  tickAutomation(s, prev);
  ev.push(...tickCrews(s, dt));
  tickContracts(s);
  ev.push(...tickShipyard(s, dt));
  ev.push(...tickFleet(s, dt));
  return ev;
}

/**
 * Offline progress for `seconds` (capped at offlineCapSeconds): crews buy shelf stock at the customer rate,
 * nodes regrow, crops ripen and the fleet completes voyages. Workshops and helpers do not run offline.
 */
export function catchUp(s: GameState, seconds: number): GameEvent[] {
  const secs = Math.min(Math.max(0, seconds), TUNING.offlineCapSeconds);
  if (secs <= 0) return [];
  const ev: GameEvent[] = [];
  s.time += secs;
  tickNodes(s, secs);
  // sales
  const interval = TUNING.customerInterval / effects(s).customerRate;
  const crews = Math.floor(secs / interval);
  let soldN = 0, soldCoins = 0;
  for (let i = 0; i < crews && bagTotal(s.shelf) > 0; i++) {
    const n = randInt(s, 1, TUNING.customerBuysMax);
    for (let j = 0; j < n; j++) {
      const it = pickShelfItem(s);
      if (!it) break;
      soldCoins += sellOne(s, it); soldN++;
    }
  }
  // fleet
  let fleetCoins = 0;
  for (const e of tickFleet(s, secs)) if (e.t === 'voyage') fleetCoins += e.coins;
  if (fleetCoins > 0) ev.push({ t: 'voyage', ship: s.fleet.length === 1 ? s.fleet[0].name : 'Your fleet', coins: fleetCoins });
  const parts: string[] = [];
  if (soldN > 0) parts.push(`crews bought ${soldN} goods for ${Math.round(soldCoins)} coins`);
  if (fleetCoins > 0) parts.push(`your fleet earned ${Math.round(fleetCoins)} coins`);
  if (parts.length) ev.push({ t: 'toast', text: `While you were away, ${parts.join(' and ')}.` });
  return ev;
}
