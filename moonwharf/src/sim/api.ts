// Public sim API. Render and UI import ONLY from here (and types.ts).
// Implementation lives in the other files under src/sim/. Every function is synchronous and deterministic.
//
// Game rules summary (authoritative detail is in content/*.json):
// - Player taps a Ref -> orderPlayer() computes a 4-direction BFS path to a walkable tile adjacent to it
//   (edge-adjacent, not diagonal; a 'tile' ref paths to that tile). On arrival the sim runs the interaction:
//     node     -> timed gather (node.work seconds) adding 1 item (crops: plant if empty, harvest `yield` if ripe);
//                 repeats automatically while the node has stock and the satchel has room.
//     stall    -> moves satchel items onto the shelf, highest price first, up to shelf capacity.
//     board    -> emits nothing; UI opens the tech tree when the player arrives (UI watches player.target).
//     workshop -> loads recipe inputs from satchel (cap workshopInputCap each), takes finished output into satchel.
//     warehouse-> deposits whole satchel.
//     site     -> delivers needed items from satchel, then from warehouse.
//     drydock/shipyard -> nothing automatic; UI shows contracts / fleet.
// - Workshops craft continuously while inputs suffice and output < workshopOutputCap.
// - Crews spawn at map.crewSpawns every customerInterval / customerRate (jittered with rng), walk up the pier
//   and the boardwalk to crewMarketSpot, wait 0.8s, buy 1..customerBuysMax random shelf items (weighted by count),
//   pay item price each, then walk back and despawn. Empty shelf -> disappointed.
// - Buying a tech with `build` creates a Site (free). The site completes when poured coins == cost and all items
//   delivered; then built[id]=true, tech[id]=true, workshop state created, helpers spawned for huts.
//   Techs without `build` are bought instantly with coins + items (satchel first, then warehouse).
// - Helpers (dockhand/porter) follow the job logic described in helpers.ts. extraCrews adds one of each per tech.
// - With the `automation` effect, every 0.5s: workshops pull inputs from the warehouse and push outputs to it;
//   the shelf restocks from the warehouse (highest tier first, keeping >=20 of anything a workshop consumes).
// - Drydock: keeps 3 contracts. Shipyard: consumes shipRecipe inputs from warehouse, each finished ship joins
//   the fleet; every ship pays fleetVoyageIncome * fleetIncome effect each fleetVoyageSeconds.
// - Offline: on load the UI calls catchUp(state, seconds) which sells shelf stock at the customer rate,
//   regrows nodes and pays fleet voyages, capped at offlineCapSeconds.
export type { GameState, GameEvent, Ref } from './types';

// Signatures (implemented in the modules re-exported below):
//   newGame(seed?: number): GameState
//   tick(s, dt): GameEvent[]                          dt seconds, caller clamps to <=0.1
//   catchUp(s, seconds): GameEvent[]
// player commands
//   orderPlayer(s, ref): GameEvent[]                  returns toast if unreachable
//   pour(s, building, holdSeconds, dt): GameEvent[]   call each frame while held
//   buyTech(s, id): GameEvent[]
//   takeFromWarehouse(s, item, n): GameEvent[]        player must be adjacent
//   fulfillContract(s, contractId): GameEvent[]
// queries (pure)
//   era(s): number                                    1..5, max era of owned tech (min 1)
//   carryCap(s), shelfCap(s): number
//   techStatus(s, id): 'owned' | 'site' | 'available' | 'locked'
//   canAfford(s, coins, items): boolean               satchel + warehouse
//   siteNeeds(s, b): { coinsLeft; items } | null
//   refAt(s, x, y): Ref                               tile -> node/building/tile
//   isWalkable(s, x, y): boolean
//   isAdjacent(s, ref): boolean                       player stands next to ref
//   footprint(s, ref): { x; y; w; h }
// persistence
//   serialize(s): string
//   deserialize(json): GameState | null               null if invalid/old version
export { newGame, tick, catchUp } from './state';
export { orderPlayer } from './player';
export { pour, buyTech, takeFromWarehouse, fulfillContract, siteNeeds } from './economy';
export { era, carryCap, shelfCap, techStatus, canAfford } from './effects';
export { refAt, isWalkable, isAdjacent, footprint } from './path';
export { serialize, deserialize } from './persistence';
