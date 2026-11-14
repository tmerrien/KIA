// Bottom context panel: describes whatever is selected. Pure "state -> markup" so main can diff the
// string and only touch the DOM when something actually changed (keeps buttons tappable).
import * as sim from '../sim/api';
import type { Bag, GameState, Ref, BuildingId } from '../sim/types';
import { BUILDINGS, ITEMS, NODES, TECH, TUNING, bagTotal, esc, fmt, itemName, techForBuilding, type TechDef } from './content';
import { coinGlyph, glyph, icon } from './glyphs';

export type PanelMode = 'auto' | 'satchel';
export interface PanelView { html: string; bars: number[] }

class Out {
  html = ''; bars: number[] = [];
  add(s: string): this { this.html += s; return this; }
  bar(frac: number, cls = ''): this {
    this.html += `<div class="bar ${cls}" role="progressbar" aria-valuemin="0" aria-valuemax="100"><i data-bar="${this.bars.length}"></i></div>`;
    this.bars.push(Math.max(0, Math.min(1, frac || 0)));
    return this;
  }
}

const chip = (item: string, text: string, cls = '') =>
  `<span class="chip ${cls}" title="${esc(itemName(item))}">${glyph(item)}<span class="n">${text}</span><span class="sr">${esc(itemName(item))}</span></span>`;
const coinChip = (text: string, cls = '') => `<span class="chip coin ${cls}">${coinGlyph()}<span class="n">${text}</span></span>`;
function bagChips(b: Bag, empty = '<span class="muted">Empty</span>'): string {
  const ks = Object.keys(b).filter(k => b[k] > 0).sort((a, c) => (ITEMS[c]?.price ?? 0) - (ITEMS[a]?.price ?? 0));
  if (!ks.length) return empty;
  return ks.map(k => chip(k, `×${fmt(b[k])}`)).join('');
}
const head = (title: string, sub = '') =>
  `<div class="ph"><h2>${esc(title)}</h2>${sub ? `<span class="sub">${sub}</span>` : ''}</div>`;
const secs = (t: number) => {
  t = Math.max(0, Math.ceil(t));
  return t >= 60 ? `${Math.floor(t / 60)}m ${String(t % 60).padStart(2, '0')}s` : `${t}s`;
};
function have(s: GameState, item: string): number { return (s.satchel[item] ?? 0) + (s.warehouse[item] ?? 0); }

export function costLine(s: GameState, t: TechDef): string {
  let h = coinChip(fmt(t.cost), s.coins >= t.cost ? 'ok' : 'short');
  for (const k in t.items ?? {}) {
    const need = t.items![k];
    h += chip(k, `${Math.min(have(s, k), need)}/${need}`, have(s, k) >= need ? 'ok' : 'short');
  }
  return h;
}

/** The next thing worth doing, for the default panel and the board. */
export function nextGoal(s: GameState): TechDef | null {
  let best: TechDef | null = null;
  for (const t of TECH) {
    const st = sim.techStatus(s, t.id);
    if (st === 'site') return t;
    if (st === 'available' && (!best || t.cost < best.cost)) best = t;
  }
  return best;
}

