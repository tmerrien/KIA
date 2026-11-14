// Resource nodes: ore veins, star-crystal clusters, glowmoss beds, ice seeps and old wrecks.
import type { ResourceNode } from '../sim/types';
import { NODEDEFS } from './content';
import { Ctx, OUT, LW, fs, poly, ell, line, glow, star4, rr, shade, hash2, clamp } from './util';

function shadow(ctx: Ctx, cx: number, cy: number, rx: number, ry: number, a = 0.22): void {
  ell(ctx, cx, cy, rx, ry); ctx.fillStyle = `rgba(30,25,60,${a})`; ctx.fill();
}

function rock(ctx: Ctx, cx: number, cy: number, r: number, seed: number, col: string): void {
  const pts: number[] = [];
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
    const k = 0.82 + hash2(i, seed, 2) * 0.3;
    pts.push(cx + Math.cos(a) * r * k, cy + Math.sin(a) * r * k * (Math.sin(a) > 0 ? 0.55 : 0.95));
  }
  poly(ctx, pts); fs(ctx, col);
  // top facet
  poly(ctx, [cx - r * 0.55, cy - r * 0.35, cx - r * 0.1, cy - r * 0.8, cx + r * 0.45, cy - r * 0.55, cx + r * 0.2, cy - r * 0.15]);
  ctx.fillStyle = shade(col, 0.22); ctx.fill();
}

