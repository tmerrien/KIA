// The void around Halfmoon Wharf: gradient sky, a soft nebula, a distant ringed world and three parallax star layers.
// Drawn in screen space (css px) before the world.
import type { Camera } from './api';
import { Ctx, rng, rgba, star4 } from './util';

interface Star { x: number; y: number; r: number; ph: number; c: string; big: boolean }

const TILE = 640; // repeat size of star patterns, css px
const STAR_COLORS = ['#ffffff', '#fff1c9', '#cfe0ff', '#e6d4ff', '#c9fff0'];

export class Space {
  private layers: { f: number; stars: Star[] }[] = [];
  private nebula: HTMLCanvasElement;
  constructor() {
    const R = rng(77);
    const mk = (n: number, f: number, rmin: number, rmax: number, bigP: number) => {
      const stars: Star[] = [];
      for (let i = 0; i < n; i++) stars.push({ x: R() * TILE, y: R() * TILE, r: rmin + R() * (rmax - rmin), ph: R() * 6.28, c: STAR_COLORS[(R() * STAR_COLORS.length) | 0], big: R() < bigP });
      return { f, stars };
    };
    this.layers = [mk(140, 0.08, 0.4, 0.9, 0), mk(70, 0.22, 0.6, 1.2, 0.08), mk(26, 0.45, 0.9, 1.6, 0.35)];
    // nebula: soft blobs painted once to a small canvas, wrapped so it tiles seamlessly
    const N = 512;
    this.nebula = document.createElement('canvas');
    this.nebula.width = this.nebula.height = N;
    const c = this.nebula.getContext('2d')!;
    const cols = ['#6b3fa0', '#3b2f8f', '#9a3f8a', '#2f6f8f', '#5a2f7a'];
    for (let i = 0; i < 22; i++) {
      const x = R() * N, y = R() * N, r = 60 + R() * 150, col = cols[i % cols.length], a = 0.1 + R() * 0.14;
      for (const ox of [-N, 0, N]) for (const oy of [-N, 0, N]) {
        const g = c.createRadialGradient(x + ox, y + oy, 0, x + ox, y + oy, r);
        g.addColorStop(0, rgba(col, a)); g.addColorStop(1, rgba(col, 0));
        c.fillStyle = g; c.fillRect(x + ox - r, y + oy - r, r * 2, r * 2);
      }
    }
  }

  draw(ctx: Ctx, w: number, h: number, cam: Camera, t: number): void {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#120c2c');
    g.addColorStop(0.55, '#1d1240');
    g.addColorStop(1, '#2a1553');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    const cx = cam.x * cam.zoom, cy = cam.y * cam.zoom;
    // nebula, slow parallax + drift
    const NS = 1024; // drawn at 2x
    const nx = -(((cx * 0.06 + t * 2) % NS) + NS) % NS, ny = -(((cy * 0.06) % NS) + NS) % NS;
    ctx.globalAlpha = 0.9;
    for (let x = nx; x < w; x += NS) for (let y = ny; y < h; y += NS) ctx.drawImage(this.nebula, x, y, NS, NS);
    ctx.globalAlpha = 1;
    // distant ringed world
    this.planet(ctx, w * 0.78 - cx * 0.03, h * 0.12 - cy * 0.03 + 1200 * 0.03, Math.min(w, h) * 0.16);
    // stars
    for (const L of this.layers) {
      const ox = -(((cx * L.f + t * 3 * L.f) % TILE) + TILE) % TILE;
      const oy = -(((cy * L.f) % TILE) + TILE) % TILE;
      for (let bx = ox; bx < w; bx += TILE) for (let by = oy; by < h; by += TILE) {
        for (const s of L.stars) {
          const x = bx + s.x, y = by + s.y;
          if (x < -4 || y < -4 || x > w + 4 || y > h + 4) continue;
          const tw = 0.55 + 0.45 * Math.sin(t * (1.2 + s.r) + s.ph);
          if (s.big) {
            star4(ctx, x, y, s.r * 3.2 * (0.7 + 0.3 * tw), s.c, 0.5 + 0.5 * tw);
          } else {
            ctx.globalAlpha = 0.35 + 0.65 * tw;
            ctx.fillStyle = s.c;
            ctx.fillRect(x - s.r / 2, y - s.r / 2, s.r, s.r);
          }
        }
      }
    }
    ctx.globalAlpha = 1;
  }

  private planet(ctx: Ctx, x: number, y: number, r: number): void {
    ctx.save();
    // ring back half
    ctx.translate(x, y);
    ctx.rotate(-0.35);
    ctx.lineWidth = r * 0.07;
    ctx.strokeStyle = 'rgba(214,190,255,0.22)';
    ctx.beginPath(); ctx.ellipse(0, 0, r * 1.75, r * 0.38, 0, Math.PI, Math.PI * 2); ctx.stroke();
    const g = ctx.createRadialGradient(-r * 0.4, -r * 0.4, r * 0.1, 0, 0, r);
    g.addColorStop(0, '#6d5aa8'); g.addColorStop(0.7, '#3b2c6e'); g.addColorStop(1, '#241a4a');
    ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
    // bands
    ctx.save(); ctx.clip();
    ctx.fillStyle = 'rgba(160,140,220,0.12)';
    ctx.fillRect(-r, -r * 0.25, r * 2, r * 0.18);
    ctx.fillRect(-r, r * 0.2, r * 2, r * 0.1);
    // night side
    ctx.beginPath(); ctx.arc(r * 0.45, r * 0.35, r * 1.05, 0, Math.PI * 2); ctx.fillStyle = 'rgba(14,9,36,0.55)'; ctx.fill();
    ctx.restore();
    ctx.strokeStyle = 'rgba(230,214,255,0.35)';
    ctx.beginPath(); ctx.ellipse(0, 0, r * 1.75, r * 0.38, 0, 0, Math.PI); ctx.stroke();
    ctx.restore();
  }
}
