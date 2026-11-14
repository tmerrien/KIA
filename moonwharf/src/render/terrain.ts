// Static terrain (regolith, rock walls, boardwalk, piers, the rocky underside of the moon's edge),
// painted once per zoom level into an offscreen canvas. Space tiles stay transparent so the animated
// starfield shows through.
import { MAP, tileAt } from './content';
import { Ctx, OUT, hash2, shade, poly, ell, line, rr } from './util';

const PAD = 1;
const REG = '#b8c3d4';
const WALL_TOP = '#7f88a3', WALL_FRONT = '#545b7a';
const PLANKS = ['#a2704a', '#ab7a51', '#976541', '#a87650'];
const PIER_PLANKS = ['#9a6a45', '#a6744c', '#8f603d'];

// The terrain is cached in CHUNK x CHUNK tile pieces, built lazily only when visible, so memory and draw
// cost scale with the screen rather than the map. The cache scale follows zoom*dpr; while the zoom is
// changing (pinch) the old chunks are stretched and only rebuilt once the zoom settles.
const CHUNK = 8;
const MAX_CHUNKS = 40;

export class Terrain {
  private chunks = new Map<string, { c: HTMLCanvasElement; used: number }>();
  private q = 0;
  private pendingQ = 0;
  private settle = 0;
  private frame = 0;

  private build(cx: number, cy: number): HTMLCanvasElement {
    const q = this.q;
    const c = document.createElement('canvas');
    c.width = Math.ceil(CHUNK * q);
    c.height = Math.ceil(CHUNK * q);
    const ctx = c.getContext('2d')!;
    const x0 = cx * CHUNK, y0 = cy * CHUNK;
    ctx.setTransform(q, 0, 0, q, -x0 * q, -y0 * q);
    ctx.beginPath(); ctx.rect(x0, y0, CHUNK, CHUNK); ctx.clip();
    paint(ctx, x0 - 2, y0 - 2, x0 + CHUNK + 2, y0 + CHUNK + 3);
    return c;
  }

  // world transform must be active (1 unit = 1 tile). pxPerTile = device px per tile.
  draw(ctx: Ctx, camX: number, camY: number, viewW: number, viewH: number, pxPerTile: number, dt = 0): void {
    this.frame++;
    const want = Math.min(Math.round(pxPerTile * 100) / 100, 160);
    if (!this.q) this.q = want;
    if (Math.abs(want - this.pendingQ) > 1e-6) { this.pendingQ = want; this.settle = 0; }
    else this.settle += dt;
    if (Math.abs(this.q - this.pendingQ) > 1e-6 && (this.settle > 0.2 || dt === 0)) { this.q = this.pendingQ; this.chunks.clear(); }
    const cx0 = Math.floor(Math.max(-PAD, camX) / CHUNK), cy0 = Math.floor(Math.max(-PAD, camY) / CHUNK);
    const cx1 = Math.floor(Math.min(MAP.width + PAD, camX + viewW) / CHUNK), cy1 = Math.floor(Math.min(MAP.height + PAD, camY + viewH) / CHUNK);
    for (let cy = cy0; cy <= cy1; cy++) for (let cx = cx0; cx <= cx1; cx++) {
      const key = cx + ',' + cy;
      let ch = this.chunks.get(key);
      if (!ch) { ch = { c: this.build(cx, cy), used: 0 }; this.chunks.set(key, ch); }
      ch.used = this.frame;
      ctx.drawImage(ch.c, cx * CHUNK, cy * CHUNK, CHUNK, CHUNK);
    }
    if (this.chunks.size > MAX_CHUNKS) {
      const old = [...this.chunks.entries()].sort((a, b) => a[1].used - b[1].used);
      for (let i = 0; i < old.length - MAX_CHUNKS; i++) this.chunks.delete(old[i][0]);
    }
  }
}

