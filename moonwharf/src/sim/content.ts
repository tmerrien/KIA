// Typed access to content/*.json. Everything the sim knows about items, buildings, tech and the map comes from here.
import itemsJson from '../content/items.json';
import buildingsJson from '../content/buildings.json';
import techJson from '../content/tech.json';
import nodesJson from '../content/nodes.json';
import mapJson from '../content/map.json';
import tuningJson from '../content/tuning.json';
import type { Bag, BuildingId, ItemId, NodeKind, Recipe, TechId } from './types';

export interface ItemDef { name: string; price: number; tier: number; color: string }
export interface BuildingDef {
  name: string; x: number; y: number; w: number; h: number;
  kind: 'stall' | 'board' | 'workshop' | 'warehouse' | 'hut' | 'drydock' | 'shipyard';
  startBuilt?: boolean; recipe?: Recipe; helper?: 'dockhand' | 'porter';
  shipRecipe?: { in: Bag; time: number };
}
export interface TechEffect {
  carry?: number; shelf?: number; speed?: number; customerRate?: number; workSpeed?: number;
  fleetIncome?: number; extraCrews?: number; automation?: boolean; activateNodes?: NodeKind;
}
export interface TechDef {
  id: TechId; era: number; name: string; desc: string; cost: number;
  items?: Bag; req?: TechId[]; build?: BuildingId; effect?: TechEffect;
}
export interface NodeDef {
  name: string; gives: ItemId; work: number;
  max?: number; regrow?: number; infinite?: boolean;
  crop?: boolean; grow?: number; yield?: number; plantWork?: number;
}
export interface MapDef {
  width: number; height: number; rows: string[];
  playerStart: { x: number; y: number };
  crewSpawns: { x: number; y: number }[];
  crewMarketSpot: { x: number; y: number };
  nodes: { kind: NodeKind; x: number; y: number; active: boolean }[];
}
export interface Tuning {
  startCoins: number; carry: number; shelf: number; walkSpeed: number; helperSpeed: number;
  customerInterval: number; customerBuysMax: number; workshopInputCap: number; workshopOutputCap: number;
  contractMultiplier: number; fleetVoyageSeconds: number; fleetVoyageIncome: number;
  pour: { minRate: number; baseFraction: number; accelPerSecond: number };
  offlineCapSeconds: number;
}

export const ITEMS = itemsJson as Record<ItemId, ItemDef>;
export const BUILDINGS = buildingsJson as unknown as Record<BuildingId, BuildingDef>;
export const TECHS = (techJson as unknown as { nodes: TechDef[] }).nodes;
export const ERAS = (techJson as { eras: { n: number; name: string; tagline: string }[] }).eras;
export const NODES = nodesJson as Record<NodeKind, NodeDef>;
export const MAP = mapJson as unknown as MapDef;
export const TUNING = tuningJson as Tuning;

/** Helper carry capacity (dockhands and porters). */
export const HELPER_CARRY = 10;
/** Max crews on the map at once. */
export const MAX_CREWS = 14;
/** Seconds a crew waits at the market spot before buying. */
export const CREW_WAIT = 0.8;
/** Dockhands stop gathering an item once the warehouse holds this many. */
export const DOCKHAND_STOCK_TARGET = 40;
/** Automation/shelf restock keeps at least this many of any item a workshop consumes. */
export const WORKSHOP_RESERVE = 20;
/** Automation runs every this many seconds. */
export const AUTOMATION_PERIOD = 0.5;
export const MAX_CONTRACTS = 3;
export const SHIP_NAMES = [
  'Wayward Gull', 'Brass Comet', 'Lantern Moth', 'Quiet Tern', 'Silver Kettle', 'Dusk Heron',
  'Copper Wren', 'Pale Orchard', 'Saltglass', 'Hollow Bell', 'Ember Skiff', 'Tidewhistle',
];

export const TECH_BY_ID: Record<TechId, TechDef> = Object.fromEntries(TECHS.map((t) => [t.id, t]));
/** building id -> tech that builds it */
export const TECH_FOR_BUILDING: Record<BuildingId, TechDef> = Object.fromEntries(
  TECHS.filter((t) => t.build).map((t) => [t.build as string, t]),
);
/** product item -> workshop building id that makes it */
export const WORKSHOP_FOR_ITEM: Record<ItemId, BuildingId> = Object.fromEntries(
  Object.entries(BUILDINGS).filter(([, b]) => b.recipe).map(([id, b]) => [b.recipe!.out, id]),
);
/** raw item -> node kind that gives it */
export const NODE_FOR_ITEM: Record<ItemId, NodeKind> = Object.fromEntries(
  (Object.entries(NODES) as [NodeKind, NodeDef][]).map(([k, n]) => [n.gives, k]),
);

export function price(item: ItemId): number { return ITEMS[item]?.price ?? 0; }
export function itemName(item: ItemId): string { return ITEMS[item]?.name ?? item; }
