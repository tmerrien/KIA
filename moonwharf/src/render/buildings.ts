// Buildings of Halfmoon Wharf, construction sites, and their glows. Each building is drawn in its footprint
// in 3/4 view: a front wall along the footprint's bottom edge and a roof that rises above the footprint top.
import type { GameState } from '../sim/types';
import { BDef, BUILDINGS, siteCost, tileAt } from './content';
import { drawItem } from './glyphs';
import { drawShip, drawSkeleton, SHIP_STYLES, shipGlow } from './ships';
import { Ctx, OUT, LW, fs, poly, rr, ell, line, glow, shade, star4, rgba, hash2, clamp } from './util';

export interface Frame { x0: number; x1: number; yb: number; wt: number; rt: number; cx: number }

// lift = how far the roof rises above the footprint top; wallH = visible front wall height
export function frameOf(d: BDef, lift: number, wallH: number, inset = 0.1): Frame {
  const x0 = d.x + inset, x1 = d.x + d.w - inset, yb = d.y + d.h - 0.08;
  return { x0, x1, yb, wt: yb - wallH, rt: d.y - lift, cx: d.x + d.w / 2 };
}

// visual top of each building (for selection brackets / badges)
export const LIFT: Record<string, number> = {
  stall: 0.55, board: 0.95, smelter: 1.15, loom: 0.45, galley: 0.75, cutter: 0.75, tinker: 0.35, warehouse: 0.75,
  bunkhouse: 0.6, lodge: 0.95, rigger: 1.1, machinist: 0.75, sailmaker: 1.25, drydock: 0.9, shipyard: 1.6,
};
export function visualTop(id: string, s: GameState): number {
  const d = BUILDINGS[id];
  if (id === 'stall' && s.tech['shopfront']) return d.y - 0.95;
  return d.y - (LIFT[id] ?? 0.6);
}

function groundShadow(ctx: Ctx, d: BDef): void {
  rr(ctx, d.x + 0.12, d.y + d.h - 0.35, d.w - 0.05, 0.42, 0.15);
  ctx.fillStyle = 'rgba(30,25,60,0.22)'; ctx.fill();
}

type Mat = 'plank' | 'log' | 'stone' | 'metal' | 'plaster';
function wall(ctx: Ctx, f: Frame, col: string, mat: Mat): void {
  const { x0, x1, yb, wt } = f;
  ctx.beginPath(); ctx.rect(x0, wt, x1 - x0, yb - wt);
  ctx.fillStyle = col; ctx.fill();
  ctx.save(); ctx.clip();
  const dk = shade(col, -0.22), lt = shade(col, 0.18);
  switch (mat) {
    case 'plank':
      for (let x = x0 + 0.17; x < x1; x += 0.17) line(ctx, x, wt, x, yb, dk, 0.025);
      break;
    case 'log':
      for (let y = wt + 0.16; y < yb; y += 0.16) { line(ctx, x0, y, x1, y, dk, 0.03); line(ctx, x0, y - 0.13, x1, y - 0.13, lt, 0.02); }
      break;
    case 'stone': {
      let r = 0;
      for (let y = wt; y < yb; y += 0.2, r++) {
        line(ctx, x0, y, x1, y, lt, 0.025);
        for (let x = x0 + (r % 2 ? 0.15 : 0); x < x1; x += 0.3) line(ctx, x, y, x, y + 0.2, lt, 0.025);
      }
      break;
    }
    case 'metal':
      for (let x = x0 + 0.06; x < x1; x += 0.1) { line(ctx, x, wt, x, yb, dk, 0.025); line(ctx, x + 0.03, wt, x + 0.03, yb, lt, 0.015); }
      break;
    case 'plaster':
      ctx.fillStyle = '#6a442c';
      ctx.fillRect(x0, wt, 0.07, yb - wt); ctx.fillRect(x1 - 0.07, wt, 0.07, yb - wt);
      ctx.fillRect(x0, wt, x1 - x0, 0.07);
      ctx.fillRect((x0 + x1) / 2 - 0.035, wt, 0.07, yb - wt);
      break;
  }
  // grounding shade at the base
  ctx.fillStyle = 'rgba(30,20,40,0.25)'; ctx.fillRect(x0, yb - 0.06, x1 - x0, 0.06);
  ctx.restore();
  ctx.beginPath(); ctx.rect(x0, wt, x1 - x0, yb - wt); ctx.strokeStyle = OUT; ctx.lineWidth = LW; ctx.stroke();
}

type RoofStyle = 'shingle' | 'metal' | 'slate' | 'thatch';
function roof(ctx: Ctx, f: Frame, col: string, style: RoofStyle, oh = 0.08): void {
  const x0 = f.x0 - oh, x1 = f.x1 + oh, rt = f.rt, yb = f.wt + 0.06;
  const ridge = rt + (yb - rt) * 0.32;
  // back slope (lit) and front slope
  poly(ctx, [x0 + 0.06, rt, x1 - 0.06, rt, x1, ridge, x0, ridge]);
  ctx.fillStyle = shade(col, 0.2); ctx.fill();
  poly(ctx, [x0, ridge, x1, ridge, x1 + 0.03, yb, x0 - 0.03, yb]);
  ctx.fillStyle = col; ctx.fill();
  ctx.save();
  poly(ctx, [x0 + 0.06, rt, x1 - 0.06, rt, x1, ridge, x1 + 0.03, yb, x0 - 0.03, yb, x0, ridge]);
  ctx.clip();
  const dk = shade(col, -0.25), lt = shade(col, 0.3);
  if (style === 'shingle' || style === 'slate' || style === 'thatch') {
    const step = style === 'thatch' ? 0.11 : 0.15;
    let r = 0;
    for (let y = ridge + step; y < yb; y += step, r++) {
      line(ctx, x0 - 0.1, y, x1 + 0.1, y, dk, 0.025);
      if (style !== 'thatch') for (let x = x0 + (r % 2 ? 0.1 : 0.2); x < x1; x += 0.2) line(ctx, x, y - step, x, y, dk, 0.02);
      else for (let x = x0 + (r % 2 ? 0.05 : 0.1); x < x1; x += 0.1) line(ctx, x, y - step + 0.02, x + 0.02, y, lt, 0.015);
    }
    for (let y = rt + 0.12; y < ridge; y += 0.12) line(ctx, x0, y, x1, y, shade(col, 0.05), 0.02);
  } else {
    for (let x = x0 + 0.1; x < x1; x += 0.14) { line(ctx, x, rt, x, yb, dk, 0.025); line(ctx, x + 0.04, rt, x + 0.04, yb, lt, 0.015); }
  }
  ctx.restore();
  line(ctx, x0, ridge, x1, ridge, shade(col, 0.45), 0.05);
  poly(ctx, [x0 + 0.06, rt, x1 - 0.06, rt, x1, ridge, x1 + 0.03, yb, x0 - 0.03, yb, x0, ridge]);
  ctx.strokeStyle = OUT; ctx.lineWidth = LW; ctx.stroke();
  // eave fascia
  ctx.fillStyle = shade(col, -0.4); ctx.fillRect(x0 - 0.03, yb - 0.035, x1 - x0 + 0.06, 0.05);
}

function door(ctx: Ctx, cx: number, yb: number, w: number, h: number, col = '#6a442c', arch = true): void {
  ctx.beginPath();
  ctx.moveTo(cx - w / 2, yb);
  ctx.lineTo(cx - w / 2, yb - h + (arch ? w / 2 : 0));
  if (arch) ctx.arc(cx, yb - h + w / 2, w / 2, Math.PI, 0); else ctx.lineTo(cx + w / 2, yb - h);
  ctx.lineTo(cx + w / 2, yb);
  ctx.closePath();
  fs(ctx, col);
  line(ctx, cx, yb - h + 0.08, cx, yb, shade(col, -0.3), 0.025);
  ell(ctx, cx + w * 0.3, yb - h * 0.45, 0.025, 0.025); ctx.fillStyle = '#e6c46a'; ctx.fill();
}

