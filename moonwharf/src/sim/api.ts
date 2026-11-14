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
import type { GameState, GameEvent, Ref, ItemId, TechId, BuildingId, Bag } from './types';
export type { GameState, GameEvent, Ref } from './types';

export declare function newGame(seed?: number): GameState;
export declare function tick(s: GameState, dt: number): GameEvent[];          // dt seconds, caller clamps to <=0.1
export declare function catchUp(s: GameState, seconds: number): GameEvent[];

// player commands
export declare function orderPlayer(s: GameState, ref: Ref): GameEvent[];     // returns toast if unreachable
export declare function pour(s: GameState, building: BuildingId, holdSeconds: number, dt: number): GameEvent[]; // call each frame while held
export declare function buyTech(s: GameState, id: TechId): GameEvent[];
export declare function takeFromWarehouse(s: GameState, item: ItemId, n: number): GameEvent[]; // player must be adjacent
export declare function fulfillContract(s: GameState, contractId: number): GameEvent[];

// queries (pure)
export declare function era(s: GameState): number;                            // 1..5, max era of owned tech (min 1)
export declare function carryCap(s: GameState): number;
export declare function shelfCap(s: GameState): number;
export declare function techStatus(s: GameState, id: TechId): 'owned' | 'site' | 'available' | 'locked';
export declare function canAfford(s: GameState, coins: number, items: Bag): boolean; // satchel + warehouse
export declare function siteNeeds(s: GameState, b: BuildingId): { coinsLeft: number; items: Bag } | null;
export declare function refAt(s: GameState, x: number, y: number): Ref;       // tile -> node/building/tile
export declare function isWalkable(s: GameState, x: number, y: number): boolean;
export declare function isAdjacent(s: GameState, ref: Ref): boolean;          // player stands next to ref
export declare function footprint(s: GameState, ref: Ref): { x: number; y: number; w: number; h: number };

// persistence
export declare function serialize(s: GameState): string;
export declare function deserialize(json: string): GameState | null;          // null if invalid/old version