// paint tiles in [ax,bx) x [ay,by) (clamped to the map); the caller clips to its chunk
function paint(ctx: Ctx, ax: number, ay: number, bx: number, by: number): void {
  const W = MAP.width, H = MAP.height;
  const X0 = Math.max(0, ax), Y0 = Math.max(0, ay), X1 = Math.min(W, bx), Y1 = Math.min(H, by);
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  // 1. rocky underside hanging below any land edge that faces open space
  for (let y = Math.max(0, ay - 2); y < Math.min(H, by); y++) {
    let x = 0;
    while (x < W) {
      const land = (xx: number) => { const c = tileAt(xx, y); return (c === '#' || c === '.' || c === '=') && tileAt(xx, y + 1) === ' '; };
      if (!land(x)) { x++; continue; }
      let e = x; while (e < W && land(e)) e++;
      crust(ctx, x, e, y + 1);
      x = e;
    }
  }
  // 2. regolith ground under everything solid
  ctx.fillStyle = REG;
  for (let y = Y0; y < Y1; y++) for (let x = X0; x < X1; x++) {
    const c = tileAt(x, y);
    if (c === '.' || c === '#' || c === '=') ctx.fillRect(x - 0.01, y - 0.01, 1.02, 1.02);
  }
  for (let y = Y0; y < Y1; y++) for (let x = X0; x < X1; x++) if (tileAt(x, y) === '.') regolith(ctx, x, y);
  // wall shadows on regolith
  for (let y = Y0; y < Y1; y++) for (let x = X0; x < X1; x++) {
    if (tileAt(x, y) !== '.') continue;
    if (tileAt(x, y - 1) === '#') { const g = ctx.createLinearGradient(0, y, 0, y + 0.45); g.addColorStop(0, 'rgba(40,40,80,0.28)'); g.addColorStop(1, 'rgba(40,40,80,0)'); ctx.fillStyle = g; ctx.fillRect(x, y, 1, 0.45); }
    if (tileAt(x - 1, y) === '#') { const g = ctx.createLinearGradient(x, 0, x + 0.3, 0); g.addColorStop(0, 'rgba(40,40,80,0.22)'); g.addColorStop(1, 'rgba(40,40,80,0)'); ctx.fillStyle = g; ctx.fillRect(x, y, 0.3, 1); }
    if (tileAt(x + 1, y) === '#') { const g = ctx.createLinearGradient(x + 1, 0, x + 0.8, 0); g.addColorStop(0, 'rgba(40,40,80,0.16)'); g.addColorStop(1, 'rgba(40,40,80,0)'); ctx.fillStyle = g; ctx.fillRect(x + 0.8, y, 0.2, 1); }
  }
  // 3. boardwalk
  for (let y = Y0; y < Y1; y++) for (let x = X0; x < X1; x++) if (tileAt(x, y) === '=') boardwalk(ctx, x, y);
  // 4. piers
  for (let y = Y0; y < Y1; y++) for (let x = X0; x < X1; x++) if (tileAt(x, y) === 'P') pier(ctx, x, y);
  // 5. rock walls, top row first so lower rows overlap correctly
  for (let y = Y0; y < Y1; y++) for (let x = X0; x < X1; x++) if (tileAt(x, y) === '#') wallTop(ctx, x, y);
}

