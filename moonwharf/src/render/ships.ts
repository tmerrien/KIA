// Solar-sail ships: docked at piers, on the drydock cradle, as a skeleton in the shipyard, and sailing the void.
import { Ctx, OUT, LW, fs, poly, ell, line, glow, shade, rgba } from './util';

export interface ShipStyle {
  hull: string; trim: string; sailA: string; sailB: string; flag: string;
}

export const SHIP_STYLES: ShipStyle[] = [
  { hull: '#7a4a2e', trim: '#d9a845', sailA: '#fff3c4', sailB: '#ffc65a', flag: '#e2553f' },
  { hull: '#4f5a7a', trim: '#cfd6e6', sailA: '#e8fff6', sailB: '#6fe3c1', flag: '#ffd36a' },
  { hull: '#8a3b3b', trim: '#e3b45a', sailA: '#fff0f6', sailB: '#ff9fc3', flag: '#7fe0a8' },
  { hull: '#5b4630', trim: '#b8c3d4', sailA: '#f0ecff', sailB: '#a98bff', flag: '#ffb04a' },
];

// Hull path in local coords: x along length (bow at +x), y down. Hull top (deck line) at y = 0.
function hullPath(ctx: Ctx, L: number, D: number): void {
  const h = L / 2;
  ctx.beginPath();
  ctx.moveTo(-h, -0.12 * D);
  ctx.lineTo(h * 0.72, 0);
  ctx.quadraticCurveTo(h * 1.02, -0.05 * D, h * 1.12, -0.32 * D);  // bow sprit rise
  ctx.quadraticCurveTo(h * 0.95, D * 0.85, h * 0.2, D);             // bow curve down to keel
  ctx.lineTo(-h * 0.55, D * 0.95);
  ctx.quadraticCurveTo(-h * 0.98, D * 0.75, -h, -0.12 * D);         // stern
  ctx.closePath();
}

// Draw a ship. (x,y) = point on the deck line, middle of the hull. s = scale (1 => ~3.4 tiles long).
export function drawShip(ctx: Ctx, x: number, y: number, s: number, st: ShipStyle, t: number, dir: 1 | -1 = 1, sails = true): void {
  const L = 3.2, D = 0.62;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s * dir, s);
  ctx.lineJoin = 'round';
  const lw = LW / s;
  // engine glow beneath keel
  const fl = 0.75 + 0.25 * Math.sin(t * 9 + x);
  glow(ctx, -0.1, D + 0.25, 1.1, '#7ff0d8', 0.35 * fl);
  ell(ctx, -0.2, D + 0.05, 0.38, 0.1); ctx.fillStyle = rgba('#bffff0', 0.7 * fl); ctx.fill();
  // hull
  hullPath(ctx, L, D);
  fs(ctx, st.hull, lw);
  ctx.save();
  hullPath(ctx, L, D); ctx.clip();
  ctx.strokeStyle = shade(st.hull, -0.3); ctx.lineWidth = lw * 0.7;
  for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(-L, D * k * 0.24); ctx.quadraticCurveTo(0, D * k * 0.24 + 0.08, L, D * k * 0.24 - 0.1); ctx.stroke(); }
  ctx.fillStyle = shade(st.hull, 0.18); ctx.fillRect(-L, -0.2, L * 2, 0.16);
  ctx.fillStyle = st.trim; ctx.fillRect(-L, 0.13, L * 2, 0.07);
  ctx.restore();
  // portholes
  for (const px of [-0.9, -0.3, 0.3]) {
    ell(ctx, px, 0.38, 0.09, 0.09); fs(ctx, '#ffd98a', lw * 0.8, st.trim);
  }
  // cabin at stern
  poly(ctx, [-1.5, 0, -1.5, -0.42, -0.75, -0.42, -0.75, 0]); fs(ctx, shade(st.hull, 0.25), lw);
  poly(ctx, [-1.6, -0.42, -1.45, -0.56, -0.8, -0.56, -0.65, -0.42]); fs(ctx, st.trim, lw);
  ell(ctx, -1.12, -0.22, 0.09, 0.09); fs(ctx, '#ffd98a', lw * 0.7);
  // deck rail
  ctx.strokeStyle = st.trim; ctx.lineWidth = lw * 0.9;
  ctx.beginPath(); ctx.moveTo(-0.7, -0.2); ctx.lineTo(1.1, -0.18); ctx.stroke();
  for (let px = -0.6; px < 1.15; px += 0.3) line(ctx, px, -0.19, px, 0, st.trim, lw * 0.6);
  if (sails) drawRig(ctx, st, t, lw, x);
  ctx.restore();
}

