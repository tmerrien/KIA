// Small drawing helpers shared by the render modules. All world drawing is done in tile units
// (the context transform maps 1 unit = 1 tile), so line widths here are fractions of a tile.

export type Ctx = CanvasRenderingContext2D;

export const OUT = '#2a2236';        // ink outline used everywhere: gives the handmade "inked" look
export const LW = 0.045;             // default outline width in tiles (~1.6px at 36px/tile)

// Deterministic hash -> [0,1). Used for terrain variation and per-entity jitter (no Math.random in visuals
// that must stay stable between frames).
export function hash2(x: number, y: number, s = 0): number {
  let h = (Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(s | 0, 982451653)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const shadeCache = new Map<string, string>();
// f > 0 mixes toward white, f < 0 toward black.
export function shade(hex: string, f: number): string {
  const key = hex + f;
  const c = shadeCache.get(key);
  if (c) return c;
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  if (f >= 0) { r += (255 - r) * f; g += (255 - g) * f; b += (255 - b) * f; }
  else { r *= 1 + f; g *= 1 + f; b *= 1 + f; }
  const out = `rgb(${r | 0},${g | 0},${b | 0})`;
  shadeCache.set(key, out);
  return out;
}

export function rgba(hex: string, a: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

export function rr(ctx: Ctx, x: number, y: number, w: number, h: number, r: number): void {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export function poly(ctx: Ctx, pts: number[]): void {
  ctx.beginPath();
  ctx.moveTo(pts[0], pts[1]);
  for (let i = 2; i < pts.length; i += 2) ctx.lineTo(pts[i], pts[i + 1]);
  ctx.closePath();
}

export function ell(ctx: Ctx, x: number, y: number, rx: number, ry: number): void {
  ctx.beginPath();
  ctx.ellipse(x, y, Math.abs(rx), Math.abs(ry), 0, 0, Math.PI * 2);
}

// fill current path, then ink it
export function fs(ctx: Ctx, fill: string | CanvasGradient, lw = LW, stroke = OUT): void {
  ctx.fillStyle = fill;
  ctx.fill();
  if (lw > 0) { ctx.lineWidth = lw; ctx.strokeStyle = stroke; ctx.stroke(); }
}

export function line(ctx: Ctx, x0: number, y0: number, x1: number, y1: number, color: string, lw: number): void {
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.strokeStyle = color;
  ctx.lineWidth = lw;
  ctx.stroke();
}

export function glow(ctx: Ctx, x: number, y: number, r: number, color: string, a: number): void {
  if (a <= 0.003) return;
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, rgba(color, a));
  g.addColorStop(0.4, rgba(color, a * 0.45));
  g.addColorStop(1, rgba(color, 0));
  ctx.fillStyle = g;
  ctx.fillRect(x - r, y - r, r * 2, r * 2);
}

// four-point sparkle star
export function star4(ctx: Ctx, x: number, y: number, r: number, color: string, a = 1): void {
  if (a <= 0) return;
  ctx.globalAlpha *= a;
  ctx.beginPath();
  const k = r * 0.22;
  ctx.moveTo(x, y - r);
  ctx.quadraticCurveTo(x + k, y - k, x + r, y);
  ctx.quadraticCurveTo(x + k, y + k, x, y + r);
  ctx.quadraticCurveTo(x - k, y + k, x - r, y);
  ctx.quadraticCurveTo(x - k, y - k, x, y - r);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.globalAlpha /= a;
}

export const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const easeOut = (t: number) => 1 - (1 - t) * (1 - t);
