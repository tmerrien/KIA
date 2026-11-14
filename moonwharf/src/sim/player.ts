// Player orders, walking, gathering and arrival interactions.
import { BUILDINGS, NODES, TUNING } from './content';
import { deliverToSite, useWorkshop } from './economy';
import { effects } from './effects';
import { fillShelf, moveAll } from './inventory';
import { pathFor, stepMover } from './path';
import { bagAdd, bagTotal } from './util';
import type { GameEvent, GameState, NodeKind, Ref } from './types';

export const SATCHEL_FULL = 'Your satchel is full. Sell at the market stall.';
export const CANT_GET_THERE = "Can't get there.";

const GATHER_LABEL: Record<NodeKind, string> = {
  ore: 'Mining', crystal: 'Chipping', moss: 'Harvesting', ice: 'Cutting ice', wreck: 'Salvaging',
};

export function orderPlayer(s: GameState, ref: Ref): GameEvent[] {
  const p = s.player;
  if (ref.k === 'node' && (!s.nodes[ref.i] || !s.nodes[ref.i].active)) {
    const n = s.nodes[ref.i];
    if (!n) return [];
    ref = { k: 'tile', x: n.x, y: n.y };
  }
  const path = pathFor(s, p, ref);
  if (!path) return [{ t: 'toast', text: CANT_GET_THERE }];
  p.action = null;
  p.target = ref;
  p.path = path;
  if (path.length === 0) return arrive(s);
  return [];
}

export function tickPlayer(s: GameState, dt: number): GameEvent[] {
  const p = s.player;
  if (p.action) {
    p.action.t += dt;
    if (p.action.t < p.action.d) return [];
    p.action = null;
    const ev = gatherOnce(s);
    ev.push(...startGather(s, false));
    return ev;
  }
  if (p.path.length && stepMover(p, TUNING.walkSpeed * effects(s).speed, dt)) return arrive(s);
  return [];
}

/** Runs the interaction for player.target. The target stays set (UI uses it to open panels) except for plain tiles. */
function arrive(s: GameState): GameEvent[] {
  const p = s.player;
  const t = p.target;
  if (!t) return [];
  if (t.k === 'tile') { p.target = null; return []; }
  if (t.k === 'node') return startGather(s, true);
  const id = t.id;
  if (s.sites[id]) return deliverToSite(s, id);
  if (!s.built[id]) return [];
  const room = effects(s).carry - bagTotal(s.satchel);
  switch (BUILDINGS[id].kind) {
    case 'stall': {
      if (bagTotal(s.satchel) === 0) return [{ t: 'toast', text: 'Your satchel is empty. Gather something to sell.' }];
      const moved = fillShelf(s.satchel, s.shelf, effects(s).shelf);
      if (moved === 0) return [{ t: 'toast', text: 'The shelf is full. Wait for crews to buy.' }];
      return [];
    }
    case 'workshop': return useWorkshop(s, id, room);
    case 'warehouse': moveAll(s.satchel, s.warehouse); return [];
    default: return []; // board, huts, drydock, shipyard: UI reacts to player.target
  }
}

/** Starts the next timed gather at the target node, or explains why not. */
function startGather(s: GameState, first: boolean): GameEvent[] {
  const p = s.player;
  if (!p.target || p.target.k !== 'node') return [];
  const n = s.nodes[p.target.i];
  const def = NODES[n.kind];
  const room = effects(s).carry - bagTotal(s.satchel);
  if (!n.active) return [];
  if (def.crop) {
    if (n.crop === 'empty') { p.action = { t: 0, d: def.plantWork ?? def.work, label: 'Planting' }; return []; }
    if (n.crop === 'growing') {
      return first ? [{ t: 'toast', text: `Still growing (${Math.ceil((def.grow ?? 0) - n.timer)}s)` }] : [];
    }
    if (room <= 0) return [{ t: 'toast', text: SATCHEL_FULL }];
    p.action = { t: 0, d: def.work, label: GATHER_LABEL[n.kind] };
    return [];
  }
  if (!def.infinite && n.amount < 1) {
    return first ? [{ t: 'toast', text: `Nothing left here. It regrows in ${Math.ceil((def.regrow ?? 0) - n.timer)}s.` }] : [];
  }
  if (room <= 0) return [{ t: 'toast', text: SATCHEL_FULL }];
  p.action = { t: 0, d: def.work, label: GATHER_LABEL[n.kind] };
  return [];
}

function gatherOnce(s: GameState): GameEvent[] {
  const p = s.player;
  if (!p.target || p.target.k !== 'node') return [];
  const n = s.nodes[p.target.i];
  const def = NODES[n.kind];
  const room = effects(s).carry - bagTotal(s.satchel);
  if (def.crop) {
    if (n.crop === 'empty') { n.crop = 'growing'; n.timer = 0; return []; }
    if (n.crop !== 'ripe' || room <= 0) return [];
    const k = Math.min(def.yield ?? 1, room);
    bagAdd(s.satchel, def.gives, k);
    n.crop = 'empty'; n.timer = 0;
    return [{ t: 'gather', x: n.x, y: n.y, item: def.gives, n: k }];
  }
  if (room <= 0) return [];
  if (!def.infinite) { if (n.amount < 1) return []; n.amount -= 1; }
  bagAdd(s.satchel, def.gives, 1);
  return [{ t: 'gather', x: n.x, y: n.y, item: def.gives, n: 1 }];
}