function win(ctx: Ctx, cx: number, cy: number, w: number, h: number, lit = true, round = false): void {
  if (round) ell(ctx, cx, cy, w / 2, h / 2); else rr(ctx, cx - w / 2, cy - h / 2, w, h, 0.03);
  fs(ctx, lit ? '#ffd27a' : '#46405e');
  ctx.strokeStyle = shade('#6a442c', 0); ctx.lineWidth = 0.025;
  ctx.beginPath(); ctx.moveTo(cx, cy - h / 2); ctx.lineTo(cx, cy + h / 2); ctx.moveTo(cx - w / 2, cy); ctx.lineTo(cx + w / 2, cy); ctx.stroke();
  if (lit) { ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.fillRect(cx - w / 2 + 0.03, cy - h / 2 + 0.03, w * 0.18, h * 0.3); }
}

function chimney(ctx: Ctx, x: number, yTop: number, yBot: number, w: number, col: string): void {
  ctx.beginPath(); ctx.rect(x - w / 2, yTop, w, yBot - yTop); fs(ctx, col);
  for (let y = yTop + 0.12; y < yBot; y += 0.12) line(ctx, x - w / 2, y, x + w / 2, y, shade(col, -0.25), 0.02);
  rr(ctx, x - w / 2 - 0.04, yTop - 0.06, w + 0.08, 0.09, 0.02); fs(ctx, shade(col, -0.2));
}

function puffs(ctx: Ctx, x: number, y: number, t: number, col: string, n: number, amp: number, seed: number): void {
  for (let i = 0; i < n; i++) {
    const p = (t * 0.45 + i / n + seed) % 1;
    const px = x + Math.sin(p * 5 + seed * 7) * 0.12 + p * 0.25, py = y - p * 1.1;
    const r = 0.09 + p * 0.2;
    ell(ctx, px, py, r, r * 0.85);
    ctx.fillStyle = rgba(col, amp * (1 - p) * Math.min(1, p * 5));
    ctx.fill();
  }
}

// hanging shop sign showing the building's product
function sign(ctx: Ctx, x: number, y: number, item: string): void {
  line(ctx, x - 0.12, y - 0.24, x - 0.12, y - 0.16, OUT, 0.025);
  line(ctx, x + 0.12, y - 0.24, x + 0.12, y - 0.16, OUT, 0.025);
  rr(ctx, x - 0.2, y - 0.17, 0.4, 0.34, 0.06); fs(ctx, '#e9d9b4');
  drawItem(ctx, item, x, y, 0.12);
}

export function lantern(ctx: Ctx, x: number, y: number): void {
  line(ctx, x, y - 0.12, x, y - 0.06, OUT, 0.025);
  rr(ctx, x - 0.055, y - 0.07, 0.11, 0.15, 0.03); fs(ctx, '#ffcf6a', 0.03);
  ctx.fillStyle = '#b8862e'; ctx.fillRect(x - 0.07, y - 0.08, 0.14, 0.035); ctx.fillRect(x - 0.06, y + 0.07, 0.12, 0.03);
}

function crate(ctx: Ctx, x: number, y: number, s: number, col = '#b88a55'): void {
  rr(ctx, x, y, s, s * 0.85, 0.02); fs(ctx, col);
  ctx.strokeStyle = shade(col, -0.3); ctx.lineWidth = 0.025;
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + s, y + s * 0.85); ctx.moveTo(x + s, y); ctx.lineTo(x, y + s * 0.85); ctx.stroke();
}

// wooden deck over space for drydock & shipyard
function platform(ctx: Ctx, d: BDef, frac = 1): void {
  const x0 = d.x, x1 = d.x + d.w, y0 = d.y, y1 = d.y + d.h;
  // posts into the void
  for (const px of [x0 + 0.2, x1 - 0.3, (x0 + x1) / 2 - 0.05]) {
    const g = ctx.createLinearGradient(0, y1, 0, y1 + 1.2);
    g.addColorStop(0, '#4a2f20'); g.addColorStop(1, 'rgba(74,47,32,0)');
    ctx.fillStyle = g; ctx.fillRect(px, y1, 0.1, 1.2);
  }
  // beams frame
  ctx.beginPath(); ctx.rect(x0 + 0.05, y0, x1 - x0 - 0.1, y1 - y0);
  ctx.strokeStyle = OUT; ctx.lineWidth = 0.14; ctx.stroke();
  ctx.strokeStyle = '#5e3c27'; ctx.lineWidth = 0.08; ctx.stroke();
  const rows = Math.round((y1 - y0) * 4 * frac);
  for (let i = 0; i < rows; i++) {
    const py = y0 + i * 0.25;
    ctx.fillStyle = ['#9a6a45', '#a6744c', '#8f603d'][(hash2(d.x, i, 4) * 3) | 0];
    ctx.fillRect(x0 + 0.05, py, x1 - x0 - 0.1, 0.25);
    line(ctx, x0 + 0.05, py, x1 - 0.05, py, 'rgba(60,35,25,0.6)', 0.025);
  }
  if (frac >= 1) {
    ctx.fillStyle = '#5e3c27'; ctx.fillRect(x0 + 0.05, y1, x1 - x0 - 0.1, 0.18);
    line(ctx, x0 + 0.05, y1 + 0.18, x1 - 0.05, y1 + 0.18, OUT, 0.05);
    ctx.fillStyle = '#d6aa52'; ctx.fillRect(x0 + 0.05, y1 - 0.06, x1 - x0 - 0.1, 0.06);
  }
}

// ---------------------------------------------------------------------------------------------------------

export function drawBuilding(ctx: Ctx, id: string, s: GameState, t: number): void {
  const d = BUILDINGS[id];
  if (!d) return;
  const ws = s.workshops[id];
  const busy = !!ws?.busy;
  ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  if (d.kind !== 'drydock' && d.kind !== 'shipyard' && d.kind !== 'board') groundShadow(ctx, d);
  switch (id) {
    case 'smelter': return smelter(ctx, d, busy, t);
    case 'loom': return loom(ctx, d, busy, t);
    case 'galley': return galley(ctx, d, busy, t);
    case 'cutter': return cutter(ctx, d, busy, t);
    case 'tinker': return tinker(ctx, d, busy, t);
    case 'warehouse': return warehouse(ctx, d, s);
    case 'bunkhouse': return bunkhouse(ctx, d);
    case 'lodge': return lodge(ctx, d);
    case 'rigger': return rigger(ctx, d, busy, t);
    case 'machinist': return machinist(ctx, d, busy, t);
    case 'sailmaker': return sailmaker(ctx, d, busy, t);
    case 'stall': return s.tech['shopfront'] ? shopfront(ctx, d, s, t) : stall(ctx, d, s);
    case 'board': return board(ctx, d, t);
    case 'drydock': return drydock(ctx, d, s, t);
    case 'shipyard': return shipyard(ctx, d, s, t);
    default: {
      const f = frameOf(d, 0.5, 0.9);
      wall(ctx, f, '#a8774d', 'plank'); roof(ctx, f, '#6a5a7a', 'shingle');
    }
  }
}