function crust(ctx: Ctx, x0: number, x1: number, y: number): void {
  const pts: number[] = [x0, y];
  for (let x = x0; x <= x1; x += 0.5) {
    const d = 0.55 + hash2(Math.round(x * 2), y, 11) * 0.75 + (x === x0 || x === x1 ? -0.4 : 0);
    pts.push(x, y + d);
  }
  pts.push(x1, y);
  poly(ctx, pts);
  const g = ctx.createLinearGradient(0, y, 0, y + 1.3);
  g.addColorStop(0, '#57527c'); g.addColorStop(0.5, '#3a3462'); g.addColorStop(1, '#241e48');
  ctx.fillStyle = g; ctx.fill();
  ctx.strokeStyle = OUT; ctx.lineWidth = 0.05; ctx.stroke();
  // strata lines + a few glinting bits
  ctx.strokeStyle = 'rgba(140,130,190,0.35)'; ctx.lineWidth = 0.035;
  ctx.beginPath(); ctx.moveTo(x0 + 0.1, y + 0.18);
  for (let x = x0 + 0.1; x < x1; x += 0.7) ctx.lineTo(x, y + 0.16 + hash2(x * 10, y, 3) * 0.08);
  ctx.stroke();
  for (let x = x0; x < x1; x++) {
    if (hash2(x, y, 5) < 0.3) { ell(ctx, x + 0.5, y + 0.32, 0.04, 0.04); ctx.fillStyle = hash2(x, y, 6) < 0.5 ? '#9ff5cf' : '#c9a6ff'; ctx.fill(); }
  }
}

function regolith(ctx: Ctx, x: number, y: number): void {
  // soft tonal patches
  for (let k = 0; k < 2; k++) {
    const h = hash2(x, y, 20 + k);
    const cx = x + hash2(x, y, 30 + k), cy = y + hash2(x, y, 40 + k), r = 0.35 + h * 0.4;
    ell(ctx, cx, cy, r, r * 0.7);
    ctx.fillStyle = h < 0.5 ? 'rgba(255,255,255,0.07)' : 'rgba(70,80,120,0.06)';
    ctx.fill();
  }
  // occasional big crater
  if (hash2(x, y, 77) < 0.035) {
    const cx = x + 0.5, cy = y + 0.5, r = 0.55 + hash2(x, y, 78) * 0.25;
    ell(ctx, cx, cy, r, r * 0.6); ctx.fillStyle = '#a7b2c6'; ctx.fill();
    ell(ctx, cx, cy - r * 0.06, r * 0.84, r * 0.46); ctx.fillStyle = '#97a3ba'; ctx.fill();
    ell(ctx, cx + r * 0.1, cy + r * 0.05, r * 0.5, r * 0.25); ctx.fillStyle = '#a1adc3'; ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx, cy, r, r * 0.6, 0, 0.1, Math.PI - 0.1);
    ctx.strokeStyle = '#dbe2ed'; ctx.lineWidth = 0.05; ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx, cy, r, r * 0.6, 0, Math.PI + 0.3, Math.PI * 2 - 0.3);
    ctx.strokeStyle = '#8a96ad'; ctx.lineWidth = 0.035; ctx.stroke();
    return;
  }
  // crater
  if (hash2(x, y, 1) < 0.22) {
    const cx = x + 0.25 + hash2(x, y, 2) * 0.5, cy = y + 0.3 + hash2(x, y, 3) * 0.4, r = 0.1 + hash2(x, y, 4) * 0.18;
    ell(ctx, cx, cy, r, r * 0.62); ctx.fillStyle = '#a3afc4'; ctx.fill();
    ell(ctx, cx, cy - r * 0.08, r * 0.82, r * 0.45); ctx.fillStyle = '#95a1b8'; ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx, cy, r, r * 0.62, 0, 0.15, Math.PI - 0.15);
    ctx.strokeStyle = '#d6dde9'; ctx.lineWidth = 0.04; ctx.stroke();
  }
  // pebbles
  const n = (hash2(x, y, 7) * 3) | 0;
  for (let i = 0; i < n; i++) {
    const px = x + hash2(x, y, 50 + i), py = y + hash2(x, y, 60 + i), r = 0.025 + hash2(x, y, 70 + i) * 0.03;
    ell(ctx, px, py, r * 1.3, r); ctx.fillStyle = '#8d98ae'; ctx.fill();
    ell(ctx, px - r * 0.3, py - r * 0.3, r * 0.5, r * 0.4); ctx.fillStyle = '#dfe5ef'; ctx.fill();
  }
}