function defaultView(s: GameState, o: Out): void {
  const sat = bagTotal(s.satchel);
  if (s.sold === 0 && s.earned === 0) {
    o.add(head('Day one on the docks', 'Halfmoon Wharf'));
    if (sat === 0) o.add(`<p class="hint">Tap the <b>old wreck</b> to salvage scrap, then tap the <b>market stall</b> to sell.</p>`);
    else o.add(`<p class="hint">Good haul. Now tap the <b>market stall</b> to put your ${sat} item${sat > 1 ? 's' : ''} on the shelf. Crews from the pier will buy them.</p>`);
    o.add(`<div class="row">${bagChips(s.satchel, '')}</div>`);
    return;
  }
  const g = nextGoal(s);
  if (!g) { o.add(head('Halfmoon Wharf')).add(`<p class="hint">Every plan on the board is done. Your fleet sails on.</p>`); return; }
  const st = sim.techStatus(s, g.id);
  if (st === 'site' && g.build) {
    const need = sim.siteNeeds(s, g.build);
    o.add(head(`Building: ${g.name}`, 'Construction site'));
    o.add(`<p class="hint">Hold the site to pour coins${need && bagTotal(need.items) ? ', and bring the materials it still needs' : ''}.</p>`);
    o.add(`<div class="row">${need ? coinChip(fmt(Math.ceil(need.coinsLeft)) + ' left') + bagChips(need.items, '') : ''}</div>`);
    o.add(`<div class="row"><button class="btn" data-act="goto:${g.build}">${icon('arrow')}Go to site</button><button class="btn ghost" data-act="tech">Tech tree</button></div>`);
    return;
  }
  o.add(head(`Next: ${g.name}`, `Era ${g.era}`));
  const afford = sim.canAfford(s, g.cost, g.items ?? {});
  const what = g.build
    ? (afford || s.coins >= g.cost * 0.3 ? 'Visit the job board to mark its site, then pour coins in.' : 'Sell goods at the stall to save up, then visit the job board.')
    : (afford ? 'You can afford it. Visit the job board.' : 'Sell goods at the stall to save up.');
  o.add(`<p class="hint">${esc(g.desc)} ${what}</p>`);
  o.add(`<div class="row">${costLine(s, g)}</div>`);
  o.add(`<div class="row"><button class="btn" data-act="goto:board">${icon('arrow')}Walk to job board</button><button class="btn ghost" data-act="tech">Tech tree</button></div>`);
}

function satchelView(s: GameState, o: Out): void {
  const n = bagTotal(s.satchel), cap = sim.carryCap(s);
  o.add(head('Satchel', `<span class="num">${n}/${cap}</span> carried`));
  o.bar(n / cap, 'thin');
  o.add(`<div class="row wrap">${bagChips(s.satchel, '<span class="muted">Nothing yet. Gather at veins, wrecks and moss beds.</span>')}</div>`);
  if (n) {
    let v = 0; for (const k in s.satchel) v += (ITEMS[k]?.price ?? 0) * s.satchel[k];
    o.add(`<p class="muted small">Worth about ${coinGlyph(14)} <span class="num">${fmt(v)}</span> at the stall.</p>`);
  }
}

function nodeView(s: GameState, i: number, o: Out): void {
  const n = s.nodes[i]; if (!n) return;
  const d = NODES[n.kind];
  o.add(head(d.name, `gives ${glyph(d.gives, 14)} ${esc(itemName(d.gives))}`));
  if (!n.active) { o.add(`<p class="hint">Dormant. Something on the tech tree will wake it.</p>`); return; }
  if (d.crop) {
    const c = n.crop ?? 'empty';
    if (c === 'empty') o.add(`<p class="hint">Bare bed. Tap to plant glowmoss; it ripens in ${secs(d.grow ?? 0)}.</p>`);
    else if (c === 'growing') { o.add(`<p class="hint">Growing: ripe in <span class="num">${secs((d.grow ?? 0) - n.timer)}</span></p>`); o.bar(n.timer / (d.grow || 1), 'moss'); }
    else o.add(`<p class="hint">Ripe! Tap to harvest ${d.yield ?? 1}.</p>`);
    return;
  }
  if (d.infinite) { o.add(`<p class="hint">Never runs dry. Tap to chip ice.</p>`); return; }
  const max = d.max ?? 1;
  o.add(`<div class="row"><span class="stat">Stock <b class="num">${n.amount}/${max}</b></span>${n.amount < max ? `<span class="stat">next in <b class="num">${secs((d.regrow ?? 0) - n.timer)}</b></span>` : '<span class="stat">full</span>'}</div>`);
  o.bar(n.amount / max);
  o.add(`<p class="muted small">Tap to gather. You keep working while it has stock and your satchel has room.</p>`);
}

function workshopFrac(progress: number, time: number): number {
  return progress / time; // sim stores seconds of work done on the current batch
}

function runBy(s: GameState): string {
  if (s.tech['rails']) return 'Cargo rails keep it supplied';
  if (s.helpers.some(h => h.kind === 'porter')) return 'Porters keep it supplied';
  return 'You run it: bring inputs, collect output';
}

