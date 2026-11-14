// Moonwharf entry: owns the canvas, the game loop, input, persistence and all DOM UI.
// The sim is driven only through ../sim/api; drawing only through ../render/api.
import './ui/style.css';
import * as sim from './sim/api';
import { createRenderer, type Camera } from './render/api';
import type { GameEvent, GameState, Ref } from './sim/types';
import { BUILDINGS, ERAS, MAP, TECH_BY_ID, TUNING, bagTotal, esc, fmt, itemName, roman } from './ui/content';
import { coinGlyph, icon } from './ui/glyphs';
import { panelView, type PanelMode } from './ui/panel';
import { anyAffordable, techView } from './ui/techtree';
import { isMuted, setMuted, sfx, unlockAudio } from './ui/audio';

// ---------------------------------------------------------------- persistence
const SAVE_KEY = 'moonwharf1', AT_KEY = 'moonwharf1.at', MUTE_KEY = 'moonwharf1.mute';
function lsGet(k: string): string | null { try { return localStorage.getItem(k); } catch { return null; } }
function lsSet(k: string, v: string): void { try { localStorage.setItem(k, v); } catch { /* private mode / quota */ } }

let s: GameState;
let resumed = false;
{
  let loaded: GameState | null = null;
  const raw = lsGet(SAVE_KEY);
  if (raw) { try { loaded = sim.deserialize(raw); } catch { loaded = null; } }
  resumed = !!loaded;
  s = loaded ?? sim.newGame();
}
function save(): void {
  try { lsSet(SAVE_KEY, sim.serialize(s)); lsSet(AT_KEY, String(Date.now())); } catch { /* ignore */ }
}
setMuted(lsGet(MUTE_KEY) === '1');

// ---------------------------------------------------------------- DOM
const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const canvas = $<HTMLCanvasElement>('game');
const stage = $('stage');
const hud = $('hud');
const coinsEl = $('coins'), coinN = $('coin-n'), eraEl = $('era');
const btnSatchel = $<HTMLButtonElement>('btn-satchel'), satchelN = $('satchel-n');
const btnTech = $<HTMLButtonElement>('btn-tech'), btnSound = $<HTMLButtonElement>('btn-sound');
const toastsEl = $('toasts');
const panelEl = $('panel'), panelInner = $('panel-inner');
const techEl = $('tech'), techBody = $('tech-body'), techSub = $('tech-sub'), techClose = $<HTMLButtonElement>('tech-close');

$('coin-icon').innerHTML = coinGlyph(24);
btnSatchel.querySelector('.ic')!.innerHTML = icon('satchel', 20);
btnTech.querySelector('.ic')!.innerHTML = icon('tech', 20);
techClose.innerHTML = icon('close', 20);
function paintSound(): void {
  btnSound.querySelector('.ic')!.innerHTML = icon(isMuted() ? 'soundOff' : 'soundOn', 20);
  btnSound.setAttribute('aria-pressed', String(isMuted()));
  btnSound.setAttribute('aria-label', isMuted() ? 'Unmute sound' : 'Mute sound');
}
paintSound();

// ---------------------------------------------------------------- renderer + camera
const renderer = createRenderer(canvas);
let cssW = 1, cssH = 1;
const cam: Camera = { x: 0, y: 0, zoom: 32 };
let coinScreen = { x: 0, y: 0 };
let hudH = 0;

function resize(): void {
  const r = stage.getBoundingClientRect();
  cssW = Math.max(1, Math.round(r.width)); cssH = Math.max(1, Math.round(r.height));
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  renderer.resize(cssW, cssH, dpr);
  cam.zoom = Math.min(cssW / 11, 72);
  const ci = $('coin-icon').getBoundingClientRect(), cr = canvas.getBoundingClientRect();
  coinScreen = { x: ci.left + ci.width / 2 - cr.left, y: ci.top + ci.height / 2 - cr.top };
  hudH = hud.getBoundingClientRect().height;
  snapCamera();
}