function smelter(ctx: Ctx, d: BDef, busy: boolean, t: number): void {
  const f = frameOf(d, 0.45, 0.95);
  // big brick stack at the back right
  chimney(ctx, f.x1 - 0.32, d.y - 1.15, f.wt, 0.3, '#9a5a44');
  wall(ctx, f, '#8a8fa6', 'stone');
  roof(ctx, f, '#4f5674', 'slate');
  // re-draw stack top over the roof
  chimney(ctx, f.x1 - 0.32, d.y - 1.15, d.y - 0.2, 0.3, '#9a5a44');
  // furnace mouth
  const mx = f.cx - 0.15, my = f.yb;
  ctx.beginPath(); ctx.moveTo(mx - 0.3, my); ctx.lineTo(mx - 0.3, my - 0.4); ctx.arc(mx, my - 0.4, 0.3, Math.PI, 0); ctx.lineTo(mx + 0.3, my); ctx.closePath();
  fs(ctx, '#3a3348');
  ctx.beginPath(); ctx.moveTo(mx - 0.22, my); ctx.lineTo(mx - 0.22, my - 0.38); ctx.arc(mx, my - 0.38, 0.22, Math.PI, 0); ctx.lineTo(mx + 0.22, my); ctx.closePath();
  if (busy) {
    const fl = 0.8 + 0.2 * Math.sin(t * 13) * Math.sin(t * 7.3);
    const g = ctx.createLinearGradient(0, my - 0.6, 0, my);
    g.addColorStop(0, '#ff7a2a'); g.addColorStop(1, `rgba(255,${(220 * fl) | 0},110,1)`);
    ctx.fillStyle = g; ctx.fill();
    for (let i = 0; i < 3; i++) {
      const p = (t * 1.6 + i / 3) % 1;
      ell(ctx, mx - 0.1 + i * 0.1, my - 0.05 - p * 0.3, 0.06 * (1 - p), 0.09 * (1 - p)); ctx.fillStyle = '#fff2b0'; ctx.fill();
    }
  } else { ctx.fillStyle = '#241e30'; ctx.fill(); ell(ctx, mx, my - 0.08, 0.14, 0.05); ctx.fillStyle = '#6a3a2a'; ctx.fill(); }
  // brass ladle / crucible on the side
  rr(ctx, f.x1 - 0.42, f.yb - 0.32, 0.26, 0.24, 0.05); fs(ctx, '#c9a14a');
  sign(ctx, f.x0 + 0.25, f.wt + 0.32, 'ingot');
  if (busy) puffs(ctx, f.x1 - 0.32, d.y - 1.25, t, '#c8c4d4', 4, 0.7, 0.1);
}

function loom(ctx: Ctx, d: BDef, busy: boolean, t: number): void {
  const f = frameOf(d, 0.45, 0.95);
  wall(ctx, f, '#b07a4e', 'plank');
  roof(ctx, f, '#5d8f6c', 'thatch');
  // open front showing the loom
  const ox0 = f.x0 + 0.42, ox1 = f.x1 - 0.12, oy0 = f.wt + 0.12;
  rr(ctx, ox0, oy0, ox1 - ox0, f.yb - oy0, 0.04); fs(ctx, '#3e2e3a');
  // loom frame + glowing threads
  ctx.beginPath(); ctx.rect(ox0 + 0.1, oy0 + 0.1, ox1 - ox0 - 0.2, f.yb - oy0 - 0.18); ctx.strokeStyle = '#c4935f'; ctx.lineWidth = 0.05; ctx.stroke();
  for (let x = ox0 + 0.16; x < ox1 - 0.12; x += 0.07) line(ctx, x, oy0 + 0.12, x, f.yb - 0.1, '#7fe0a8', 0.018);
  // woven cloth growing at the bottom
  ctx.fillStyle = '#f2e6c8'; ctx.fillRect(ox0 + 0.12, f.yb - 0.3, ox1 - ox0 - 0.24, 0.2);
  const sx = busy ? ox0 + 0.2 + (Math.sin(t * 4) * 0.5 + 0.5) * (ox1 - ox0 - 0.45) : ox0 + 0.2;
  rr(ctx, sx, f.yb - 0.4, 0.14, 0.07, 0.03); fs(ctx, '#e6c46a', 0.025);
  // a spool + window on the left
  win(ctx, f.x0 + 0.22, f.wt + 0.32, 0.22, 0.22, true, true);
  ell(ctx, f.x0 + 0.2, f.yb - 0.14, 0.11, 0.09); fs(ctx, '#7fe0a8');
  sign(ctx, f.cx, f.rt + 0.05, 'sailcloth');
}

function galley(ctx: Ctx, d: BDef, busy: boolean, t: number): void {
  const f = frameOf(d, 0.4, 0.95);
  chimney(ctx, f.x0 + 0.4, d.y - 0.75, f.wt, 0.14, '#5a5a6e');
  wall(ctx, f, '#eadfc4', 'plaster');
  roof(ctx, f, '#b04d34', 'shingle');
  // stovepipe over roof
  ctx.beginPath(); ctx.rect(f.x0 + 0.33, d.y - 0.75, 0.14, 0.5); fs(ctx, '#5a5a6e');
  rr(ctx, f.x0 + 0.28, d.y - 0.82, 0.24, 0.08, 0.02); fs(ctx, '#3f3f52');
  puffs(ctx, f.x0 + 0.4, d.y - 0.85, t * (busy ? 1.2 : 0.6), '#ffffff', busy ? 5 : 2, busy ? 0.75 : 0.35, 0.4);
  door(ctx, f.cx + 0.35, f.yb, 0.32, 0.6, '#7a4a2e');
  win(ctx, f.cx - 0.45, f.wt + 0.42, 0.32, 0.32, true, true);
  // window box with moss
  rr(ctx, f.cx - 0.62, f.wt + 0.6, 0.34, 0.08, 0.02); fs(ctx, '#7a4a2e', 0.03);
  ell(ctx, f.cx - 0.45, f.wt + 0.6, 0.15, 0.05); ctx.fillStyle = '#7fe0a8'; ctx.fill();
  sign(ctx, f.cx + 0.35, f.wt + 0.05, 'ration');
}

function cutter(ctx: Ctx, d: BDef, busy: boolean, t: number): void {
  const f = frameOf(d, 0.4, 0.95);
  wall(ctx, f, '#545780', 'stone');
  roof(ctx, f, '#3e3d63', 'metal');
  // crystal skylight dome
  const dx = f.cx, dy = d.y + 0.15;
  ctx.beginPath(); ctx.ellipse(dx, dy, 0.48, 0.42, 0, Math.PI, 0); ctx.closePath();
  const g = ctx.createLinearGradient(0, dy - 0.4, 0, dy);
  g.addColorStop(0, '#e4d6ff'); g.addColorStop(1, '#8f6fd8');
  fs(ctx, g);
  line(ctx, dx, dy - 0.42, dx, dy, '#5a4a8a', 0.03);
  ctx.beginPath(); ctx.ellipse(dx, dy, 0.48, 0.2, 0, Math.PI, 0); ctx.strokeStyle = '#5a4a8a'; ctx.lineWidth = 0.03; ctx.stroke();
  // big lens on the front
  const lx = f.cx - 0.25, ly = f.wt + 0.48;
  ell(ctx, lx, ly, 0.27, 0.27); fs(ctx, '#c9a14a');
  ell(ctx, lx, ly, 0.19, 0.19); fs(ctx, '#b590ff', 0.03);
  if (busy) {
    const a = t * 3;
    for (let i = 0; i < 4; i++) {
      const aa = a + (i * Math.PI) / 2;
      star4(ctx, lx + Math.cos(aa) * 0.3, ly + Math.sin(aa) * 0.3, 0.07, '#ffffff');
    }
    ell(ctx, lx, ly, 0.08, 0.08); ctx.fillStyle = '#ffffff'; ctx.fill();
  } else { ell(ctx, lx - 0.05, ly - 0.06, 0.06, 0.04); ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fill(); }
  door(ctx, f.x1 - 0.35, f.yb, 0.32, 0.6, '#3e3350');
  sign(ctx, f.x1 - 0.35, f.wt + 0.02, 'fuelcell');
}