function drawRig(ctx: Ctx, st: ShipStyle, t: number, lw: number, seed: number): void {
  const mx = 0.25, top = -2.35;
  const sw = Math.sin(t * 1.3 + seed) * 0.04;
  // mast + boom
  line(ctx, mx, 0, mx, top, OUT, 0.13);
  line(ctx, mx, 0, mx, top, '#a87a4c', 0.07);
  // main solar sail: a slightly bowed panel with ribs
  const g = ctx.createLinearGradient(mx, top, mx + 1.3, -0.3);
  g.addColorStop(0, st.sailA); g.addColorStop(1, st.sailB);
  ctx.beginPath();
  ctx.moveTo(mx + 0.06, top + 0.15);
  ctx.quadraticCurveTo(mx + 0.9 + sw, top + 0.2, mx + 1.25 + sw, top + 0.55);
  ctx.quadraticCurveTo(mx + 1.5 + sw, -1.0, mx + 1.2, -0.35);
  ctx.lineTo(mx + 0.06, -0.35);
  ctx.closePath();
  fs(ctx, g, lw);
  ctx.strokeStyle = rgba('#ffffff', 0.55); ctx.lineWidth = lw * 0.7;
  for (let k = 1; k < 4; k++) {
    const yy = top + 0.15 + (k / 4) * (-0.35 - top - 0.15);
    ctx.beginPath(); ctx.moveTo(mx + 0.06, yy); ctx.lineTo(mx + 1.25 + sw + Math.sin(k) * 0.05, yy + 0.1); ctx.stroke();
  }
  // aft small sail
  const g2 = ctx.createLinearGradient(mx - 1, top, mx, 0);
  g2.addColorStop(0, st.sailA); g2.addColorStop(1, shade(st.sailB, -0.05));
  ctx.beginPath();
  ctx.moveTo(mx - 0.06, top + 0.45);
  ctx.quadraticCurveTo(mx - 0.75 - sw, -1.1, mx - 0.85, -0.45);
  ctx.lineTo(mx - 0.06, -0.45);
  ctx.closePath();
  fs(ctx, g2, lw);
  // pennant
  const fw = Math.sin(t * 5 + seed) * 0.06;
  poly(ctx, [mx, top, mx + 0.5, top + 0.08 + fw, mx, top + 0.2]);
  fs(ctx, st.flag, lw * 0.8);
  // rigging lines
  ctx.strokeStyle = rgba('#2a2236', 0.6); ctx.lineWidth = lw * 0.6;
  ctx.beginPath(); ctx.moveTo(mx, top); ctx.lineTo(1.75, -0.25); ctx.moveTo(mx, top); ctx.lineTo(-1.5, -0.45); ctx.stroke();
}

// additive glow for a ship's sails (lighting pass)
export function shipGlow(ctx: Ctx, x: number, y: number, s: number, st: ShipStyle, dir: 1 | -1, a = 1): void {
  glow(ctx, x + dir * 0.9 * s, y - 1.3 * s, 1.9 * s, st.sailB, 0.28 * a);
}

// Hull skeleton for the shipyard. f = 0..1 build progress.
export function drawSkeleton(ctx: Ctx, x: number, y: number, s: number, f: number, t: number): void {
  const L = 3.2, D = 0.62, h = L / 2;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  const lw = LW / s;
  // keel
  ctx.beginPath(); ctx.moveTo(-h * 0.9, D * 0.85); ctx.quadraticCurveTo(0, D * 1.08, h * 0.9, D * 0.55); ctx.quadraticCurveTo(h * 1.05, D * 0.1, h * 1.1, -0.3);
  ctx.strokeStyle = OUT; ctx.lineWidth = 0.16; ctx.stroke();
  ctx.strokeStyle = '#d9a46a'; ctx.lineWidth = 0.09; ctx.stroke();
  // ribs appear with progress
  const n = 9, shown = Math.max(1, Math.round(n * Math.min(1, f * 1.4)));
  for (let i = 0; i < shown; i++) {
    const px = -h * 0.85 + (i / (n - 1)) * h * 1.75;
    const bottom = D * (1 - Math.pow(Math.abs(px) / (h * 1.1), 2) * 0.45);
    ctx.beginPath(); ctx.moveTo(px - 0.05, -0.1); ctx.quadraticCurveTo(px + 0.06, bottom * 0.6, px, bottom);
    ctx.strokeStyle = OUT; ctx.lineWidth = 0.12; ctx.stroke();
    ctx.strokeStyle = '#e8bb84'; ctx.lineWidth = 0.065; ctx.stroke();
  }
  // planking creeps up from the keel in the second half
  if (f > 0.5) {
    ctx.save();
    hullPath(ctx, L, D); ctx.clip();
    const ph = (f - 0.5) * 2;
    ctx.fillStyle = '#8a5a36';
    ctx.fillRect(-h * 1.2, D * (1 - ph) - 0.05, L * 1.3, D + 0.2);
    ctx.strokeStyle = shade('#8a5a36', -0.3); ctx.lineWidth = lw * 0.7;
    for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(-L, D * k * 0.24); ctx.lineTo(L, D * k * 0.24); ctx.stroke(); }
    ctx.restore();
  }
  // deck beam
  line(ctx, -h, -0.1, h * 0.9, -0.05, OUT, 0.12);
  line(ctx, -h, -0.1, h * 0.9, -0.05, '#b98a58', 0.06);
  // mast stub when nearly done
  if (f > 0.8) { line(ctx, 0.25, -0.05, 0.25, -0.05 - (f - 0.8) * 8, OUT, 0.12); line(ctx, 0.25, -0.05, 0.25, -0.05 - (f - 0.8) * 8, '#a87a4c', 0.06); }
  ctx.restore();
  void t;
}