// Camera: follows the player; a drag frees it, and it eases back after ~3s idle or on the next tap.
let camFree = false, lastPan = 0;
function camTarget(): { x: number; y: number } {
  const vw = cssW / cam.zoom, vh = cssH / cam.zoom;
  const top = (hudH * 0.6) / cam.zoom; // keep the player a little below the HUD
  return clampCam(s.player.x + 0.5 - vw / 2, s.player.y + 0.5 - (vh + top) / 2 + top);
}
function clampCam(x: number, y: number): { x: number; y: number } {
  const vw = cssW / cam.zoom, vh = cssH / cam.zoom;
  const minY = -(hudH * 0.5) / cam.zoom;
  x = vw >= MAP.width ? (MAP.width - vw) / 2 : Math.max(0, Math.min(MAP.width - vw, x));
  y = vh >= MAP.height - minY ? (MAP.height - vh) / 2 : Math.max(minY, Math.min(MAP.height - vh, y));
  return { x, y };
}
function snapCamera(): void { const t = camTarget(); cam.x = t.x; cam.y = t.y; }
function updateCamera(dt: number, now: number): void {
  if (camFree && !ptr && now - lastPan > 3000) camFree = false;
  if (camFree) return;
  const t = camTarget();
  const k = 1 - Math.exp(-dt * 6);
  cam.x += (t.x - cam.x) * k; cam.y += (t.y - cam.y) * k;
}

// ---------------------------------------------------------------- selection, commands
let selected: Ref | null = null;
let mode: PanelMode = 'auto';
let pending: GameEvent[] = [];
const BOARD: Ref = { k: 'bld', id: 'board' };
let boardPending = false;

function cmd(evs: GameEvent[]): void { if (evs && evs.length) pending.push(...evs); refreshSoon(); }

function tapRef(ref: Ref): void {
  selected = ref; mode = 'auto'; camFree = false;
  cmd(sim.orderPlayer(s, ref));
  if (ref.k === 'bld' && ref.id === 'board') {
    if (!s.player.target && sim.isAdjacent(s, BOARD)) openTech();
    else boardPending = true;
  } else boardPending = false;
}

function watchBoard(): void {
  if (!boardPending) return;
  const t = s.player.target;
  if (t && t.k === 'bld' && t.id === 'board') return;
  boardPending = false;
  if (!t && sim.isAdjacent(s, BOARD)) openTech();
}

// ---------------------------------------------------------------- input (canvas)
interface Ptr { id: number; x0: number; y0: number; t0: number; camX: number; camY: number; ref: Ref; site: string | null; drag: boolean; poured: boolean }
let ptr: Ptr | null = null;
let pouring: string | null = null;
let pourStep = 0, lastPourSfx = 0;
const HOLD_MS = 180, DRAG_PX = 10;

function localXY(e: PointerEvent): { x: number; y: number } {
  const r = canvas.getBoundingClientRect();
  return { x: e.clientX - r.left, y: e.clientY - r.top };
}
canvas.addEventListener('pointerdown', e => {
  unlockAudio();
  if (ptr || (e.pointerType === 'mouse' && e.button !== 0)) return;
  e.preventDefault();
  try { canvas.setPointerCapture(e.pointerId); } catch { /* ignore */ }
  const p = localXY(e);
  const tile = renderer.screenToTile(cam, p.x, p.y);
  const ref = sim.refAt(s, tile.x, tile.y);
  const site = ref.k === 'bld' && sim.siteNeeds(s, ref.id) ? ref.id : null;
  ptr = { id: e.pointerId, x0: p.x, y0: p.y, t0: performance.now(), camX: cam.x, camY: cam.y, ref, site, drag: false, poured: false };
});
canvas.addEventListener('pointermove', e => {
  if (!ptr || e.pointerId !== ptr.id) return;
  const p = localXY(e);
  const dx = p.x - ptr.x0, dy = p.y - ptr.y0;
  if (!ptr.drag && Math.hypot(dx, dy) > DRAG_PX) { ptr.drag = true; stopPour(); }
  if (ptr.drag) {
    const c = clampCam(ptr.camX - dx / cam.zoom, ptr.camY - dy / cam.zoom);
    cam.x = c.x; cam.y = c.y; camFree = true; lastPan = performance.now();
  }
});
function endPtr(e: PointerEvent, cancelled: boolean): void {
  if (!ptr || e.pointerId !== ptr.id) return;
  const p = ptr; ptr = null;
  stopPour();
  if (cancelled || p.drag) return;
  if (p.poured) { selected = p.ref; mode = 'auto'; refreshSoon(); return; }
  tapRef(p.ref);
}
canvas.addEventListener('pointerup', e => endPtr(e, false));
canvas.addEventListener('pointercancel', e => endPtr(e, true));
canvas.addEventListener('lostpointercapture', e => { if (ptr && e.pointerId === ptr.id) endPtr(e, true); });
canvas.addEventListener('contextmenu', e => e.preventDefault());