function boardwalk(ctx: Ctx, x: number, y: number): void {
  const n = 4, pw = 1 / n;
  for (let i = 0; i < n; i++) {
    const px = x + i * pw;
    const h = hash2(x * 4 + i, y, 9);
    ctx.fillStyle = PLANKS[(h * PLANKS.length) | 0];
    ctx.fillRect(px, y + 0.06, pw, 0.94);
    // grain
    ctx.strokeStyle = 'rgba(80,45,25,0.25)'; ctx.lineWidth = 0.02;
    ctx.beginPath(); ctx.moveTo(px + pw * 0.4, y + 0.15 + h * 0.2); ctx.lineTo(px + pw * 0.45, y + 0.6 + h * 0.2); ctx.stroke();
    // seam + nails
    line(ctx, px, y + 0.06, px, y + 1, 'rgba(60,35,25,0.65)', 0.03);
    ctx.fillStyle = '#5a3a26';
    ctx.fillRect(px + pw / 2 - 0.02, y + 0.16, 0.04, 0.04);
    ctx.fillRect(px + pw / 2 - 0.02, y + 0.84, 0.04, 0.04);
  }
  // brass edging on the landward side
  ctx.fillStyle = '#d6aa52'; ctx.fillRect(x, y, 1, 0.07);
  line(ctx, x, y + 0.07, x + 1, y + 0.07, '#7a5a2a', 0.025);
  // front fascia where the boardwalk overhangs space
  if (tileAt(x, y + 1) === ' ') {
    ctx.fillStyle = '#6a442c'; ctx.fillRect(x, y + 1, 1, 0.2);
    line(ctx, x, y + 1.2, x + 1, y + 1.2, OUT, 0.05);
    line(ctx, x, y + 1, x + 1, y + 1, '#c9965c', 0.03);
    // support post
    if (x % 2 === 0) { ctx.fillStyle = '#4e3322'; ctx.fillRect(x + 0.45, y + 1.2, 0.1, 0.35); }
  }
}

function pier(ctx: Ctx, x: number, y: number): void {
  const x0 = x + 0.14, w = 0.72;
  const end = tileAt(x, y + 1) !== 'P';
  // planks laid across
  const n = 4;
  for (let i = 0; i < n; i++) {
    const py = y + i / n;
    ctx.fillStyle = PIER_PLANKS[(hash2(x, y * 4 + i, 13) * PIER_PLANKS.length) | 0];
    ctx.fillRect(x0, py, w, 1 / n);
    line(ctx, x0, py, x0 + w, py, 'rgba(60,35,25,0.6)', 0.03);
    ctx.fillStyle = '#5a3a26';
    ctx.fillRect(x0 + 0.08, py + 0.1, 0.035, 0.035);
    ctx.fillRect(x0 + w - 0.115, py + 0.1, 0.035, 0.035);
  }
  // side stringers
  ctx.fillStyle = '#5e3c27';
  ctx.fillRect(x0 - 0.04, y, 0.06, 1);
  ctx.fillRect(x0 + w - 0.02, y, 0.06, 1);
  // cross beams poking out beneath
  ctx.fillStyle = '#4a2f20';
  ctx.fillRect(x0 - 0.12, y + 0.42, 0.1, 0.12);
  ctx.fillRect(x0 + w + 0.02, y + 0.42, 0.1, 0.12);
  // bollards with brass caps on alternating sides
  const side = y % 2 === 0 ? x0 + 0.02 : x0 + w - 0.02;
  ell(ctx, side, y + 0.5, 0.075, 0.06); ctx.fillStyle = '#c9a14a'; ctx.fill(); ctx.strokeStyle = OUT; ctx.lineWidth = 0.03; ctx.stroke();
  if (end) {
    // front face + dangling posts into the void
    ctx.fillStyle = '#5e3c27'; ctx.fillRect(x0 - 0.04, y + 1, w + 0.08, 0.16);
    line(ctx, x0 - 0.04, y + 1.16, x0 + w + 0.04, y + 1.16, OUT, 0.04);
    for (const px of [x0 + 0.04, x0 + w - 0.12]) {
      const g = ctx.createLinearGradient(0, y + 1.16, 0, y + 1.9);
      g.addColorStop(0, '#4a2f20'); g.addColorStop(1, 'rgba(74,47,32,0)');
      ctx.fillStyle = g; ctx.fillRect(px, y + 1.16, 0.08, 0.74);
    }
  }
  // outline the deck
  ctx.strokeStyle = OUT; ctx.lineWidth = 0.035;
  ctx.beginPath(); ctx.moveTo(x0 - 0.04, y); ctx.lineTo(x0 - 0.04, y + 1); ctx.moveTo(x0 + w + 0.04, y); ctx.lineTo(x0 + w + 0.04, y + 1); ctx.stroke();
}

