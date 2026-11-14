// Save/load. The state is plain JSON by design.
import { MAP } from './content';
import type { GameState } from './types';

export function serialize(s: GameState): string {
  return JSON.stringify(s);
}

function isObj(v: unknown): v is Record<string, unknown> { return typeof v === 'object' && v !== null && !Array.isArray(v); }

/** Returns null for anything that is not a valid version-1 save. */
export function deserialize(json: string): GameState | null {
  let v: unknown;
  try { v = JSON.parse(json); } catch { return null; }
  if (!isObj(v) || v.version !== 1) return null;
  const numbers = ['time', 'rngSeed', 'coins', 'earned', 'sold', 'nextId', 'crewTimer'];
  if (numbers.some((k) => typeof v[k] !== 'number' || !Number.isFinite(v[k] as number))) return null;
  const objects = ['satchel', 'shelf', 'warehouse', 'tech', 'built', 'sites', 'workshops', 'player'];
  if (objects.some((k) => !isObj(v[k]))) return null;
  const arrays = ['nodes', 'helpers', 'crews', 'contracts', 'fleet'];
  if (arrays.some((k) => !Array.isArray(v[k]))) return null;
  if ((v.nodes as unknown[]).length !== MAP.nodes.length) return null;
  const p = v.player as Record<string, unknown>;
  if (typeof p.x !== 'number' || typeof p.y !== 'number' || !Array.isArray(p.path)) return null;
  if (v.shipyard !== null && !isObj(v.shipyard)) return null;
  return v as unknown as GameState;
}