function tinker(ctx: Ctx, d: BDef, busy: boolean, t: number): void {
  const x0 = d.x + 0.1, x1 = d.x + d.w - 0.1, top = d.y - 0.3, yb = d.y + d.h - 0.08;
  // back pegboard wall
  ctx.beginPath(); ctx.rect(x0 + 0.05, top + 0.25, x1 - x0 - 0.1, 0.85); fs(ctx, '#c49a68');
  ctx.fillStyle = '#8a6440';
  for (let x = x0 + 0.15; x < x1 - 0.1; x += 0.12) for (let y = top + 0.35; y < top + 1.05; y += 0.12) ctx.fillRect(x, y, 0.025, 0.025);
  // hanging tools
  line(ctx, x0 + 0.35, top + 0.4, x0 + 0.35, top + 0.8, '#7f8ea8', 0.06);
  ell(ctx, x0 + 0.35, top + 0.4, 0.07, 0.07); ctx.strokeStyle = '#7f8ea8'; ctx.lineWidth = 0.045; ctx.stroke();
  line(ctx, x0 + 0.65, top + 0.38, x0 + 0.65, top + 0.85, '#8a5a36', 0.05);
  rr(ctx, x0 + 0.56, top + 0.36, 0.18, 0.09, 0.02); fs(ctx, '#7f8ea8', 0.025);
  line(ctx, x0 + 0.95, top + 0.4, x0 + 1.05, top + 0.8, '#c97b4a', 0.05);
  // awning posts
  line(ctx, x0 + 0.04, top + 0.3, x0 + 0.04, yb, OUT, 0.1); line(ctx, x0 + 0.04, top + 0.3, x0 + 0.04, yb, '#7a5634', 0.05);
  line(ctx, x1 - 0.04, top + 0.3, x1 - 0.04, yb, OUT, 0.1); line(ctx, x1 - 0.04, top + 0.3, x1 - 0.04, yb, '#7a5634', 0.05);
  // striped awning
  const ay = top - 0.05;
  poly(ctx, [x0 - 0.08, ay + 0.45, x0 + 0.05, ay, x1 - 0.05, ay, x1 + 0.08, ay + 0.45]);
  ctx.fillStyle = '#f3efe6'; ctx.fill();
  ctx.save(); ctx.clip();
  ctx.fillStyle = '#3fa7b8';
  for (let x = x0 - 0.1; x < x1 + 0.1; x += 0.3) { poly(ctx, [x, ay + 0.5, x + 0.05, ay, x + 0.2, ay, x + 0.15, ay + 0.5]); ctx.fill(); }
  ctx.restore();
  poly(ctx, [x0 - 0.08, ay + 0.45, x0 + 0.05, ay, x1 - 0.05, ay, x1 + 0.08, ay + 0.45]); ctx.strokeStyle = OUT; ctx.lineWidth = LW; ctx.stroke();
  // scalloped edge
  for (let x = x0 - 0.08; x < x1 + 0.05; x += 0.15) { ctx.beginPath(); ctx.arc(x + 0.075, ay + 0.45, 0.075, 0, Math.PI); fs(ctx, (Math.round((x - x0) / 0.15) % 2) ? '#3fa7b8' : '#f3efe6', 0.03); }
  // workbench
  const by = yb - 0.45;
  rr(ctx, x0 + 0.15, by, x1 - x0 - 0.3, 0.16, 0.03); fs(ctx, '#9a6a45');
  ctx.beginPath(); ctx.rect(x0 + 0.2, by + 0.16, x1 - x0 - 0.4, 0.29); fs(ctx, '#7a5634');
  line(ctx, x0 + 0.2, by + 0.3, x1 - 0.2, by + 0.3, '#5a3a26', 0.03);
  // vise + work
  rr(ctx, x1 - 0.55, by - 0.14, 0.2, 0.15, 0.03); fs(ctx, '#7f8ea8');
  drawItem(ctx, 'scrap', x0 + 0.55, by - 0.05, 0.11);
  // hammer
  const ha = busy ? Math.sin(t * 9) * 0.6 : 0.4;
  ctx.save(); ctx.translate(x1 - 0.45, by - 0.25); ctx.rotate(-0.6 + ha);
  line(ctx, 0, 0, 0, -0.3, OUT, 0.08); line(ctx, 0, 0, 0, -0.3, '#a87a4c', 0.04);
  rr(ctx, -0.08, -0.36, 0.16, 0.08, 0.02); fs(ctx, '#7f8ea8', 0.03);
  ctx.restore();
  if (busy && Math.sin(t * 9) > 0.6) for (let i = 0; i < 3; i++) star4(ctx, x1 - 0.45 + (i - 1) * 0.1, by - 0.1 - i * 0.05, 0.07, '#ffd76a');
  sign(ctx, x0 + 0.25, ay + 0.65, 'tools');
}

function warehouse(ctx: Ctx, d: BDef, s: GameState): void {
  const f = frameOf(d, 0.55, 1.05);
  wall(ctx, f, '#8f4a35', 'plank');
  // gambrel roof: two-tone
  roof(ctx, f, '#5d4f68', 'metal', 0.1);
  // hoist beam
  ctx.beginPath(); ctx.rect(f.cx - 0.18, d.y - 0.75, 0.36, 0.32); fs(ctx, '#8f4a35');
  poly(ctx, [f.cx - 0.26, d.y - 0.75, f.cx, d.y - 0.95, f.cx + 0.26, d.y - 0.75]); fs(ctx, '#5d4f68');
  line(ctx, f.cx, d.y - 0.5, f.cx, d.y - 0.2, OUT, 0.03);
  // big double doors with X bracing
  const dw = 0.9, dh = 0.82, dx = f.cx - dw / 2, dy = f.yb - dh;
  ctx.beginPath(); ctx.rect(dx, dy, dw, dh); fs(ctx, '#f0e6d2');
  ctx.beginPath(); ctx.rect(dx + 0.06, dy + 0.06, dw / 2 - 0.09, dh - 0.06); ctx.rect(dx + dw / 2 + 0.03, dy + 0.06, dw / 2 - 0.09, dh - 0.06);
  ctx.fillStyle = '#a5563e'; ctx.fill();
  ctx.strokeStyle = '#f0e6d2'; ctx.lineWidth = 0.05;
  ctx.beginPath();
  ctx.moveTo(dx + 0.06, dy + 0.06); ctx.lineTo(dx + dw / 2 - 0.03, f.yb); ctx.moveTo(dx + dw / 2 - 0.03, dy + 0.06); ctx.lineTo(dx + 0.06, f.yb);
  ctx.moveTo(dx + dw / 2 + 0.03, dy + 0.06); ctx.lineTo(dx + dw - 0.06, f.yb); ctx.moveTo(dx + dw - 0.06, dy + 0.06); ctx.lineTo(dx + dw / 2 + 0.03, f.yb);
  ctx.stroke();
  // windows
  win(ctx, f.x0 + 0.38, f.wt + 0.35, 0.3, 0.24, true);
  win(ctx, f.x1 - 0.38, f.wt + 0.35, 0.3, 0.24, true);
  // stock crates outside, more as the warehouse fills
  let total = 0; for (const k in s.warehouse) total += s.warehouse[k];
  const n = total <= 0 ? 0 : Math.min(4, 1 + Math.floor(Math.log10(total + 1) * 1.3));
  const cpos = [[f.x0 + 0.02, f.yb - 0.28], [f.x0 + 0.28, f.yb - 0.24], [f.x0 + 0.12, f.yb - 0.5], [f.x1 - 0.32, f.yb - 0.26]];
  for (let i = 0; i < n; i++) crate(ctx, cpos[i][0], cpos[i][1], 0.28);
  lantern(ctx, dx - 0.12, dy + 0.12);
}

function bunkhouse(ctx: Ctx, d: BDef): void {
  const f = frameOf(d, 0.35, 0.95);
  wall(ctx, f, '#9a6b45', 'log');
  roof(ctx, f, '#4f7a5a', 'shingle');
  door(ctx, f.cx + 0.4, f.yb, 0.32, 0.62, '#5a3a26');
  win(ctx, f.x0 + 0.3, f.wt + 0.42, 0.26, 0.24);
  win(ctx, f.cx - 0.12, f.wt + 0.42, 0.26, 0.24);
  // hard-hat sign
  const sx = f.cx + 0.4, sy = f.wt + 0.02;
  line(ctx, sx - 0.12, sy - 0.24, sx - 0.12, sy - 0.16, OUT, 0.025); line(ctx, sx + 0.12, sy - 0.24, sx + 0.12, sy - 0.16, OUT, 0.025);
  rr(ctx, sx - 0.2, sy - 0.17, 0.4, 0.3, 0.06); fs(ctx, '#e9d9b4');
  ctx.beginPath(); ctx.arc(sx, sy + 0.05, 0.12, Math.PI, 0); ctx.closePath(); fs(ctx, '#f2c14e', 0.03);
  ctx.fillStyle = '#c99a2e'; ctx.fillRect(sx - 0.15, sy + 0.04, 0.3, 0.04);
  lantern(ctx, f.x1 - 0.08, f.wt + 0.2);
}

