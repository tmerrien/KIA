// Moonwharf simulation contract.
// The sim is pure TypeScript: no DOM, no canvas, no Math.random (use the seeded rng in state),
// no Date.now (time only advances through tick). Render and UI read GameState and call the
// functions in api.ts; they never mutate state directly. This keeps the Swift port a 1:1 translation.

export type ItemId = string;          // keys of content/items.json
export type BuildingId = string;      // keys of content/buildings.json
export type TechId = string;          // ids in content/tech.json
export type NodeKind = 'ore' | 'crystal' | 'moss' | 'ice' | 'wreck';
export type Bag = Record<ItemId, number>; // counts > 0 only; zero entries are deleted

export interface Recipe { in: Bag; out: ItemId; time: number }

// A thing on the map you can walk to and use.
export type Ref =
  | { k: 'node'; i: number }            // index into GameState.nodes
  | { k: 'bld'; id: BuildingId }
  | { k: 'tile'; x: number; y: number };

export interface ResourceNode {
  kind: NodeKind; x: number; y: number; active: boolean;
  amount: number;      // units available now (finite nodes); unused for crops/infinite
  timer: number;       // regrow or crop growth progress, seconds
  crop?: 'empty' | 'growing' | 'ripe';
}

export interface Workshop { input: Bag; output: number; busy: boolean; progress: number }

export interface Site { coins: number; items: Bag }   // construction in progress, keyed by building id

export interface Mover {           // anything that walks: player, helpers, crews
  x: number; y: number;            // tile coords, float while moving; integer (x,y) = standing on the center of tile (x,y)
  path: [number, number][];        // remaining waypoints (tile centers), excluding current
  dir: 1 | -1;                     // facing for render
  walkT: number;                   // seconds spent walking, for animation
}

export interface Player extends Mover {
  target: Ref | null;              // what to interact with on arrival
  action: { t: number; d: number; label: string } | null; // timed work in progress (render shows a ring)
}

export interface Helper extends Mover {
  id: number; kind: 'dockhand' | 'porter'; carry: Bag;
  task: string;                    // short human text for UI ("Mining ore", "Idle")
  action: { t: number; d: number } | null;
  job?: HelperJob | null;          // sim-internal: current job (render/UI should use `task`)
}

// Sim-internal helper job: a claim key (so two helpers never take the same job) and steps to walk through.
export type HelperOp = 'gather' | 'deposit' | 'takeOutput' | 'shelf' | 'take' | 'load';
export interface HelperStep { ref: Ref; op: HelperOp; item?: ItemId; n?: number }
export interface HelperJob { claim: string; steps: HelperStep[] }

export interface Crew extends Mover {
  id: number; state: 'arriving' | 'shopping' | 'leaving'; wait: number;
  bought: ItemId | null; disappointed: boolean; color: number; // color = palette index
}

export interface Contract { id: number; ship: string; items: Bag; reward: number }

export interface Ship { id: number; name: string; voyage: number } // voyage progress seconds

export interface GameState {
  version: 1;
  time: number;                    // total simulated seconds
  rngSeed: number;
  coins: number; earned: number; sold: number;
  satchel: Bag; shelf: Bag; warehouse: Bag;
  tech: Record<TechId, true>;
  built: Record<BuildingId, true>;
  sites: Record<BuildingId, Site>;
  workshops: Record<BuildingId, Workshop>;
  nodes: ResourceNode[];
  player: Player;
  helpers: Helper[];
  crews: Crew[];
  contracts: Contract[];           // drydock repair jobs (max 3)
  fleet: Ship[];                   // ships built at the shipyard
  shipyard: { progress: number; busy: boolean; input: Bag } | null;
  nextId: number;
  crewTimer: number;
}

// Things that happened during a tick or command. Render/UI use them for sound, floating text, toasts.
export type GameEvent =
  | { t: 'sale'; x: number; y: number; coins: number; item: ItemId }
  | { t: 'gather'; x: number; y: number; item: ItemId; n: number }
  | { t: 'crafted'; building: BuildingId; item: ItemId }
  | { t: 'built'; building: BuildingId }
  | { t: 'tech'; tech: TechId }
  | { t: 'poured'; building: BuildingId; coins: number }
  | { t: 'voyage'; ship: string; coins: number }
  | { t: 'contract'; ship: string; coins: number }
  | { t: 'toast'; text: string };