function buildingView(s: GameState, id: BuildingId, o: Out): void {
  const b = BUILDINGS[id]; if (!b) return;
  if (!s.built[id] && !b.startBuilt) {
    const need = sim.siteNeeds(s, id);
    const t = techForBuilding(id);
    if (need && t) {
      o.add(head(`${b.name} site`, 'Under construction'));
      const poured = t.cost - Math.ceil(need.coinsLeft);
      o.add(`<div class="row"><span class="stat">${coinGlyph(14)} <b class="num">${fmt(poured)}</b> / ${fmt(t.cost)}</span></div>`);
      o.bar(t.cost ? poured / t.cost : 1, 'gold');
      const items = t.items ?? {};
      if (Object.keys(items).length) {
        o.add(`<div class="row wrap">${Object.keys(items).map(k => {
          const left = need.items[k] ?? 0, del = items[k] - left;
          return chip(k, `${del}/${items[k]}`, left === 0 ? 'ok' : 'short');
        }).join('')}</div>`);
      }
      o.add(`<p class="hint">${need.coinsLeft > 0 ? '<b>Hold the site to pour coins.</b> ' : ''}${bagTotal(need.items) ? 'Tap it to deliver materials from your satchel or warehouse.' : need.coinsLeft > 0 ? '' : 'Almost there!'}</p>`);
    } else {
      const tt = techForBuilding(id);
      o.add(head(b.name, 'Not built')).add(`<p class="hint">Mark this site from the tech tree${tt ? ` (${esc(tt.name)})` : ''}.</p>`);
    }
    return;
  }
  switch (b.kind) {
    case 'stall': {
      const cap = sim.shelfCap(s), n = bagTotal(s.shelf);
      o.add(head(s.tech['shopfront'] ? 'Shopfront' : b.name, `<span class="num">${n}/${cap}</span> on the shelf`));
      o.bar(n / cap, 'thin');
      o.add(`<div class="row wrap">${bagChips(s.shelf, '<span class="muted">Shelf is empty. Crews leave disappointed.</span>')}</div>`);
      o.add(`<p class="muted small">Tap the stall to stock it from your satchel, priciest goods first. Sold so far: <span class="num">${fmt(s.sold)}</span>.</p>`);
      return;
    }
    case 'board': {
      o.add(head(b.name, 'Plans and hires'));
      const g = nextGoal(s);
      o.add(`<p class="hint">${g ? `Next up: <b>${esc(g.name)}</b>. ` : ''}Mark building sites and buy upgrades here.</p>`);
      o.add(`<div class="row"><button class="btn" data-act="tech">${icon('tech')}Open tech tree</button></div>`);
      return;
    }
    case 'workshop': {
      const r = b.recipe!, ws = s.workshops[id];
      const speed = s.tech['guild'] ? 2 : 1;
      o.add(head(b.name, `${secs(r.time / speed)} per batch`));
      o.add(`<div class="row recipe">${Object.keys(r.in).map(k => chip(k, `×${r.in[k]}`)).join('<span class="plus">+</span>')}<span class="to">${icon('arrow')}</span>${chip(r.out, '×1')}</div>`);
      if (ws) {
        o.add(`<div class="row wrap"><span class="stat">Loaded</span>${Object.keys(r.in).map(k => chip(k, `${ws.input[k] ?? 0}/${TUNING.workshopInputCap}`, (ws.input[k] ?? 0) >= r.in[k] ? 'ok' : 'short')).join('')}<span class="stat">Ready <b class="num">${ws.output}</b></span></div>`);
        o.bar(ws.busy ? workshopFrac(ws.progress, r.time) : 0, ws.busy ? '' : 'idle');
        o.add(`<p class="muted small">${ws.busy ? 'Working.' : ws.output >= TUNING.workshopOutputCap ? 'Output full. Collect it.' : 'Idle: needs inputs.'} ${runBy(s)}.</p>`);
      }
      return;
    }
    case 'warehouse': {
      const adj = sim.isAdjacent(s, { k: 'bld', id });
      const room = sim.carryCap(s) - bagTotal(s.satchel);
      o.add(head(b.name, `<span class="num">${fmt(bagTotal(s.warehouse))}</span> stored`));
      const ks = Object.keys(s.warehouse).filter(k => s.warehouse[k] > 0).sort((a, c) => (ITEMS[c]?.price ?? 0) - (ITEMS[a]?.price ?? 0));
      if (!ks.length) o.add(`<p class="muted">Empty. Tap it to deposit your satchel.</p>`);
      else o.add(`<div class="list">${ks.map(k => `<div class="li">${chip(k, `×${fmt(s.warehouse[k])}`)}<span class="nm">${esc(itemName(k))}</span><button class="btn sm" data-act="take:${k}" ${adj && room > 0 ? '' : 'disabled'} aria-label="Take ${esc(itemName(k))}">Take ${Math.min(room, s.warehouse[k]) || ''}</button></div>`).join('')}</div>`);
      if (!adj) o.add(`<p class="muted small">Stand next to the warehouse to take goods.</p>`);
      else if (room <= 0) o.add(`<p class="muted small">Your satchel is full.</p>`);
      return;
    }
    case 'drydock': {
      o.add(head(b.name, 'Repair contracts'));
      if (!s.contracts.length) { o.add(`<p class="muted">No ships waiting.</p>`); return; }
      o.add(`<div class="list">${s.contracts.map(c => {
        const ok = sim.canAfford(s, 0, c.items);
        return `<div class="li"><span class="nm"><b>${esc(c.ship)}</b><span class="row tight">${Object.keys(c.items).map(k => chip(k, `${Math.min(have(s, k), c.items[k])}/${c.items[k]}`, have(s, k) >= c.items[k] ? 'ok' : 'short')).join('')}</span></span>${coinChip(fmt(c.reward))}<button class="btn sm" data-act="ship:${c.id}" ${ok ? '' : 'disabled'} aria-label="Ship parts to ${esc(c.ship)}">Ship</button></div>`;
      }).join('')}</div>`);
      return;
    }
    case 'shipyard': {
      const sr = b.shipRecipe!;
      o.add(head(b.name, `${s.fleet.length} ship${s.fleet.length === 1 ? '' : 's'} in the fleet`));
      if (s.shipyard) {
        o.add(`<div class="row wrap"><span class="stat">Next hull</span>${Object.keys(sr.in).map(k => chip(k, `${s.shipyard!.input[k] ?? 0}/${sr.in[k]}`, (s.shipyard!.input[k] ?? 0) >= sr.in[k] ? 'ok' : 'short')).join('')}</div>`);
        o.bar(s.shipyard.busy ? s.shipyard.progress / sr.time : 0);
      }
      if (s.fleet.length) {
        o.add('<div class="list">');
        for (const sh of s.fleet) {
          o.add(`<div class="li"><span class="nm">${esc(sh.name)}</span><span class="grow">`).bar(sh.voyage / TUNING.fleetVoyageSeconds, 'thin').add(`</span><span class="muted small num">${secs(TUNING.fleetVoyageSeconds - sh.voyage)}</span></div>`);
        }
        o.add('</div>');
      } else o.add(`<p class="muted small">Ships are built from warehouse stock and then trade on their own.</p>`);
      return;
    }
    case 'hut': {
      const kind = b.helper!;
      const hs = s.helpers.filter(h => h.kind === kind);
      o.add(head(b.name, `${hs.length} ${kind}${hs.length === 1 ? '' : 's'}`));
      o.add(`<div class="list">${hs.map((h, i) => `<div class="li"><span class="nm">${kind === 'dockhand' ? 'Dockhand' : 'Porter'} ${i + 1}</span><span class="task">${esc(h.task)}</span>${bagChips(h.carry, '')}</div>`).join('') || '<p class="muted">Nobody here yet.</p>'}</div>`);
      return;
    }
  }
}

export function panelView(s: GameState, sel: Ref | null, mode: PanelMode): PanelView {
  const o = new Out();
  if (mode === 'satchel') satchelView(s, o);
  else if (!sel || sel.k === 'tile') defaultView(s, o);
  else if (sel.k === 'node') nodeView(s, sel.i, o);
  else buildingView(s, sel.id, o);
  return { html: o.html, bars: o.bars };
}