export function drawNode(ctx: Ctx, n: ResourceNode, idx: number, t: number): void {
  const cx = n.x + 0.5, cy = n.y + 0.5;
  const def = NODEDEFS[n.kind];
  switch (n.kind) {
    case 'ore': {
      shadow(ctx, cx, cy + 0.3, 0.48, 0.15);
      rock(ctx, cx, cy + 0.05, 0.47, idx, '#6c7592');
      // ore veins: bright streaks through the rock (dull once mined out)
      const max = def?.max ?? 3, k = clamp(Math.round(n.amount), 0, max);
      ctx.save();
      ctx.beginPath(); ctx.ellipse(cx, cy + 0.05, 0.4, 0.3, 0, 0, Math.PI * 2); ctx.clip();
      ctx.strokeStyle = k > 0 ? '#9fe3ff' : '#59617c'; ctx.lineWidth = 0.045;
      ctx.beginPath(); ctx.moveTo(cx - 0.4, cy + 0.12); ctx.lineTo(cx - 0.15, cy - 0.02); ctx.lineTo(cx + 0.05, cy + 0.08); ctx.lineTo(cx + 0.4, cy - 0.12);
      ctx.moveTo(cx - 0.2, cy - 0.3); ctx.lineTo(cx - 0.05, cy - 0.1); ctx.stroke();
      ctx.restore();
      const slots = [[-0.2, -0.1], [0.18, -0.2], [0.08, 0.14]];
      for (let i = 0; i < slots.length; i++) {
        const [ox, oy] = slots[i];
        const x = cx + ox, y = cy + oy, q = 1.3;
        if (i < k) {
          poly(ctx, [x - 0.11 * q, y + 0.06 * q, x - 0.06 * q, y - 0.1 * q, x + 0.08 * q, y - 0.11 * q, x + 0.12 * q, y + 0.04 * q, x, y + 0.11 * q]);
          fs(ctx, '#aee6ff', LW * 0.8);
          poly(ctx, [x - 0.06 * q, y - 0.1 * q, x + 0.08 * q, y - 0.11 * q, x + 0.02 * q, y - 0.01 * q]);
          ctx.fillStyle = '#ffffff'; ctx.fill();
          const tw = Math.sin(t * 2.2 + idx * 1.7 + i * 2.1);
          if (tw > 0.5) star4(ctx, x + 0.1, y - 0.13, 0.13 * (tw - 0.5) * 2, '#ffffff');
        } else {
          ell(ctx, x, y, 0.08, 0.06); ctx.fillStyle = '#4c536c'; ctx.fill();
        }
      }
      break;
    }
    case 'crystal': {
      shadow(ctx, cx, cy + 0.3, 0.4, 0.13);
      rock(ctx, cx, cy + 0.2, 0.3, idx + 50, '#5f6684');
      const max = def?.max ?? 2, k = clamp(Math.round(n.amount), 0, max);
      const shards: [number, number, number, number][] = [[-0.12, 0.1, 0.62, -0.12], [0.16, 0.14, 0.45, 0.18], [0.0, 0.16, 0.34, 0.02]];
      // stumps for spent shards, full shards for stock
      for (let i = 0; i < 2; i++) {
        const [ox, oy, hgt, lean] = shards[i];
        const full = i < k;
        const hh = full ? hgt : 0.12;
        const bx = cx + ox, by = cy + oy;
        const tip = bx + lean * hh;
        poly(ctx, [bx - 0.1, by, tip - 0.02, by - hh, tip + 0.03, by - hh + 0.05, bx + 0.1, by]);
        fs(ctx, full ? '#b590ff' : '#6e5a99');
        if (full) {
          poly(ctx, [bx - 0.1, by, tip - 0.02, by - hh, bx - 0.01, by]);
          ctx.fillStyle = '#e4d6ff'; ctx.fill();
        }
      }
      if (k > 0) {
        const [ox, oy, hgt] = shards[2];
        poly(ctx, [cx + ox - 0.06, cy + oy + 0.05, cx + ox + 0.02, cy + oy - hgt * 0.7, cx + ox + 0.08, cy + oy + 0.05]);
        fs(ctx, '#9f78f0');
        const tw = Math.sin(t * 1.7 + idx);
        if (tw > 0.3) star4(ctx, cx - 0.12 - 0.07, cy - 0.4, 0.13 * (tw - 0.3), '#ffffff');
      }
      break;
    }
    case 'moss': {
      const x0 = n.x + 0.1, y0 = n.y + 0.14, w = 0.8, h = 0.74;
      if (!n.active) {
        rr(ctx, x0, y0, w, h, 0.08);
        ctx.setLineDash([0.08, 0.07]);
        ctx.strokeStyle = 'rgba(70,80,120,0.45)'; ctx.lineWidth = 0.04; ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(127,224,168,0.08)'; ctx.fill();
        break;
      }
      shadow(ctx, cx, y0 + h + 0.02, 0.44, 0.08, 0.18);
      // wooden frame + soil
      rr(ctx, x0, y0, w, h, 0.06); fs(ctx, '#8a5a36');
      rr(ctx, x0 + 0.07, y0 + 0.06, w - 0.14, h - 0.16, 0.04); ctx.fillStyle = '#3d3348'; ctx.fill();
      ctx.fillStyle = '#6a4228'; ctx.fillRect(x0 + 0.02, y0 + h - 0.1, w - 0.04, 0.08);
      // furrows
      ctx.strokeStyle = '#2d2538'; ctx.lineWidth = 0.025;
      for (let r = 0; r < 3; r++) { const yy = y0 + 0.18 + r * 0.17; line(ctx, x0 + 0.12, yy, x0 + w - 0.12, yy, '#2d2538', 0.025); }
      const crop = n.crop ?? 'empty';
      const grow = def?.grow ?? 18;
      if (crop === 'growing' || crop === 'ripe') {
        const p = crop === 'ripe' ? 1 : clamp(n.timer / grow, 0, 1);
        for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
          const sx = x0 + 0.2 + c * 0.2, sy = y0 + 0.2 + r * 0.17;
          if (crop === 'ripe') {
            const pul = 1 + 0.06 * Math.sin(t * 3 + r + c * 2);
            ell(ctx, sx, sy, 0.1 * pul, 0.08 * pul); fs(ctx, '#7fe0a8', 0.03);
            ell(ctx, sx - 0.03, sy - 0.03, 0.04, 0.025); ctx.fillStyle = '#e8fff2'; ctx.fill();
          } else {
            const s = 0.03 + p * 0.07;
            ctx.strokeStyle = '#5fbf86'; ctx.lineWidth = 0.03;
            ctx.beginPath(); ctx.moveTo(sx, sy + 0.03); ctx.lineTo(sx, sy - s); ctx.stroke();
            ell(ctx, sx - s * 0.5, sy - s, s * 0.55, s * 0.32); ctx.fillStyle = '#7fe0a8'; ctx.fill();
            ell(ctx, sx + s * 0.5, sy - s * 0.8, s * 0.55, s * 0.32); ctx.fill();
          }
        }
        if (crop === 'ripe') {
          for (let i = 0; i < 3; i++) {
            const ph = (t * 0.7 + i / 3 + idx * 0.13) % 1;
            star4(ctx, x0 + 0.15 + ((i * 0.31 + idx * 0.17) % 0.6), y0 + 0.5 - ph * 0.5, 0.09 * Math.sin(ph * Math.PI), '#ffffff');
          }
        }
      }
      break;
    }
    case 'ice': {
      shadow(ctx, cx, cy + 0.25, 0.46, 0.15, 0.15);
      ell(ctx, cx, cy + 0.12, 0.42, 0.26); fs(ctx, '#8fcff0');
      ell(ctx, cx, cy + 0.1, 0.32, 0.18); ctx.fillStyle = '#c9ecff'; ctx.fill();
      // shimmer
      const sh = (t * 0.4 + idx * 0.37) % 1;
      ctx.save(); ell(ctx, cx, cy + 0.1, 0.32, 0.18); ctx.clip();
      ctx.fillStyle = 'rgba(255,255,255,0.65)';
      ctx.fillRect(cx - 0.5 + sh * 1.0, cy - 0.15, 0.08, 0.5);
      ctx.restore();
      // icicle spikes around the rim
      const spikes: [number, number, number][] = [[-0.3, 0.05, 0.36], [-0.16, -0.02, 0.5], [0.22, 0.0, 0.42], [0.33, 0.12, 0.26], [0.05, -0.05, 0.3]];
      for (const [ox, oy, hgt] of spikes) {
        const bx = cx + ox, by = cy + oy;
        poly(ctx, [bx - 0.07, by, bx, by - hgt, bx + 0.07, by]);
        fs(ctx, '#e3f6ff', 0.035);
        poly(ctx, [bx, by, bx, by - hgt, bx + 0.07, by]);
        ctx.fillStyle = '#9fd8f5'; ctx.fill();
      }
      // vapor wisp
      const v = (t * 0.35 + idx * 0.5) % 1;
      ell(ctx, cx + Math.sin(v * 6) * 0.08, cy - 0.3 - v * 0.5, 0.1 + v * 0.1, 0.06 + v * 0.05);
      ctx.fillStyle = `rgba(230,246,255,${0.35 * (1 - v)})`; ctx.fill();
      break;
    }
    case 'wreck': {
      shadow(ctx, cx, cy + 0.32, 0.62, 0.15);
      // half-buried bow of an old hull, tilted on the regolith
      ctx.save();
      ctx.translate(cx - 0.08, cy + 0.18);
      ctx.rotate(-0.22);
      ctx.beginPath();
      ctx.moveTo(-0.6, -0.12);
      ctx.quadraticCurveTo(-0.55, 0.2, -0.05, 0.22);
      ctx.quadraticCurveTo(0.45, 0.22, 0.62, -0.3);           // bow tip
      ctx.lineTo(0.4, -0.2); ctx.lineTo(0.28, -0.3); ctx.lineTo(0.12, -0.12); ctx.lineTo(-0.05, -0.24); ctx.lineTo(-0.2, -0.08); ctx.lineTo(-0.38, -0.2);
      ctx.closePath();
      fs(ctx, '#6b4a35');
      ctx.save(); ctx.clip();
      ctx.strokeStyle = '#4c3324'; ctx.lineWidth = 0.025;
      for (const yy of [-0.04, 0.06, 0.15]) { ctx.beginPath(); ctx.moveTo(-0.7, yy); ctx.lineTo(0.7, yy - 0.1); ctx.stroke(); }
      ctx.fillStyle = '#c9a14a'; ctx.fillRect(-0.7, -0.1, 1.4, 0.04);
      ctx.restore();
      // brass porthole
      ell(ctx, -0.3, 0.04, 0.07, 0.065); fs(ctx, '#3a3348', 0.035, '#c9a14a');
      ctx.restore();
      // broken ribs sticking up
      for (const [ox, hgt] of [[-0.3, 0.5], [-0.08, 0.66], [0.16, 0.52]] as [number, number][]) {
        ctx.beginPath(); ctx.moveTo(cx + ox, cy + 0.12); ctx.quadraticCurveTo(cx + ox - 0.15, cy - hgt * 0.5, cx + ox + 0.05, cy + 0.12 - hgt);
        ctx.strokeStyle = OUT; ctx.lineWidth = 0.11; ctx.stroke();
        ctx.strokeStyle = '#9a7252'; ctx.lineWidth = 0.055; ctx.stroke();
      }
      // salvageable scrap plates = stock
      const max = def?.max ?? 4, k = clamp(Math.round(n.amount), 0, max);
      const pos = [[0.32, 0.3], [0.1, 0.38], [-0.28, 0.36], [0.44, 0.1]];
      for (let i = 0; i < k; i++) {
        const [ox, oy] = pos[i];
        poly(ctx, [cx + ox - 0.13, cy + oy, cx + ox - 0.07, cy + oy - 0.11, cx + ox + 0.12, cy + oy - 0.08, cx + ox + 0.11, cy + oy + 0.05]);
        fs(ctx, i % 2 ? '#d0a070' : '#b98a62', 0.035);
        ell(ctx, cx + ox, cy + oy - 0.03, 0.022, 0.022); ctx.fillStyle = '#5a3a26'; ctx.fill();
      }
      break;
    }
  }
}

export function nodeGlow(ctx: Ctx, n: ResourceNode, t: number, idx: number): void {
  const cx = n.x + 0.5, cy = n.y + 0.5;
  if (n.kind === 'crystal' && n.amount > 0) glow(ctx, cx, cy - 0.2, 0.9, '#b48cff', 0.28 + 0.08 * Math.sin(t * 2 + idx));
  else if (n.kind === 'moss' && n.active) {
    if (n.crop === 'ripe') glow(ctx, cx, cy, 0.95, '#7fe0a8', 0.34 + 0.08 * Math.sin(t * 2.5 + idx));
    else if (n.crop === 'growing') glow(ctx, cx, cy, 0.6, '#7fe0a8', 0.12);
  } else if (n.kind === 'ice') glow(ctx, cx, cy, 0.7, '#9fdcff', 0.14);
}
