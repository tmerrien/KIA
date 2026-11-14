// Transient effects spawned from GameEvents: flying coins, floating "+N" text, sparkle bursts, pour streams.
// Effects store world anchors and are drawn in screen space (css px) in the overlay pass.
import type { GameEvent } from '../sim/types';
import type { Camera } from './api';
import { BUILDINGS, ITEMS } from './content';
import { drawItem } from './glyphs';
import { Ctx, OUT, star4, ell, easeOut } from './util';
import { visualTop } from './buildings';
import type { GameState } from '../sim/types';

interface CoinFx { kind: 'toUi' | 'toWorld'; wx: number; wy: number; sx: number; sy: number; age: number; delay: number; dur: number; arc: number }
interface TextFx { wx: number; wy: number; text: string; color: string; item: string | null; age: number; dur: number }
interface Spark { wx: number; wy: number; vx: number; vy: number; age: number; dur: number; color: string; size: number }

const SPARK_COLORS = ['#ffffff', '#ffd76a', '#7fe0a8', '#c9a6ff', '#bfe6ff'];

export function coinGlyph(ctx: Ctx, x: number, y: number, r: number, spin: number): void {
  const rx = Math.max(0.25, Math.abs(Math.cos(spin))) * r;
  ell(ctx, x, y, rx, r); ctx.fillStyle = '#e8a93a'; ctx.fill();
  ctx.lineWidth = Math.max(1, r * 0.22); ctx.strokeStyle = OUT; ctx.stroke();
  ell(ctx, x, y, rx * 0.68, r * 0.68); ctx.fillStyle = '#ffd76a'; ctx.fill();
  ell(ctx, x - rx * 0.25, y - r * 0.3, rx * 0.25, r * 0.18); ctx.fillStyle = '#fff6d0'; ctx.fill();
}

export class Fx {
  coins: CoinFx[] = [];
  texts: TextFx[] = [];
  sparks: Spark[] = [];
  private pourAcc = 0;
  private seed = 1;
  private rnd(): number { this.seed = (this.seed * 16807) % 2147483647; return (this.seed - 1) / 2147483646; }

  burst(wx: number, wy: number, n: number, spread: number): void {
    for (let i = 0; i < n; i++) {
      const a = this.rnd() * Math.PI * 2, v = (0.6 + this.rnd()) * spread;
      this.sparks.push({ wx, wy, vx: Math.cos(a) * v, vy: Math.sin(a) * v - spread * 0.6, age: 0, dur: 0.6 + this.rnd() * 0.5, color: SPARK_COLORS[(this.rnd() * SPARK_COLORS.length) | 0], size: 5 + this.rnd() * 6 });
    }
  }

  text(wx: number, wy: number, text: string, color: string, item: string | null = null): void {
    // nudge stacked texts so they don't overlap
    let off = 0;
    for (const t of this.texts) if (Math.abs(t.wx - wx) < 0.8 && Math.abs(t.wy - wy - off) < 0.3 && t.age < 0.5) off -= 0.4;
    this.texts.push({ wx, wy: wy + off, text, color, item, age: 0, dur: 1.3 });
  }

  events(evs: GameEvent[], s: GameState): void {
    for (const e of evs) {
      switch (e.t) {
        case 'sale': {
          const n = Math.min(7, 1 + Math.floor(Math.log2(e.coins + 1)));
          for (let i = 0; i < n; i++) this.coins.push({ kind: 'toUi', wx: e.x + 0.5, wy: e.y + 0.2, sx: 0, sy: 0, age: 0, delay: i * 0.06, dur: 0.75 + this.rnd() * 0.2, arc: 60 + this.rnd() * 60 });
          this.text(e.x + 0.5, e.y - 0.3, `+${e.coins}`, '#ffd76a');
          break;
        }
        case 'gather':
          this.text(e.x + 0.5, e.y - 0.1, `+${e.n}`, ITEMS[e.item]?.color ?? '#ffffff', e.item);
          break;
        case 'crafted': {
          const d = BUILDINGS[e.building];
          if (d) { const top = visualTop(e.building, s); this.burst(d.x + d.w / 2, top + 0.4, 10, 1.6); this.text(d.x + d.w / 2, top + 0.2, '+1', ITEMS[e.item]?.color ?? '#fff', e.item); }
          break;
        }
        case 'built': {
          const d = BUILDINGS[e.building];
          if (d) { this.burst(d.x + d.w / 2, d.y + d.h / 2, 40, 3.2); this.text(d.x + d.w / 2, visualTop(e.building, s), d.name, '#ffffff'); }
          break;
        }
        case 'voyage': case 'contract': {
          const d = BUILDINGS[e.t === 'voyage' ? 'shipyard' : 'drydock'];
          if (d) {
            this.text(d.x + d.w / 2, d.y - 0.4, `+${e.coins}`, '#ffd76a');
            for (let i = 0; i < 6; i++) this.coins.push({ kind: 'toUi', wx: d.x + d.w / 2, wy: d.y, sx: 0, sy: 0, age: 0, delay: i * 0.07, dur: 0.9, arc: 80 });
          }
          break;
        }
      }
    }
  }