function stopPour(): void { pouring = null; pourStep = 0; }
function updatePour(dt: number, now: number): void {
  if (!ptr || !ptr.site || ptr.drag) return;
  const held = now - ptr.t0;
  if (held < HOLD_MS) return;
  if (!sim.siteNeeds(s, ptr.site)) { stopPour(); ptr.site = null; return; }
  if (!ptr.poured) {
    ptr.poured = true; selected = ptr.ref; mode = 'auto'; refreshSoon();
    if (s.coins < 1) toast('No coins to pour. Sell some goods at the stall first.');
  }
  pouring = ptr.site;
  cmd(sim.pour(s, ptr.site, (held - HOLD_MS) / 1000, dt));
}

// No page scroll / pinch / iOS callouts outside the scrollable panes.
document.addEventListener('touchmove', e => {
  const t = e.target as HTMLElement;
  if (!t.closest('#panel-inner, .sheet-b')) e.preventDefault();
}, { passive: false });
for (const ev of ['gesturestart', 'gesturechange', 'dblclick']) document.addEventListener(ev, e => e.preventDefault(), { passive: false } as AddEventListenerOptions);
document.addEventListener('pointerdown', () => unlockAudio(), { capture: true });
document.addEventListener('keydown', () => unlockAudio(), { capture: true, once: true });

// ---------------------------------------------------------------- toasts
const recentToasts = new Map<string, number>();
function toast(html: string, opts: { big?: boolean; title?: string; ms?: number } = {}): void {
  const key = (opts.title ?? '') + html, now = performance.now();
  if ((recentToasts.get(key) ?? -1e9) > now - 1200) return;
  recentToasts.set(key, now);
  const el = document.createElement('div');
  el.className = 'toast' + (opts.big ? ' big' : '');
  el.innerHTML = (opts.title ? `<span class="tt">${esc(opts.title)}</span>` : '') + html;
  toastsEl.appendChild(el);
  while (toastsEl.children.length > 3) toastsEl.firstElementChild!.remove();
  const ms = opts.ms ?? (opts.big ? 4200 : 2600);
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 320); }, ms);
}

function fmtDur(sec: number): string {
  sec = Math.floor(sec);
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60);
  return h ? `${h}h ${m}m` : m ? `${m}m` : `${sec}s`;
}

function awayFor(seconds: number): void {
  if (!(seconds > 3)) return;
  const capped = Math.min(seconds, TUNING.offlineCapSeconds);
  const before = s.coins;
  let evs: GameEvent[] = [];
  try { evs = sim.catchUp(s, capped); } catch (err) { console.error('catchUp failed', err); }
  const gained = s.coins - before;
  let sold = 0, voyages = 0;
  for (const e of evs) { if (e.t === 'sale') sold++; else if (e.t === 'voyage') voyages++; }
  if (seconds < 20 && gained <= 0) return;
  const bits: string[] = [];
  if (sold) bits.push(`sold ${fmt(sold)} good${sold === 1 ? '' : 's'}`);
  if (voyages) bits.push(`${fmt(voyages)} voyage${voyages === 1 ? '' : 's'} returned`);
  const body = gained > 0
    ? `${coinGlyph(16)} <b class="num">+${fmt(gained)}</b> coins${bits.length ? ` · ${bits.join(', ')}` : ''}`
    : 'Nothing sold. Stock the shelf before you leave.';
  toast(body, { big: true, title: `While you were away (${fmtDur(seconds)})`, ms: 5200 });
  // Don't replay hundreds of offline sale pops; just a tally sound.
  if (gained > 0) sfx.coinsBig();
  refreshSoon();
}

// ---------------------------------------------------------------- events -> feedback
function handleEvents(evs: GameEvent[]): void {
  let sale = false;
  for (const e of evs) {
    switch (e.t) {
      case 'sale': sale = true; sfx.sale(); break;
      case 'gather': sfx.gather(); break;
      case 'poured': {
        const now = performance.now();
        if (now - lastPourSfx > 75) { sfx.pour(pourStep++); lastPourSfx = now; }
        break;
      }
      case 'built':
        sfx.build();
        toast(`Construction finished. Tap it to see what it does.`, { big: true, title: `${BUILDINGS[e.building]?.name ?? e.building} is open!` });
        break;
      case 'tech': {
        const t = TECH_BY_ID[e.tech];
        if (t && !t.build) { sfx.tech(); toast(`<b>${esc(t.name)}</b>: ${esc(t.desc)}`); }
        break;
      }
      case 'contract': sfx.coinsBig(); toast(`Repaired <b>${esc(e.ship)}</b> · ${coinGlyph(14)} <b class="num">+${fmt(e.coins)}</b>`); break;
      case 'voyage': sfx.sale(); toast(`<b>${esc(e.ship)}</b> is back from a voyage · ${coinGlyph(14)} <b class="num">+${fmt(e.coins)}</b>`); break;
      case 'toast': toast(esc(e.text)); break;
    }
  }
  if (sale) { coinsEl.classList.remove('bump'); void coinsEl.offsetWidth; coinsEl.classList.add('bump'); }
}