function lodge(ctx: Ctx, d: BDef): void {
  const f = frameOf(d, 0.2, 0.75);
  wall(ctx, f, '#c49a68', 'plank');
  // steep A-frame roof
  const apex = d.y - 0.95;
  poly(ctx, [f.x0 - 0.12, f.wt + 0.08, f.cx, apex, f.x1 + 0.12, f.wt + 0.08]);
  fs(ctx, '#4f6b8a');
  ctx.save(); poly(ctx, [f.x0 - 0.12, f.wt + 0.08, f.cx, apex, f.x1 + 0.12, f.wt + 0.08]); ctx.clip();
  for (let y = apex + 0.15; y < f.wt + 0.1; y += 0.15) line(ctx, f.x0 - 0.2, y, f.x1 + 0.2, y, shade('#4f6b8a', -0.25), 0.025);
  poly(ctx, [f.cx, apex, f.x1 + 0.2, f.wt + 0.1, f.x1 + 0.2, apex]); ctx.fillStyle = 'rgba(20,20,50,0.18)'; ctx.fill();
  ctx.restore();
  // gable triangle window
  poly(ctx, [f.cx - 0.38, f.wt - 0.05, f.cx, apex + 0.35, f.cx + 0.38, f.wt - 0.05]); fs(ctx, '#e9d9b4');
  ell(ctx, f.cx, f.wt - 0.28, 0.12, 0.12); fs(ctx, '#ffd27a', 0.03);
  // porch with wide door
  door(ctx, f.cx, f.yb, 0.4, 0.58, '#5a3a26', false);
  rr(ctx, f.x0 - 0.05, f.yb - 0.05, f.x1 - f.x0 + 0.1, 0.1, 0.02); fs(ctx, '#7a5634', 0.03);
  // crate-pack sign
  crate(ctx, f.x0 + 0.08, f.yb - 0.3, 0.26);
  crate(ctx, f.x1 - 0.36, f.yb - 0.32, 0.28, '#a87a4c');
  lantern(ctx, f.cx - 0.3, f.wt + 0.18);
  lantern(ctx, f.cx + 0.3, f.wt + 0.18);
}

function rigger(ctx: Ctx, d: BDef, busy: boolean, t: number): void {
  const f = frameOf(d, 0.4, 0.95);
  // practice mast with lines behind the shop
  const mx = f.x0 + 0.25;
  line(ctx, mx, f.wt, mx, d.y - 1.1, OUT, 0.12); line(ctx, mx, f.wt, mx, d.y - 1.1, '#a87a4c', 0.06);
  line(ctx, mx - 0.3, d.y - 0.8, mx + 0.3, d.y - 0.8, OUT, 0.08); line(ctx, mx - 0.3, d.y - 0.8, mx + 0.3, d.y - 0.8, '#a87a4c', 0.04);
  ctx.strokeStyle = '#d9c08a'; ctx.lineWidth = 0.025;
  ctx.beginPath(); ctx.moveTo(mx, d.y - 1.1); ctx.lineTo(f.x1, f.rt + 0.2); ctx.moveTo(mx - 0.3, d.y - 0.8); ctx.lineTo(f.x0 - 0.1, f.wt); ctx.stroke();
  wall(ctx, f, '#3f7f8a', 'plank');
  roof(ctx, f, '#c9a46a', 'shingle');
  door(ctx, f.cx + 0.3, f.yb, 0.34, 0.62, '#5a3a26');
  // big rope spool on the front
  const sx = f.x0 + 0.38, sy = f.yb - 0.25;
  ctx.save(); ctx.translate(sx, sy); ctx.rotate(busy ? t * 2.5 : 0);
  ell(ctx, 0, 0, 0.24, 0.24); fs(ctx, '#d9c08a');
  ctx.strokeStyle = '#a8905a'; ctx.lineWidth = 0.025; ell(ctx, 0, 0, 0.16, 0.16); ctx.stroke();
  line(ctx, -0.24, 0, 0.24, 0, '#7a5634', 0.04); line(ctx, 0, -0.24, 0, 0.24, '#7a5634', 0.04);
  ctx.restore();
  ell(ctx, sx, sy, 0.06, 0.06); fs(ctx, '#7a5634', 0.03);
  sign(ctx, f.cx + 0.3, f.wt + 0.04, 'rigging');
}

function gear(ctx: Ctx, x: number, y: number, r: number, a: number, col: string): void {
  ctx.save(); ctx.translate(x, y); ctx.rotate(a);
  ctx.beginPath();
  const n = 8;
  for (let i = 0; i < n * 2; i++) {
    const aa = (i / (n * 2)) * Math.PI * 2, rad = i % 2 ? r * 0.74 : r;
    ctx.lineTo(Math.cos(aa) * rad, Math.sin(aa) * rad);
    ctx.lineTo(Math.cos(aa + Math.PI / (n * 2)) * rad, Math.sin(aa + Math.PI / (n * 2)) * rad);
  }
  ctx.closePath(); fs(ctx, col);
  ell(ctx, 0, 0, r * 0.32, r * 0.32); fs(ctx, '#3a3550', 0.03);
  ctx.restore();
}

function machinist(ctx: Ctx, d: BDef, busy: boolean, t: number): void {
  const f = frameOf(d, 0.4, 1.0);
  wall(ctx, f, '#7f8ea8', 'metal');
  // sawtooth roof
  const n = 3, w = (f.x1 - f.x0 + 0.16) / n, yb = f.wt + 0.06;
  for (let i = 0; i < n; i++) {
    const x = f.x0 - 0.08 + i * w;
    poly(ctx, [x, yb, x, f.rt, x + w, yb - 0.25]); fs(ctx, '#56607a');
    poly(ctx, [x + 0.04, f.rt + 0.12, x + 0.04, yb - 0.12, x + 0.2, yb - 0.17, x + 0.2, f.rt + 0.2]); ctx.fillStyle = '#ffd27a'; ctx.fill();
  }
  ctx.beginPath(); ctx.rect(f.x0 - 0.08, yb - 0.25, f.x1 - f.x0 + 0.16, 0.28); fs(ctx, '#4a536b');
  // exhaust pipe
  line(ctx, f.x1 - 0.2, f.rt + 0.1, f.x1 - 0.2, d.y - 0.85, OUT, 0.16); line(ctx, f.x1 - 0.2, f.rt + 0.1, f.x1 - 0.2, d.y - 0.85, '#9aa3b5', 0.1);
  if (busy) puffs(ctx, f.x1 - 0.2, d.y - 0.9, t, '#9aa3b5', 3, 0.6, 0.7);
  // big gear sign
  gear(ctx, f.x0 + 0.42, f.wt + 0.48, 0.3, busy ? t * 1.5 : 0.2, '#c9a14a');
  gear(ctx, f.x0 + 0.8, f.wt + 0.28, 0.17, busy ? -t * 2.6 : 0, '#9aa3b5');
  // roller door
  const dx = f.x1 - 0.72, dw = 0.56, dh = 0.62;
  ctx.beginPath(); ctx.rect(dx, f.yb - dh, dw, dh); fs(ctx, '#56607a');
  for (let y = f.yb - dh + 0.08; y < f.yb; y += 0.08) line(ctx, dx, y, dx + dw, y, '#3f465a', 0.02);
  if (busy) { ctx.fillStyle = 'rgba(255,210,122,0.85)'; ctx.fillRect(dx + 0.02, f.yb - 0.14, dw - 0.04, 0.12); }
  sign(ctx, dx + dw / 2, f.wt + 0.06, 'engine');
}

