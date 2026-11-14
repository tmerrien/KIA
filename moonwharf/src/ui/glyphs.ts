// Small inline SVG glyphs for items and UI chrome. Each item has its own silhouette tinted with its
// items.json color, outlined in dark umber so it reads on both brass and indigo backgrounds.
import { ITEMS } from './content';
import type { ItemId } from '../sim/types';

const O = 'stroke="#2a1a10" stroke-width="1.1" stroke-linejoin="round" stroke-linecap="round"';
const HI = 'fill="#fff" fill-opacity=".45"';

const SHAPES: Record<string, (c: string) => string> = {
  ore: c => `<path d="M3 13 6 6l6-2 5 4 1 6-5 3H6z" fill="${c}" ${O}/><path d="M6 6l3 5 3-7M9 11l4 6M9 11l-6 2" fill="none" stroke="#2a1a10" stroke-opacity=".45" stroke-width=".8"/><path d="M7 7l2 3 2-5z" ${HI}/>`,
  moss: c => `<path d="M10 18c0-4 0-7-1-10" fill="none" ${O}/><ellipse cx="6.5" cy="9" rx="3.5" ry="2.6" fill="${c}" ${O}/><ellipse cx="13" cy="7" rx="3.6" ry="2.8" fill="${c}" ${O}/><ellipse cx="10" cy="13" rx="3.4" ry="2.4" fill="${c}" ${O}/><circle cx="12.2" cy="6.2" r="1" ${HI}/>`,
  ice: c => `<path d="M10 2l6 4v8l-6 4-6-4V6z" fill="${c}" ${O}/><path d="M10 2v16M4 6l12 8M16 6 4 14" stroke="#fff" stroke-opacity=".55" stroke-width=".8"/>`,
  crystal: c => `<path d="M9 18 5 10l4-8 4 8z" fill="${c}" ${O}/><path d="M13 18l-2-5 3-5 3 5z" fill="${c}" ${O}/><path d="M9 3v14" stroke="#fff" stroke-opacity=".5" stroke-width=".8"/><path d="M7 9l2-5 1.5 4z" ${HI}/>`,
  scrap: c => `<path d="M3 7l9-3 5 3-2 9-8 1-3-4 3-2z" fill="${c}" ${O}/><circle cx="7" cy="9" r=".9" fill="#2a1a10"/><circle cx="12" cy="8" r=".9" fill="#2a1a10"/><circle cx="12" cy="13" r=".9" fill="#2a1a10"/><path d="M12 4l5 3" stroke="#fff" stroke-opacity=".5"/>`,
  ingot: c => `<path d="M2 14l3-6h10l3 6z" fill="${c}" ${O}/><path d="M5 8l1.5 6M15 8l-1.5 6" stroke="#2a1a10" stroke-opacity=".35" stroke-width=".8"/><path d="M6 9h8l.8 1.6H5.2z" ${HI}/>`,
  sailcloth: c => `<rect x="3" y="5" width="14" height="10" rx="2" fill="${c}" ${O}/><path d="M3 9h14M3 12h14" stroke="#b9a77c" stroke-width=".8"/><circle cx="17" cy="10" r="2.6" fill="${c}" ${O}/><circle cx="17" cy="10" r="1" fill="#b9a77c"/>`,
  ration: c => `<path d="M4 6h12v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" fill="${c}" ${O}/><ellipse cx="10" cy="6" rx="6" ry="2" fill="#f7d79a" ${O}/><path d="M4 10h12" stroke="#8a5a2b" stroke-width="1.2"/>`,
  fuelcell: c => `<rect x="5" y="3" width="10" height="15" rx="2.5" fill="${c}" ${O}/><rect x="8" y="1.5" width="4" height="2" fill="#7f8ea8" ${O}/><path d="M11 6l-3 5h3l-2 4" fill="none" stroke="#fff6c8" stroke-width="1.4" stroke-linejoin="round"/>`,
  tools: c => `<path d="M13.5 2.5a4 4 0 0 0-4 5L3 14a1.8 1.8 0 0 0 3 3l6.5-6.5a4 4 0 0 0 5-4l-2.5 1.5-2-1-.5-2.5z" fill="${c}" ${O}/><circle cx="4.6" cy="15.4" r=".9" fill="#2a1a10"/>`,
  rigging: c => `<circle cx="10" cy="10" r="7" fill="${c}" ${O}/><circle cx="10" cy="10" r="4.5" fill="none" stroke="#8a6d3b" stroke-width="1"/><circle cx="10" cy="10" r="2" fill="#2a1a10" fill-opacity=".7"/><path d="M15 15l3 3" ${O} fill="none"/>`,
  engine: c => `<path d="M10 1.8l1.6 2.4 2.8-.7.5 2.8 2.7 1-1.2 2.7 1.2 2.7-2.7 1-.5 2.8-2.8-.7L10 18.2l-1.6-2.4-2.8.7-.5-2.8-2.7-1L3.6 10 2.4 7.3l2.7-1 .5-2.8 2.8.7z" fill="${c}" ${O}/><circle cx="10" cy="10" r="3" fill="#2a1a10" fill-opacity=".75"/><circle cx="9" cy="9" r="1" ${HI}/>`,
  solarsail: c => `<path d="M5 2v16" ${O}/><path d="M5.5 3l11 12H5.5z" fill="${c}" ${O}/><path d="M7 7l6 6.5M7 10.5l3.4 3.7" stroke="#c99a2a" stroke-width=".8"/><circle cx="15" cy="4.5" r="2" fill="#fff3b0" ${O}/>`,
};

