// Full-screen tech tree sheet, grouped by era. Markup only; main wires the buttons via data-act.
import * as sim from '../sim/api';
import type { GameState } from '../sim/types';
import { ERAS, TECH, TECH_BY_ID, esc, fmt, roman } from './content';
import { coinGlyph, glyph, icon } from './glyphs';

function have(s: GameState, item: string): number { return (s.satchel[item] ?? 0) + (s.warehouse[item] ?? 0); }

export function anyAffordable(s: GameState): boolean {
  return TECH.some(t => sim.techStatus(s, t.id) === 'available' && sim.canAfford(s, t.cost, t.items ?? {}));
}

export function techView(s: GameState): string {
  const cur = sim.era(s);
  let h = '';
  for (const e of ERAS) {
    const nodes = TECH.filter(t => t.era === e.n);
    const owned = nodes.filter(t => sim.techStatus(s, t.id) === 'owned').length;
    h += `<section class="era ${e.n === cur ? 'cur' : ''} ${e.n > cur + 1 ? 'far' : ''}" aria-labelledby="era${e.n}">`;
    h += `<header><h3 id="era${e.n}"><span class="rn">Era ${roman(e.n)}</span> ${esc(e.name)}</h3><p>${esc(e.tagline)} <span class="num">· ${owned}/${nodes.length}</span></p></header><div class="cards">`;
    for (const t of nodes) {
      const st = sim.techStatus(s, t.id);
      const afford = sim.canAfford(s, t.cost, t.items ?? {});
      const missing = (t.req ?? []).filter(r => sim.techStatus(s, r) !== 'owned').map(r => TECH_BY_ID[r]?.name ?? r);
      let cost = `<span class="chip coin ${st === 'owned' || s.coins >= t.cost ? 'ok' : 'short'}">${coinGlyph()}<span class="n">${fmt(t.cost)}</span></span>`;
      for (const k in t.items ?? {}) {
        const n = t.items![k];
        cost += `<span class="chip ${st === 'owned' || have(s, k) >= n ? 'ok' : 'short'}">${glyph(k)}<span class="n">${st === 'owned' ? n : `${Math.min(have(s, k), n)}/${n}`}</span></span>`;
      }
      let status = '', btn = '';
      if (st === 'owned') status = `<span class="st owned">${icon('check', 14)}Owned</span>`;
      else if (st === 'site') {
        status = `<span class="st site">Site marked</span>`;
        btn = `<button class="btn" data-act="goto:${t.build}">${icon('arrow')}Go to site</button>`;
      } else if (st === 'available') {
        status = `<span class="st avail">${t.build ? 'Ready to mark' : afford ? 'Affordable' : 'Available'}</span>`;
        btn = t.build
          ? `<button class="btn" data-act="mark:${t.id}" aria-label="Mark site for ${esc(t.name)}">Mark site</button>`
          : `<button class="btn" data-act="buy:${t.id}" ${afford ? '' : 'disabled'} aria-label="Buy ${esc(t.name)}">Buy</button>`;
      } else status = `<span class="st locked">${icon('lock', 14)}${missing.length ? `Needs ${esc(missing.join(', '))}` : 'Locked'}</span>`;
      h += `<article class="card ${st}${st === 'available' && afford ? ' afford' : ''}"><div class="ct"><h4>${esc(t.name)}</h4>${status}</div><p>${esc(t.desc)}${t.build ? ' <i>Build on site: costs are poured and delivered there.</i>' : ''}</p><div class="cost">${cost}</div>${btn ? `<div class="act">${btn}</div>` : ''}</article>`;
    }
    h += `</div></section>`;
  }
  return h;
}