function sailmaker(ctx: Ctx, d: BDef, busy: boolean, t: number): void {
  const f = frameOf(d, 0.55, 1.1);
  wall(ctx, f, '#cdb88e', 'plank');
  roof(ctx, f, '#7a4a6a', 'shingle');
  // tall loft gable with a golden solar sail hung out
  const gx = f.cx, gy = d.y - 0.55;
  poly(ctx, [gx - 0.5, gy + 0.5, gx, gy - 0.55, gx + 0.5, gy + 0.5]); fs(ctx, '#cdb88e');
  line(ctx, gx - 0.65, gy - 0.25, gx + 0.65, gy - 0.25, OUT, 0.08); line(ctx, gx - 0.65, gy - 0.25, gx + 0.65, gy - 0.25, '#a87a4c', 0.04);
  const rip = busy ? Math.sin(t * 3) * 0.05 : Math.sin(t * 1.2) * 0.02;
  ctx.beginPath();
  ctx.moveTo(gx - 0.55, gy - 0.22);
  ctx.lineTo(gx + 0.55, gy - 0.22);
  ctx.quadraticCurveTo(gx + 0.6 + rip, f.wt, gx + 0.5, f.wt + 0.45);
  ctx.quadraticCurveTo(gx, f.wt + 0.55 + rip, gx - 0.5, f.wt + 0.45);
  ctx.quadraticCurveTo(gx - 0.6 - rip, f.wt, gx - 0.55, gy - 0.22);
  ctx.closePath();
  const g = ctx.createLinearGradient(0, gy - 0.2, 0, f.wt + 0.5);
  g.addColorStop(0, '#fff3c4'); g.addColorStop(1, '#ffc65a');
  fs(ctx, g);
  ctx.strokeStyle = 'rgba(160,110,30,0.6)'; ctx.lineWidth = 0.025;
  ctx.beginPath(); ctx.moveTo(gx, gy - 0.22); ctx.lineTo(gx, f.wt + 0.5); ctx.moveTo(gx - 0.52, f.wt - 0.1); ctx.lineTo(gx + 0.52, f.wt - 0.1); ctx.stroke();
  door(ctx, f.x0 + 0.32, f.yb, 0.3, 0.45, '#5a3a26');
  win(ctx, f.x1 - 0.3, f.yb - 0.3, 0.24, 0.22);
  sign(ctx, f.x1 - 0.3, f.yb - 0.62, 'solarsail');
}

function stall(ctx: Ctx, d: BDef, s: GameState): void {
  const x0 = d.x + 0.12, x1 = d.x + d.w - 0.12, yb = d.y + d.h - 0.1;
  const top = d.y - 0.45;
  // back crates
  crate(ctx, x0 + 0.1, d.y + 0.05, 0.36);
  crate(ctx, x1 - 0.5, d.y + 0.02, 0.38, '#a87a4c');
  // posts
  for (const px of [x0 + 0.06, x1 - 0.06]) { line(ctx, px, top + 0.3, px, yb, OUT, 0.11); line(ctx, px, top + 0.3, px, yb, '#7a5634', 0.06); }
  // counter
  const cy = yb - 0.55;
  ctx.beginPath(); ctx.rect(x0 + 0.1, cy, x1 - x0 - 0.2, 0.55); fs(ctx, '#a8774d');
  for (let x = x0 + 0.27; x < x1 - 0.15; x += 0.17) line(ctx, x, cy + 0.12, x, yb, shade('#a8774d', -0.22), 0.025);
  rr(ctx, x0 + 0.02, cy - 0.12, x1 - x0 - 0.04, 0.14, 0.03); fs(ctx, '#c9965c');
  ctx.fillStyle = '#d6aa52'; ctx.fillRect(x0 + 0.1, cy + 0.08, x1 - x0 - 0.2, 0.05);
  shelfItems(ctx, s, x0 + 0.25, x1 - 0.25, cy - 0.15, 6, 0.13);
  // striped awning
  const ay = top;
  poly(ctx, [x0 - 0.12, ay + 0.55, x0 + 0.02, ay, x1 - 0.02, ay, x1 + 0.12, ay + 0.55]);
  ctx.fillStyle = '#f3efe6'; ctx.fill();
  ctx.save(); ctx.clip();
  ctx.fillStyle = '#d9483a';
  for (let x = x0 - 0.15; x < x1 + 0.1; x += 0.36) { poly(ctx, [x, ay + 0.6, x + 0.06, ay, x + 0.24, ay, x + 0.18, ay + 0.6]); ctx.fill(); }
  ctx.restore();
  poly(ctx, [x0 - 0.12, ay + 0.55, x0 + 0.02, ay, x1 - 0.02, ay, x1 + 0.12, ay + 0.55]); ctx.strokeStyle = OUT; ctx.lineWidth = LW; ctx.stroke();
  for (let x = x0 - 0.12; x < x1 + 0.1; x += 0.18) { ctx.beginPath(); ctx.arc(x + 0.09, ay + 0.55, 0.09, 0, Math.PI); fs(ctx, (Math.round((x - x0 + 0.12) / 0.18) % 2) ? '#d9483a' : '#f3efe6', 0.03); }
  lantern(ctx, x0 + 0.06, ay + 0.75);
  lantern(ctx, x1 - 0.06, ay + 0.75);
}

function shelfItems(ctx: Ctx, s: GameState, x0: number, x1: number, y: number, max: number, r: number): void {
  const list: string[] = [];
  const ids = Object.keys(s.shelf).filter((k) => s.shelf[k] > 0);
  // round-robin so the display shows variety
  let added = true;
  for (let i = 0; added && list.length < max; i++) {
    added = false;
    for (const k of ids) if (s.shelf[k] > i && list.length < max) { list.push(k); added = true; }
  }
  const n = list.length;
  for (let i = 0; i < n; i++) {
    const x = n === 1 ? (x0 + x1) / 2 : x0 + ((x1 - x0) * i) / (max - 1);
    drawItem(ctx, list[i], x, y, r);
  }
}

function shopfront(ctx: Ctx, d: BDef, s: GameState, t: number): void {
  const f = frameOf(d, 0.55, 1.15);
  wall(ctx, f, '#4f7298', 'plank');
  roof(ctx, f, '#9a4a3a', 'shingle', 0.12);
  // sign board on the roof
  const sy = d.y - 0.65;
  line(ctx, f.cx - 0.6, sy + 0.3, f.cx - 0.6, sy + 0.55, OUT, 0.05);
  line(ctx, f.cx + 0.6, sy + 0.3, f.cx + 0.6, sy + 0.55, OUT, 0.05);
  rr(ctx, f.cx - 0.85, sy - 0.12, 1.7, 0.42, 0.08); fs(ctx, '#2f3a5a');
  rr(ctx, f.cx - 0.78, sy - 0.06, 1.56, 0.3, 0.05); ctx.strokeStyle = '#e6c46a'; ctx.lineWidth = 0.03; ctx.stroke();
  // coin + crescent emblems on the sign
  ell(ctx, f.cx - 0.45, sy + 0.09, 0.1, 0.1); fs(ctx, '#ffd36a', 0.03);
  ctx.beginPath(); ctx.arc(f.cx, sy + 0.09, 0.11, 0, Math.PI * 2); ctx.fillStyle = '#ffe9b0'; ctx.fill();
  ctx.beginPath(); ctx.arc(f.cx + 0.05, sy + 0.06, 0.1, 0, Math.PI * 2); ctx.fillStyle = '#2f3a5a'; ctx.fill();
  ell(ctx, f.cx + 0.45, sy + 0.09, 0.1, 0.1); fs(ctx, '#ffd36a', 0.03);
  // display windows with goods
  const wy = f.wt + 0.18, wh = 0.48;
  for (const [wx0, wx1] of [[f.x0 + 0.12, f.cx - 0.3], [f.cx + 0.3, f.x1 - 0.12]]) {
    rr(ctx, wx0, wy, wx1 - wx0, wh, 0.04); fs(ctx, '#ffe2a0');
    ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.fillRect(wx0 + 0.04, wy + 0.04, 0.08, wh - 0.08);
    ctx.fillStyle = '#8a5a36'; ctx.fillRect(wx0, wy + wh - 0.1, wx1 - wx0, 0.1);
  }
  shelfItems(ctx, s, f.x0 + 0.25, f.x1 - 0.25, wy + wh - 0.17, 8, 0.11);
  // door in the middle
  door(ctx, f.cx, f.yb, 0.42, 0.7, '#6a442c');
  // amber awning strip
  const ay = wy - 0.12;
  poly(ctx, [f.x0 - 0.05, ay + 0.2, f.x0 + 0.02, ay - 0.05, f.x1 - 0.02, ay - 0.05, f.x1 + 0.05, ay + 0.2]);
  ctx.fillStyle = '#e8b33a'; ctx.fill();
  ctx.save(); ctx.clip(); ctx.fillStyle = '#f3efe6';
  for (let x = f.x0; x < f.x1; x += 0.3) ctx.fillRect(x, ay - 0.1, 0.15, 0.4);
  ctx.restore();
  poly(ctx, [f.x0 - 0.05, ay + 0.2, f.x0 + 0.02, ay - 0.05, f.x1 - 0.02, ay - 0.05, f.x1 + 0.05, ay + 0.2]); ctx.strokeStyle = OUT; ctx.lineWidth = LW; ctx.stroke();
  lantern(ctx, f.x0 + 0.02, f.yb - 0.75);
  lantern(ctx, f.x1 - 0.02, f.yb - 0.75);
  // planters
  for (const px of [f.x0 + 0.06, f.x1 - 0.32]) { rr(ctx, px, f.yb - 0.18, 0.26, 0.18, 0.03); fs(ctx, '#8a5a36', 0.03); ell(ctx, px + 0.13, f.yb - 0.2, 0.14, 0.07); ctx.fillStyle = '#7fe0a8'; ctx.fill(); }
  void t;
}

