// People of the wharf: the player, hired hands (dockhands, porters) and visiting ship crews.
import type { Mover, Player, Helper, Crew, Bag } from '../sim/types';
import { drawItem } from './glyphs';
import { ITEMS } from './content';
import { Ctx, OUT, rr, ell, fs, line, shade } from './util';

export const CREW_COLORS = ['#e2553f', '#3fa7b8', '#e8b33a', '#9a6ae0', '#e87a9f', '#5fbf6a', '#4f7fe0', '#d9783a'];

interface Look {
  coat: string; long: boolean; pants: string; skin: string;
  hat: 'cap' | 'hard' | 'beanie' | 'flat'; hatColor: string;
  stripes?: string; scarf?: string; pack?: boolean; satchel?: string; overalls?: boolean; scale?: number;
}

function moving(m: Mover): boolean { return m.path.length > 0; }

export function drawPerson(ctx: Ctx, cx: number, fy: number, dir: 1 | -1, walkPhase: number | null, t: number, L: Look, carry: string | null): void {
  const s = L.scale ?? 1;
  ctx.save();
  ctx.translate(cx, fy);
  ctx.scale(s, s);
  // ground shadow
  ell(ctx, 0, 0, 0.22, 0.075); ctx.fillStyle = 'rgba(30,25,60,0.3)'; ctx.fill();
  ctx.scale(dir, 1);
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const w = walkPhase !== null;
  const ph = walkPhase ?? 0;
  const bob = w ? Math.abs(Math.sin(ph)) * 0.045 : Math.sin(t * 2.2 + cx) * 0.008;
  const sw = w ? Math.sin(ph) * 0.07 : 0;
  // legs
  const leg = (x: number, dx: number) => {
    line(ctx, x, -0.3, x + dx, -0.04, OUT, 0.13);
    line(ctx, x, -0.3, x + dx, -0.04, L.pants, 0.075);
    ell(ctx, x + dx + 0.025, -0.03, 0.065, 0.04); fs(ctx, '#3a2a24', 0.03);
  };
  leg(-0.06, -sw);
  leg(0.06, sw);
  const by = -bob;
  // back pack (porter): wooden frame and crate behind the body
  if (L.pack) {
    rr(ctx, -0.36, by - 0.78, 0.24, 0.46, 0.04); fs(ctx, '#b88a55');
    line(ctx, -0.36, by - 0.62, -0.12, by - 0.62, '#7a5634', 0.03);
    line(ctx, -0.36, by - 0.47, -0.12, by - 0.47, '#7a5634', 0.03);
    line(ctx, -0.39, by - 0.84, -0.39, by - 0.26, OUT, 0.06);
  }
  // back arm
  const armSw = w ? -Math.sin(ph) * 0.08 : 0;
  if (!carry) { line(ctx, -0.04, by - 0.55, -0.04 - armSw, by - 0.33, OUT, 0.11); line(ctx, -0.04, by - 0.55, -0.04 - armSw, by - 0.33, shade(L.coat, -0.2), 0.065); }
  // torso / coat
  if (L.long) {
    ctx.beginPath();
    ctx.moveTo(-0.15, by - 0.62); ctx.lineTo(0.15, by - 0.62);
    ctx.lineTo(0.21, by - 0.12); ctx.quadraticCurveTo(0, by - 0.07, -0.21, by - 0.12);
    ctx.closePath();
    fs(ctx, L.coat);
    line(ctx, 0.07, by - 0.45, 0.13, by - 0.12, shade(L.coat, -0.3), 0.025);
    ctx.fillStyle = '#e6c46a';
    ell(ctx, 0.09, by - 0.5, 0.022, 0.022); ctx.fill();
    ell(ctx, 0.1, by - 0.4, 0.022, 0.022); ctx.fill();
  } else {
    rr(ctx, -0.15, by - 0.62, 0.3, 0.36, 0.08);
    fs(ctx, L.stripes ? '#f3efe6' : L.coat);
    if (L.stripes) {
      ctx.save(); rr(ctx, -0.15, by - 0.62, 0.3, 0.36, 0.08); ctx.clip();
      ctx.fillStyle = L.stripes;
      for (let k = 0; k < 3; k++) ctx.fillRect(-0.2, by - 0.55 + k * 0.1, 0.4, 0.045);
      ctx.restore();
      rr(ctx, -0.15, by - 0.62, 0.3, 0.36, 0.08); ctx.strokeStyle = OUT; ctx.lineWidth = 0.04; ctx.stroke();
    }
    if (L.overalls) {
      rr(ctx, -0.12, by - 0.48, 0.24, 0.22, 0.04); fs(ctx, '#3f6fa8', 0.03);
      line(ctx, -0.08, by - 0.48, -0.06, by - 0.6, '#3f6fa8', 0.04);
      line(ctx, 0.08, by - 0.48, 0.06, by - 0.6, '#3f6fa8', 0.04);
      ell(ctx, 0.0, by - 0.4, 0.025, 0.025); ctx.fillStyle = '#e6c46a'; ctx.fill();
    }
  }
  if (L.satchel) {
    line(ctx, 0.12, by - 0.6, -0.12, by - 0.3, '#5a3a26', 0.035);
    rr(ctx, -0.22, by - 0.36, 0.17, 0.15, 0.04); fs(ctx, '#8a5a36', 0.03);
    ctx.fillStyle = L.satchel; ctx.fillRect(-0.2, by - 0.35, 0.13, 0.05);
  }
  if (L.scarf) {
    rr(ctx, -0.14, by - 0.66, 0.28, 0.08, 0.04); fs(ctx, L.scarf, 0.03);
    line(ctx, -0.1, by - 0.62, -0.17, by - 0.48, L.scarf, 0.05);
  }
  // head
  const hy = by - 0.76;
  ell(ctx, 0.01, hy, 0.15, 0.145); fs(ctx, L.skin);
  ell(ctx, 0.08, hy + 0.01, 0.022, 0.026); ctx.fillStyle = OUT; ctx.fill();
  ell(ctx, 0.07, hy + 0.06, 0.035, 0.022); ctx.fillStyle = 'rgba(230,110,110,0.45)'; ctx.fill();
  // hats
  switch (L.hat) {
    case 'cap': // brass-badged captain's cap with visor
      ctx.beginPath(); ctx.moveTo(-0.16, hy - 0.03); ctx.quadraticCurveTo(-0.15, hy - 0.2, 0.0, hy - 0.2); ctx.quadraticCurveTo(0.15, hy - 0.2, 0.15, hy - 0.04); ctx.closePath();
      fs(ctx, L.hatColor);
      ctx.beginPath(); ctx.moveTo(0.06, hy - 0.04); ctx.quadraticCurveTo(0.2, hy - 0.06, 0.25, hy - 0.01); ctx.lineTo(0.06, hy - 0.01); ctx.closePath();
      fs(ctx, shade(L.hatColor, -0.35), 0.03);
      ell(ctx, 0.07, hy - 0.12, 0.035, 0.03); ctx.fillStyle = '#e6c46a'; ctx.fill();
      break;
    case 'hard':
      ctx.beginPath(); ctx.arc(0.0, hy - 0.04, 0.155, Math.PI, 0); ctx.closePath(); fs(ctx, L.hatColor);
      rr(ctx, -0.19, hy - 0.06, 0.38, 0.05, 0.02); fs(ctx, shade(L.hatColor, -0.15), 0.03);
      line(ctx, 0, hy - 0.19, 0, hy - 0.07, shade(L.hatColor, 0.4), 0.03);
      break;
    case 'beanie':
      ctx.beginPath(); ctx.arc(-0.01, hy - 0.03, 0.15, Math.PI, 0); ctx.closePath(); fs(ctx, L.hatColor);
      rr(ctx, -0.16, hy - 0.06, 0.31, 0.06, 0.03); fs(ctx, shade(L.hatColor, -0.2), 0.03);
      ell(ctx, -0.02, hy - 0.2, 0.04, 0.04); fs(ctx, shade(L.hatColor, 0.3), 0.025);
      break;
    case 'flat':
      ctx.beginPath(); ctx.ellipse(0.02, hy - 0.09, 0.17, 0.08, 0, Math.PI, 0); ctx.closePath(); fs(ctx, L.hatColor);
      ctx.beginPath(); ctx.moveTo(0.1, hy - 0.09); ctx.lineTo(0.24, hy - 0.06); ctx.lineTo(0.1, hy - 0.05); ctx.closePath(); fs(ctx, shade(L.hatColor, -0.25), 0.03);
      break;
  }
  // front arm (holding cargo out in front when carrying)
  if (carry) {
    line(ctx, 0.04, by - 0.54, 0.2, by - 0.42, OUT, 0.11); line(ctx, 0.04, by - 0.54, 0.2, by - 0.42, shade(L.coat, -0.1), 0.065);
  } else {
    line(ctx, 0.04, by - 0.55, 0.04 + armSw, by - 0.33, OUT, 0.11); line(ctx, 0.04, by - 0.55, 0.04 + armSw, by - 0.33, shade(L.coat, -0.1), 0.065);
  }
  ctx.restore();
  if (carry) {
    // un-mirrored so the glyph reads the same in both directions
    drawItem(ctx, carry, cx + dir * 0.24 * s, fy - (0.44 + bob) * s, 0.15);
  }
}