  update(dt: number, pouring: string | null, coinScreen: { x: number; y: number }): void {
    if (pouring && BUILDINGS[pouring]) {
      this.pourAcc += dt;
      const d = BUILDINGS[pouring];
      while (this.pourAcc > 0.055) {
        this.pourAcc -= 0.055;
        this.coins.push({ kind: 'toWorld', wx: d.x + d.w / 2 + (this.rnd() - 0.5) * d.w * 0.5, wy: d.y + d.h * 0.5 + (this.rnd() - 0.5) * 0.4, sx: coinScreen.x, sy: coinScreen.y, age: 0, delay: 0, dur: 0.5 + this.rnd() * 0.15, arc: 30 + this.rnd() * 50 });
      }
    } else this.pourAcc = 0;
    for (const c of this.coins) c.age += dt;
    for (const t of this.texts) t.age += dt;
    for (const p of this.sparks) { p.age += dt; p.wx += p.vx * dt; p.wy += p.vy * dt; p.vy += 4.5 * dt; p.vx *= 1 - dt * 2; }
    // landed pour coins make a tiny glint
    for (const c of this.coins) if (c.kind === 'toWorld' && c.age >= c.dur + c.delay && c.age - dt < c.dur + c.delay) {
      this.sparks.push({ wx: c.wx, wy: c.wy, vx: 0, vy: -0.6, age: 0, dur: 0.35, color: '#ffd76a', size: 7 });
    }
    this.coins = this.coins.filter((c) => c.age < c.dur + c.delay);
    this.texts = this.texts.filter((t) => t.age < t.dur);
    this.sparks = this.sparks.filter((p) => p.age < p.dur);
    if (this.coins.length > 300) this.coins.splice(0, this.coins.length - 300);
  }

  // screen pass (ctx transform: css px)
  draw(ctx: Ctx, cam: Camera, coinScreen: { x: number; y: number }, t: number): void {
    const z = cam.zoom;
    const W = (wx: number, wy: number) => [(wx - cam.x) * z, (wy - cam.y) * z];
    for (const p of this.sparks) {
      const [x, y] = W(p.wx, p.wy);
      const k = 1 - p.age / p.dur;
      star4(ctx, x, y, p.size * (0.4 + 0.6 * k), p.color, Math.min(1, k * 1.5));
    }
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.lineJoin = 'round';
    for (const tx of this.texts) {
      const k = tx.age / tx.dur;
      const [x, y0] = W(tx.wx, tx.wy);
      const y = y0 - easeOut(Math.min(1, k * 1.4)) * z * 0.7;
      const a = k < 0.7 ? 1 : 1 - (k - 0.7) / 0.3;
      const sc = k < 0.12 ? 0.6 + (k / 0.12) * 0.5 : k < 0.2 ? 1.1 - ((k - 0.12) / 0.08) * 0.1 : 1;
      ctx.globalAlpha = a;
      ctx.font = `800 ${Math.round(16 * sc)}px ui-rounded, "SF Pro Rounded", system-ui, sans-serif`;
      const w = ctx.measureText(tx.text).width;
      const ix = tx.item ? x - 9 * sc : x;
      ctx.lineWidth = 4; ctx.strokeStyle = OUT; ctx.strokeText(tx.text, ix, y);
      ctx.fillStyle = tx.color; ctx.fillText(tx.text, ix, y);
      if (tx.item) drawItem(ctx, tx.item, ix + w / 2 + 10 * sc, y, 8 * sc);
      ctx.globalAlpha = 1;
    }
    for (const c of this.coins) {
      const a = c.age - c.delay;
      if (a < 0) continue;
      const k = Math.min(1, a / c.dur);
      let x0: number, y0: number, x1: number, y1: number;
      if (c.kind === 'toUi') { [x0, y0] = W(c.wx, c.wy); x1 = coinScreen.x; y1 = coinScreen.y; }
      else { x0 = c.sx; y0 = c.sy; [x1, y1] = W(c.wx, c.wy); }
      const e = c.kind === 'toUi' ? k * k * (3 - 2 * k) : k;
      const x = x0 + (x1 - x0) * e;
      const y = y0 + (y1 - y0) * e - Math.sin(k * Math.PI) * c.arc;
      const r = c.kind === 'toUi' ? 7 - 2 * k : 6;
      coinGlyph(ctx, x, y, r, t * 9 + c.delay * 20);
    }
  }
}