function board(ctx: Ctx, d: BDef, t: number): void {
  const cx = d.x + 0.5, yb = d.y + 0.9;
  ell(ctx, cx, yb, 0.4, 0.1); ctx.fillStyle = 'rgba(30,25,60,0.22)'; ctx.fill();
  for (const px of [cx - 0.33, cx + 0.33]) { line(ctx, px, yb, px, yb - 0.95, OUT, 0.11); line(ctx, px, yb, px, yb - 0.95, '#7a5634', 0.06); }
  rr(ctx, cx - 0.42, yb - 0.95, 0.84, 0.55, 0.04); fs(ctx, '#a8774d');
  poly(ctx, [cx - 0.5, yb - 0.95, cx, yb - 1.12, cx + 0.5, yb - 0.95]); fs(ctx, '#5d4f68');
  // pinned notes
  const notes: [number, number, number, string][] = [[-0.3, -0.88, -0.1, '#f3efe6'], [-0.04, -0.86, 0.08, '#ffe2a0'], [0.18, -0.9, -0.05, '#f3efe6'], [-0.18, -0.65, 0.06, '#d9f2e4']];
  for (const [ox, oy, rot, col] of notes) {
    ctx.save(); ctx.translate(cx + ox + 0.09, yb + oy + 0.11); ctx.rotate(rot);
    ctx.beginPath(); ctx.rect(-0.09, -0.11, 0.18, 0.22); fs(ctx, col, 0.025);
    line(ctx, -0.05, -0.04, 0.05, -0.04, '#8a8299', 0.02); line(ctx, -0.05, 0.02, 0.04, 0.02, '#8a8299', 0.02);
    ell(ctx, 0, -0.09, 0.025, 0.025); ctx.fillStyle = '#d9483a'; ctx.fill();
    ctx.restore();
  }
  void t;
}

function drydock(ctx: Ctx, d: BDef, s: GameState, t: number): void {
  const cx = d.x + d.w / 2, deck = d.y + d.h - 0.45;
  // cradle supports
  for (const ox of [-0.9, 0, 0.9]) {
    poly(ctx, [cx + ox - 0.22, deck + 0.15, cx + ox - 0.08, deck - 0.45, cx + ox + 0.08, deck - 0.45, cx + ox + 0.22, deck + 0.15]);
    fs(ctx, '#7a5634');
  }
  // the hull being repaired (no sails), with fresh patches
  const bob = Math.sin(t * 0.8) * 0.01;
  drawShip(ctx, cx - 0.05, deck - 1.0 + bob, 0.85, SHIP_STYLES[2], t, 1, false);
  rr(ctx, cx - 0.6, deck - 0.75, 0.28, 0.16, 0.02); fs(ctx, '#c4935f', 0.03);
  rr(ctx, cx + 0.25, deck - 0.68, 0.22, 0.14, 0.02); fs(ctx, '#c4935f', 0.03);
  // stub mast
  line(ctx, cx + 0.15, deck - 1.0, cx + 0.15, deck - 2.0, OUT, 0.11); line(ctx, cx + 0.15, deck - 1.0, cx + 0.15, deck - 2.0, '#a87a4c', 0.055);
  // contract pennants on a rope: one per open repair job
  const n = Math.min(3, s.contracts.length);
  line(ctx, d.x + 0.15, d.y + 0.1, d.x + 0.15, d.y - 0.6, OUT, 0.08);
  for (let i = 0; i < n; i++) {
    const py = d.y - 0.55 + i * 0.22, w = Math.sin(t * 3 + i) * 0.03;
    poly(ctx, [d.x + 0.17, py, d.x + 0.47 + w, py + 0.07, d.x + 0.17, py + 0.15]); fs(ctx, ['#e8b33a', '#3fa7b8', '#e2553f'][i], 0.025);
  }
  lantern(ctx, d.x + d.w - 0.2, d.y + 0.15);
}

function shipyard(ctx: Ctx, d: BDef, s: GameState, t: number): void {
  const cx = d.x + d.w / 2, deck = d.y + d.h - 0.5;
  // slipway bed
  rr(ctx, d.x + 0.2, deck - 1.2, d.w - 0.4, 1.55, 0.12); ctx.fillStyle = 'rgba(46,34,56,0.82)'; ctx.fill(); ctx.strokeStyle = OUT; ctx.lineWidth = LW; ctx.stroke();
  // slipway rails
  line(ctx, d.x + 0.2, deck + 0.1, d.x + d.w - 0.2, deck + 0.1, '#c9a14a', 0.05);
  line(ctx, d.x + 0.2, deck + 0.25, d.x + d.w - 0.2, deck + 0.25, '#c9a14a', 0.05);
  const sy = s.shipyard;
  const time = BUILDINGS.shipyard?.shipRecipe?.time ?? 40;
  const f = sy ? clamp(sy.progress / time, 0, 1) : 0;
  drawSkeleton(ctx, cx - 0.05, deck - 0.9, 0.95, sy && (sy.busy || f > 0) ? Math.max(0.12, f) : 0.12, t);
  // gantry crane
  const gx0 = d.x + 0.2, gx1 = d.x + d.w - 0.2, gy = d.y - 1.45;
  for (const gx of [gx0, gx1]) { line(ctx, gx, deck + 0.2, gx, gy, OUT, 0.13); line(ctx, gx, deck + 0.2, gx, gy, '#56607a', 0.07); }
  line(ctx, gx0 - 0.1, gy, gx1 + 0.1, gy, OUT, 0.15); line(ctx, gx0 - 0.1, gy, gx1 + 0.1, gy, '#c9a14a', 0.08);
  // cross bracing
  ctx.strokeStyle = '#56607a'; ctx.lineWidth = 0.03;
  ctx.beginPath();
  for (const gx of [gx0, gx1]) for (let y = gy; y < deck - 0.2; y += 0.5) { ctx.moveTo(gx - 0.07, y); ctx.lineTo(gx + 0.07, y + 0.5); }
  ctx.stroke();
  // trolley + hook
  const tx = cx + Math.sin(t * 0.4) * 0.8;
  rr(ctx, tx - 0.15, gy - 0.05, 0.3, 0.14, 0.03); fs(ctx, '#e8b33a', 0.03);
  line(ctx, tx, gy + 0.09, tx, gy + 0.7, OUT, 0.025);
  ctx.beginPath(); ctx.arc(tx, gy + 0.76, 0.06, 0, Math.PI); ctx.strokeStyle = OUT; ctx.lineWidth = 0.04; ctx.stroke();
  if (sy?.busy) {
    for (let i = 0; i < 3; i++) {
      const p = (t * 2.2 + i / 3) % 1;
      star4(ctx, cx - 0.5 + i * 0.5 + Math.sin(i * 3 + t) * 0.1, deck - 0.6 - p * 0.3, 0.1 * (1 - p), '#bfffee');
    }
  }
  // fleet tally: a tiny pennant per launched ship
  const nf = Math.min(8, s.fleet.length);
  for (let i = 0; i < nf; i++) {
    const px = gx0 + 0.25 + i * 0.28;
    poly(ctx, [px, gy + 0.08, px + 0.18, gy + 0.08, px + 0.09, gy + 0.3]); fs(ctx, SHIP_STYLES[i % SHIP_STYLES.length].sailB, 0.025);
  }
}