// ---------------------------------------------------------------- HUD
const hudCache: Record<string, string> = {};
function setText(el: HTMLElement, key: string, v: string): void { if (hudCache[key] !== v) { hudCache[key] = v; el.textContent = v; } }
function setFlag(el: HTMLElement, cls: string, on: boolean): void { if (el.classList.contains(cls) !== on) el.classList.toggle(cls, on); }
function updateHud(): void {
  setText(coinN, 'coins', fmt(s.coins));
  const e = sim.era(s), ed = ERAS.find(x => x.n === e);
  setText(eraEl, 'era', `Era ${roman(e)} · ${ed?.name ?? ''}`);
  const n = bagTotal(s.satchel), cap = sim.carryCap(s);
  setText(satchelN, 'sat', `${n}/${cap}`);
  if (hudCache.satl !== `${n}/${cap}`) { hudCache.satl = `${n}/${cap}`; btnSatchel.setAttribute('aria-label', `Satchel, ${n} of ${cap} carried`); }
  setFlag(btnSatchel, 'full', n >= cap);
  setFlag(btnSatchel, 'lit', mode === 'satchel');
  setFlag(btnTech, 'lit', anyAffordable(s));
}

// ---------------------------------------------------------------- bottom panel (diffed, throttled)
let lastPanel = 0, lastPanelHtml = '', panelHoldUntil = 0;
function refreshSoon(): void { lastPanel = 0; }
function updatePanel(now: number): void {
  if (now - lastPanel < 300) return;
  if (now < panelHoldUntil) return;
  lastPanel = now;
  const v = panelView(s, selected, mode);
  if (v.html !== lastPanelHtml) {
    const active = document.activeElement as HTMLElement | null;
    const focusAct = active && panelInner.contains(active) ? active.getAttribute('data-act') : null;
    panelInner.innerHTML = v.html; lastPanelHtml = v.html;
    if (focusAct) (panelInner.querySelector(`[data-act="${focusAct}"]`) as HTMLElement | null)?.focus();
  }
  const bars = panelInner.querySelectorAll<HTMLElement>('[data-bar]');
  bars.forEach(b => {
    const f = v.bars[Number(b.dataset.bar)] ?? 0;
    const w = (f * 100).toFixed(1) + '%';
    if (b.style.width !== w) b.style.width = w;
    b.parentElement?.setAttribute('aria-valuenow', String(Math.round(f * 100)));
  });
}
// Don't swap markup out from under a finger.
panelEl.addEventListener('pointerdown', () => { panelHoldUntil = Infinity; });
for (const ev of ['pointerup', 'pointercancel', 'pointerleave']) panelEl.addEventListener(ev, () => { panelHoldUntil = performance.now() + 250; });