const RAISE = 0.42;
function wallTop(ctx: Ctx, x: number, y: number): void {
  const below = tileAt(x, y + 1);
  const ty = y - RAISE;
  // front face (visible when the tile below is not wall)
  if (below !== '#') {
    ctx.fillStyle = WALL_FRONT; ctx.fillRect(x - 0.02, ty + 1, 1.04, RAISE);
    ctx.strokeStyle = shade(WALL_FRONT, -0.3); ctx.lineWidth = 0.035;
    for (let k = 0; k < 2; k++) {
      const cx = x + 0.2 + hash2(x, y, 90 + k) * 0.6;
      ctx.beginPath(); ctx.moveTo(cx, ty + 1); ctx.lineTo(cx + 0.05, ty + 1 + RAISE * 0.6); ctx.stroke();
    }
    line(ctx, x - 0.02, ty + 1 + RAISE, x + 1.02, ty + 1 + RAISE, OUT, 0.05);
  }
  // top face
  ctx.fillStyle = WALL_TOP; ctx.fillRect(x - 0.02, ty - 0.02, 1.04, 1.04);
  // ridged boulders
  for (let k = 0; k < 3; k++) {
    const cx = x + 0.2 + hash2(x, y, 100 + k) * 0.6, cy = ty + 0.25 + hash2(x, y, 110 + k) * 0.5;
    const r = 0.18 + hash2(x, y, 120 + k) * 0.14;
    lump(ctx, cx, cy, r, hash2(x, y, 130 + k));
  }
  // outer edges vs space / regolith
  ctx.strokeStyle = OUT; ctx.lineWidth = 0.05;
  ctx.beginPath();
  if (tileAt(x, y - 1) !== '#') { ctx.moveTo(x - 0.02, ty); ctx.lineTo(x + 1.02, ty); }
  if (tileAt(x - 1, y) !== '#') { ctx.moveTo(x, ty); ctx.lineTo(x, ty + 1 + (below !== '#' ? RAISE : 0)); }
  if (tileAt(x + 1, y) !== '#') { ctx.moveTo(x + 1, ty); ctx.lineTo(x + 1, ty + 1 + (below !== '#' ? RAISE : 0)); }
  ctx.stroke();
  void rr;
}

function lump(ctx: Ctx, cx: number, cy: number, r: number, h: number): void {
  const pts: number[] = [];
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2 + h;
    const rad = r * (0.8 + hash2(i, (h * 1000) | 0, 3) * 0.35);
    pts.push(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad * 0.75);
  }
  poly(ctx, pts);
  ctx.fillStyle = h < 0.5 ? '#8f99b4' : '#86909f';
  ctx.fill();
  ctx.strokeStyle = '#4c5370'; ctx.lineWidth = 0.035; ctx.stroke();
  // ridge highlight
  ctx.beginPath(); ctx.moveTo(cx - r * 0.6, cy - r * 0.1); ctx.lineTo(cx - r * 0.1, cy - r * 0.45); ctx.lineTo(cx + r * 0.45, cy - r * 0.2);
  ctx.strokeStyle = '#c3cadb'; ctx.lineWidth = 0.035; ctx.stroke();
}