function topItem(b: Bag): string | null {
  let best: string | null = null, n = 0;
  for (const k in b) if (b[k] > n) { n = b[k]; best = k; }
  return best;
}

const PLAYER: Look = { coat: '#c4622d', long: true, pants: '#3b3150', skin: '#f2c9a0', hat: 'cap', hatColor: '#2f3a5a', scarf: '#7fe0a8', scale: 1.1 };
const DOCKHAND: Look = { coat: '#e08a4a', long: false, overalls: true, pants: '#33558a', skin: '#d9a77c', hat: 'hard', hatColor: '#f2c14e' };
const PORTER: Look = { coat: '#4f8a5b', long: false, pants: '#5a4636', skin: '#b98060', hat: 'flat', hatColor: '#7a5634', pack: true };

const walkPhase = (m: Mover) => (moving(m) ? m.walkT * 11 : null);

export function drawPlayer(ctx: Ctx, p: Player, satchel: Bag, t: number): void {
  const cx = p.x + 0.5, fy = p.y + 0.78;
  // warm marker ring under the player so you can always find yourself
  ell(ctx, cx, fy, 0.34, 0.12);
  ctx.strokeStyle = `rgba(255,190,90,${0.55 + 0.2 * Math.sin(t * 3)})`; ctx.lineWidth = 0.05; ctx.stroke();
  const sat = topItem(satchel);
  drawPerson(ctx, cx, fy, p.dir, walkPhase(p), t, { ...PLAYER, satchel: sat ? colorOf(sat) : undefined }, null);
}

export function drawHelper(ctx: Ctx, h: Helper, t: number): void {
  const look = h.kind === 'porter' ? PORTER : DOCKHAND;
  drawPerson(ctx, h.x + 0.5, h.y + 0.78, h.dir, walkPhase(h), t, look, topItem(h.carry));
}

export function drawCrew(ctx: Ctx, c: Crew, t: number): void {
  const col = CREW_COLORS[((c.color % CREW_COLORS.length) + CREW_COLORS.length) % CREW_COLORS.length];
  const look: Look = { coat: '#f3efe6', long: false, stripes: col, pants: '#2f3a5a', skin: ['#f2c9a0', '#c98e66', '#8a5a3c', '#e8b48a'][c.id % 4], hat: 'beanie', hatColor: col, scale: 0.95 };
  drawPerson(ctx, c.x + 0.5, c.y + 0.78, c.dir, walkPhase(c), t, look, c.bought);
}

function colorOf(id: string): string { return ITEMS[id]?.color ?? '#cccccc'; }
