// Typed views of the content JSON that the UI needs (names, colors, costs, recipes).
import itemsJson from '../content/items.json';
import buildingsJson from '../content/buildings.json';
import techJson from '../content/tech.json';
import nodesJson from '../content/nodes.json';
import tuningJson from '../content/tuning.json';
import mapJson from '../content/map.json';
import type { Bag, BuildingId, ItemId, NodeKind, Recipe, TechId } from '../sim/types';

export interface ItemDef { name: string; price: number; tier: number; color: string }
export interface BuildingDef {
  name: string; x: number; y: number; w: number; h: number;
  kind: 'stall' | 'board' | 'workshop' | 'warehouse' | 'hut' | 'drydock' | 'shipyard';
  startBuilt?: boolean; recipe?: Recipe; helper?: 'dockhand' | 'porter';
  shipRecipe?: { in: Bag; time: number };
}
export interface EraDef { n: number; name: string; tagline: string }
export interface TechDef {
  id: TechId; era: number; name: string; desc: string; cost: number;
  items?: Bag; req?: TechId[]; build?: BuildingId; effect?: Record<string, unknown>;
}
export interface NodeDef {
  name: string; gives: ItemId; max?: number; regrow?: number; work: number;
  crop?: boolean; grow?: number; yield?: number; plantWork?: number; infinite?: boolean;
}

export const ITEMS = itemsJson as Record<ItemId, ItemDef>;
export const BUILDINGS = buildingsJson as unknown as Record<BuildingId, BuildingDef>;
export const ERAS = techJson.eras as EraDef[];
export const TECH = techJson.nodes as unknown as TechDef[];
export const TECH_BY_ID: Record<TechId, TechDef> = Object.fromEntries(TECH.map(t => [t.id, t]));
export const NODES = nodesJson as unknown as Record<NodeKind, NodeDef>;
export const TUNING = tuningJson;
export const MAP = { width: mapJson.width, height: mapJson.height };

export function techForBuilding(b: BuildingId): TechDef | undefined {
  return TECH.find(t => t.build === b);
}
export function itemName(id: ItemId): string { return ITEMS[id]?.name ?? id; }
export function bagTotal(b: Bag): number { let n = 0; for (const k in b) n += b[k]; return n; }

const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI'];
export function roman(n: number): string { return ROMAN[n] ?? String(n); }
export function fmt(n: number): string { return Math.floor(n).toLocaleString('en-US'); }
export function esc(s: string): string {
  return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}