// ---------------------------------------------------------------- tech sheet
let techOpen = false, lastTech = 0, lastTechHtml = '', techHoldUntil = 0, techReturnFocus: HTMLElement | null = null;
function openTech(): void {
  if (techOpen) return;
  techOpen = true; techReturnFocus = document.activeElement as HTMLElement | null;
  techEl.hidden = false; lastTech = 0; lastTechHtml = '';
  updateTech(performance.now());
  // Scroll to the current era.
  const cur = techBody.querySelector('.era.cur') as HTMLElement | null;
  techBody.scrollTop = cur && sim.era(s) > 1 ? cur.offsetTop - 8 : 0;
  techClose.focus({ preventScroll: true });
}
function closeTech(): void {
  if (!techOpen) return;
  techOpen = false; techEl.hidden = true;
  if (techReturnFocus && document.contains(techReturnFocus)) techReturnFocus.focus({ preventScroll: true });
}
function updateTech(now: number): void {
  if (!techOpen || now - lastTech < 300 || now < techHoldUntil) return;
  lastTech = now;
  const sub = `${coinGlyph(14)} <span class="num">${fmt(s.coins)}</span> · Era ${roman(sim.era(s))} · tap a plan to mark it`;
  if (techSub.innerHTML !== sub) techSub.innerHTML = sub;
  const h = techView(s);
  if (h !== lastTechHtml) {
    const active = document.activeElement as HTMLElement | null;
    const focusAct = active && techBody.contains(active) ? active.getAttribute('data-act') : null;
    const st = techBody.scrollTop;
    techBody.innerHTML = h; lastTechHtml = h; techBody.scrollTop = st;
    if (focusAct) (techBody.querySelector(`[data-act="${focusAct}"]`) as HTMLElement | null)?.focus({ preventScroll: true });
  }
}
techEl.addEventListener('pointerdown', () => { techHoldUntil = Infinity; });
for (const ev of ['pointerup', 'pointercancel']) techEl.addEventListener(ev, () => { techHoldUntil = performance.now() + 250; });
techEl.addEventListener('click', e => { if (e.target === techEl) closeTech(); });
techClose.addEventListener('click', closeTech);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && techOpen) { e.preventDefault(); closeTech(); }
  // keep Tab inside the dialog
  if (e.key === 'Tab' && techOpen) {
    const f = Array.from(techEl.querySelectorAll<HTMLElement>('button:not([disabled])'));
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

// ---------------------------------------------------------------- button actions (panel + sheet)
function act(a: string): void {
  const i = a.indexOf(':'), verb = i < 0 ? a : a.slice(0, i), arg = i < 0 ? '' : a.slice(i + 1);
  switch (verb) {
    case 'tech': openTech(); break;
    case 'goto': closeTech(); tapRef({ k: 'bld', id: arg }); break;
    case 'take': {
      const room = sim.carryCap(s) - bagTotal(s.satchel);
      const n = Math.min(room, s.warehouse[arg] ?? 0);
      if (n > 0) { cmd(sim.takeFromWarehouse(s, arg, n)); sfx.gather(); }
      else toast(room <= 0 ? 'Your satchel is full.' : `No ${esc(itemName(arg))} left.`);
      break;
    }
    case 'ship': cmd(sim.fulfillContract(s, Number(arg))); break;
    case 'mark': case 'buy': {
      const before = sim.techStatus(s, arg);
      cmd(sim.buyTech(s, arg));
      const after = sim.techStatus(s, arg);
      const t = TECH_BY_ID[arg];
      if (verb === 'mark' && after === 'site' && before !== 'site' && t) {
        sfx.tech();
        toast(`Site marked for <b>${esc(t.name)}</b>. Walk there and hold it to pour coins.`);
      }
      lastTech = 0; updateTech(performance.now());
      break;
    }
  }
  refreshSoon();
}
function onActClick(e: Event): void {
  const b = (e.target as HTMLElement).closest('[data-act]') as HTMLButtonElement | null;
  if (!b || b.disabled) return;
  unlockAudio();
  act(b.dataset.act!);
}
panelEl.addEventListener('click', onActClick);
techBody.addEventListener('click', onActClick);

btnSatchel.addEventListener('click', () => { mode = mode === 'satchel' ? 'auto' : 'satchel'; refreshSoon(); });
btnTech.addEventListener('click', () => (techOpen ? closeTech() : openTech()));
btnSound.addEventListener('click', () => {
  setMuted(!isMuted()); lsSet(MUTE_KEY, isMuted() ? '1' : '0'); paintSound();
  if (!isMuted()) { unlockAudio(); sfx.tap(); }
});

// ---------------------------------------------------------------- lifecycle
let hiddenAt = 0, lastT = 0, lastSave = 0;
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    hiddenAt = Date.now(); save();
    stopPour(); ptr = null;
  } else {
    if (hiddenAt) awayFor((Date.now() - hiddenAt) / 1000);
    hiddenAt = 0; lastT = 0;
  }
});
window.addEventListener('pagehide', save);
window.addEventListener('resize', () => resize());
if ('ResizeObserver' in window) new ResizeObserver(() => resize()).observe(stage);

function frame(t: number): void {
  const dt = lastT ? Math.min(0.1, Math.max(0, (t - lastT) / 1000)) : 0;
  lastT = t;
  try {
    updatePour(dt, t);
    const evs = pending.concat(dt > 0 ? sim.tick(s, dt) : []);
    pending = [];
    watchBoard();
    if (evs.length) handleEvents(evs);
    updateCamera(dt, t);
    renderer.draw(s, cam, dt, { selected, events: evs, pouring, coinScreen });
    updateHud();
    updatePanel(t);
    updateTech(t);
    if (t - lastSave > 3000) { lastSave = t; save(); }
  } catch (err) {
    console.error(err);
  }
  requestAnimationFrame(frame);
}

// ---------------------------------------------------------------- boot
resize();
{
  const at = Number(lsGet(AT_KEY) || 0);
  if (resumed && at > 0) awayFor((Date.now() - at) / 1000);
}
save();
if (/[#&]debug\b/.test(location.hash)) {
  (window as unknown as Record<string, unknown>).__mw = { state: () => s, cam, sim, openTech, closeTech, tapRef };
}
requestAnimationFrame(frame);