export function glyph(item: ItemId, size = 18): string {
  const c = ITEMS[item]?.color ?? '#ccc';
  const body = (SHAPES[item] ?? (cc => `<circle cx="10" cy="10" r="6" fill="${cc}" ${O}/>`))(c);
  return `<svg class="g" width="${size}" height="${size}" viewBox="0 0 20 20" aria-hidden="true" focusable="false">${body}</svg>`;
}

export function coinGlyph(size = 18): string {
  return `<svg class="g" width="${size}" height="${size}" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><circle cx="10" cy="10" r="8" fill="#f2c14e" stroke="#7a4f12" stroke-width="1.3"/><circle cx="10" cy="10" r="5.2" fill="none" stroke="#b9831f" stroke-width="1"/><path d="M12.4 7.2A3.2 3.2 0 1 0 12.4 12.8 2.6 2.6 0 1 1 12.4 7.2z" fill="#b9831f"/><path d="M5.5 7a5.5 5.5 0 0 1 3-3" stroke="#fff6d0" stroke-width="1.2" fill="none" stroke-linecap="round"/></svg>`;
}

const ICONS: Record<string, string> = {
  satchel: `<path d="M4 8h12l-1 9H5z" fill="#a8703a" stroke="#2a1a10" stroke-width="1.1" stroke-linejoin="round"/><path d="M7 8V6a3 3 0 0 1 6 0v2" fill="none" stroke="#2a1a10" stroke-width="1.3"/><path d="M4 8h12v3H4z" fill="#c98d4f" stroke="#2a1a10" stroke-width="1.1"/><rect x="9" y="10" width="2" height="2.4" fill="#f2c14e"/>`,
  tech: `<path d="M4 3h12v14H4z" fill="#e9d6a9" stroke="#2a1a10" stroke-width="1.1"/><path d="M7 7h6M7 10h6M7 13h4" stroke="#7a5230" stroke-width="1.2"/><circle cx="15" cy="15" r="3" fill="#f2c14e" stroke="#2a1a10"/>`,
  soundOn: `<path d="M3 8h3l4-3v10l-4-3H3z" fill="#e9d6a9" stroke="#2a1a10" stroke-linejoin="round"/><path d="M13 7a4 4 0 0 1 0 6M15 5a7 7 0 0 1 0 10" fill="none" stroke="#e9d6a9" stroke-width="1.5" stroke-linecap="round"/>`,
  soundOff: `<path d="M3 8h3l4-3v10l-4-3H3z" fill="#e9d6a9" stroke="#2a1a10" stroke-linejoin="round"/><path d="M13 7l5 6M18 7l-5 6" stroke="#e9a06a" stroke-width="1.6" stroke-linecap="round"/>`,
  close: `<path d="M5 5l10 10M15 5 5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  lock: `<rect x="5" y="9" width="10" height="8" rx="1.5" fill="#6f6a86"/><path d="M7 9V7a3 3 0 0 1 6 0v2" fill="none" stroke="#6f6a86" stroke-width="1.8"/>`,
  check: `<path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`,
  arrow: `<path d="M3 10h12M11 6l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,
};
export function icon(name: keyof typeof ICONS | string, size = 18): string {
  return `<svg class="g" width="${size}" height="${size}" viewBox="0 0 20 20" aria-hidden="true" focusable="false">${ICONS[name] ?? ''}</svg>`;
}
