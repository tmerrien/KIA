// Typed read-only views of the content JSON, as the renderer needs them.
import buildingsJson from '../content/buildings.json';
import itemsJson from '../content/items.json';
import mapJson from '../content/map.json';
import nodesJson from '../content/nodes.json';
import techJson from '../content/tech.json';
import tuningJson from '../content/tuning.json';

export interface BDef {
  name: string; x: number; y: number; w: number; h: number; kind: string;
  startBuilt?: boolean; helper?: string;
  recipe?: { in: Record<string, number>; out: string; time: number };
  shipRecipe?: { in: Record<string, number>; time: number };
}
export interface IDef { name: string; price: number; tier: number; color: string }
export interface NDef { name: string; gives: string; max?: number; regrow?: number; work: number; crop?: boolean; grow?: number; yield?: number; infinite?: boolean }

export const BUILDINGS = buildingsJson as unknown as Record<string, BDef>;
export const ITEMS = itemsJson as unknown as Record<string, IDef>;
export const NODEDEFS = nodesJson as unknown as Record<string, NDef>;
export const MAP = mapJson as unknown as {
  width: number; height: number; rows: string[];
  crewSpawns: { x: number; y: number }[]; crewMarketSpot: { x: number; y: number };
};
export const TUNING = tuningJson as unknown as { workshopOutputCap: number; fleetVoyageSeconds: number; workshopInputCap: number };
const TECH = (techJson as unknown as { nodes: { id: string; cost: number; build?: string }[] }).nodes;

export function siteCost(buildingId: string): number {
  const n = TECH.find((t) => t.build === buildingId);
  return n ? Math.max(1, n.cost) : 1;
}

export function tileAt(x: number, y: number): string {
  if (y < 0 || y >= MAP.height || x < 0 || x >= MAP.width) return ' ';
  return MAP.rows[y][x] ?? ' ';
}

export const isLand = (c: string) => c === '#' || c === '.' || c === '=';