// ground-level deck for buildings standing over open space (drawn before y-sorted entities)
export function drawPlatform(ctx: Ctx, id: string, s: GameState): void {
  const d = BUILDINGS[id];
  if (!d || tileAt(d.x, d.y + d.h - 1) !== ' ') return;
  if (s.built[id]) platform(ctx, d, 1);
  else if (s.sites[id]) platform(ctx, d, Math.max(0.25, siteFraction(s, id)));
}

// ---------------------------------------------------------------------------------------------------------
// Construction sites: roped-off plot with scaffolding rising with the poured fraction.

export function siteFraction(s: GameState, id: string): number {
  const site = s.sites[id];
  if (!site) return 0;
  return clamp(site.coins / siteCost(id), 0, 1);
}

export function drawSite(ctx: Ctx, id: string, s: GameState, t: number): void {
  const d = BUILDINGS[id];
  if (!d) return;
  const f = siteFraction(s, id);
  const overSpace = tileAt(d.x, d.y + d.h - 1) === ' ';
  const x0 = d.x + 0.12, x1 = d.x + d.w - 0.12, y0 = d.y + 0.15, y1 = d.y + d.h - 0.12;
  if (!overSpace) {
    // packed foundation
    rr(ctx, x0, y0, x1 - x0, y1 - y0, 0.06); ctx.fillStyle = 'rgba(120,110,140,0.35)'; ctx.fill();
    ctx.setLineDash([0.12, 0.08]); ctx.strokeStyle = 'rgba(80,70,110,0.7)'; ctx.lineWidth = 0.035; ctx.stroke(); ctx.setLineDash([]);
    // stone base course rises first
    if (f > 0.05) { ctx.beginPath(); ctx.rect(x0 + 0.1, y1 - 0.18, x1 - x0 - 0.2, 0.16); fs(ctx, '#9aa0b5', 0.035); }
  }
  // scaffolding
  const H = 0.25 + f * (d.h * 0.55 + 0.8);
  const cols: number[] = [];
  const nC = Math.max(2, Math.round(d.w * 1.5));
  for (let i = 0; i < nC; i++) cols.push(x0 + 0.12 + (i / (nC - 1)) * (x1 - x0 - 0.24));
  const back = y0 + 0.25, front = y1 - 0.05;
  for (const yb of [back, front]) {
    for (const x of cols) { line(ctx, x, yb, x, yb - H, OUT, 0.085); line(ctx, x, yb, x, yb - H, '#c4935f', 0.045); }
    for (let h = 0.4; h <= H; h += 0.4) {
      line(ctx, cols[0] - 0.05, yb - h, cols[cols.length - 1] + 0.05, yb - h, OUT, 0.09);
      line(ctx, cols[0] - 0.05, yb - h, cols[cols.length - 1] + 0.05, yb - h, '#a8774d', 0.05);
    }
    if (yb === front) {
      // diagonal braces
      ctx.strokeStyle = 'rgba(122,86,52,0.9)'; ctx.lineWidth = 0.03;
      ctx.beginPath();
      for (let i = 0; i + 1 < cols.length; i++) { ctx.moveTo(cols[i], yb); ctx.lineTo(cols[i + 1], yb - Math.min(H, 0.8)); }
      ctx.stroke();
    }
  }
  // lumber pile + barrow
  if (!overSpace) {
    for (let i = 0; i < 3; i++) { rr(ctx, x1 - 0.55, y1 - 0.12 - i * 0.07, 0.5, 0.08, 0.02); fs(ctx, ['#c4935f', '#b07a4e', '#c9965c'][i], 0.025); }
  }
  // rope fence with corner posts
  const posts = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
  ctx.strokeStyle = '#e8b33a'; ctx.lineWidth = 0.03;
  for (let i = 0; i < 4; i++) {
    const [ax, ay] = posts[i], [bx, by] = posts[(i + 1) % 4];
    ctx.beginPath(); ctx.moveTo(ax, ay - 0.22); ctx.quadraticCurveTo((ax + bx) / 2, (ay + by) / 2 - 0.1, bx, by - 0.22); ctx.stroke();
  }
  for (const [px, py] of posts) {
    line(ctx, px, py, px, py - 0.3, OUT, 0.09); line(ctx, px, py, px, py - 0.3, '#d9483a', 0.05);
    ell(ctx, px, py - 0.3, 0.04, 0.04); fs(ctx, '#f3efe6', 0.025);
  }
  // a blueprint flag
  const fx = x0 + 0.05, fy = y0 - 0.3, wv = Math.sin(t * 3) * 0.03;
  line(ctx, fx, fy, fx, fy - 0.45, OUT, 0.04);
  poly(ctx, [fx, fy - 0.45, fx + 0.32 + wv, fy - 0.38, fx, fy - 0.28]); fs(ctx, '#3f7fd0', 0.025);
}

// ---------------------------------------------------------------------------------------------------------
// Additive light pass

export function buildingGlow(ctx: Ctx, id: string, s: GameState, t: number): void {
  const d = BUILDINGS[id];
  const ws = s.workshops[id];
  const busy = !!ws?.busy;
  const cx = d.x + d.w / 2;
  const fl = 0.85 + 0.15 * Math.sin(t * 11) * Math.sin(t * 6.1);
  switch (id) {
    case 'smelter': if (busy) glow(ctx, cx - 0.15, d.y + d.h - 0.4, 1.6, '#ff8a3a', 0.5 * fl); break;
    case 'cutter': glow(ctx, cx, d.y + 0.05, busy ? 1.3 : 0.8, '#b48cff', busy ? 0.4 : 0.18); break;
    case 'loom': if (busy) glow(ctx, cx + 0.2, d.y + d.h - 0.5, 0.9, '#7fe0a8', 0.3); break;
    case 'sailmaker': glow(ctx, cx, d.y + 0.3, 1.4, '#ffc65a', busy ? 0.35 : 0.2); break;
    case 'machinist': if (busy) glow(ctx, d.x + d.w - 0.4, d.y + d.h - 0.2, 0.9, '#ffd27a', 0.3); break;
    case 'shipyard': if (s.shipyard?.busy) glow(ctx, cx, d.y + d.h - 1.2, 1.4, '#7ff0d8', 0.25 * fl); break;
    case 'drydock': glow(ctx, cx, d.y + d.h - 1.5, 1.5, '#7ff0d8', 0.12); break;
  }
  // lanterns
  const L = LANTERNS[id]?.(d, s);
  if (L) for (const [lx, ly] of L) glow(ctx, lx, ly, 0.9, '#ffb84a', 0.32 * fl);
  void shipGlow;
}

const LANTERNS: Record<string, (d: BDef, s: GameState) => [number, number][]> = {
  stall: (d, s) => {
    if (s.tech['shopfront']) { const f = frameOf(d, 0.55, 1.15); return [[f.x0 + 0.02, f.yb - 0.75], [f.x1 - 0.02, f.yb - 0.75]]; }
    return [[d.x + 0.18, d.y + 0.3], [d.x + d.w - 0.18, d.y + 0.3]];
  },
  warehouse: (d) => { const f = frameOf(d, 0.55, 1.05); return [[f.cx - 0.57, f.yb - 0.7]]; },
  bunkhouse: (d) => { const f = frameOf(d, 0.35, 0.95); return [[f.x1 - 0.08, f.wt + 0.2]]; },
  lodge: (d) => { const f = frameOf(d, 0.2, 0.75); return [[f.cx - 0.3, f.wt + 0.18], [f.cx + 0.3, f.wt + 0.18]]; },
  drydock: (d) => [[d.x + d.w - 0.2, d.y + 0.15]],
};
