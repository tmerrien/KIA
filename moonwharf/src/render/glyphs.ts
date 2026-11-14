// Item icons drawn with paths (no images/emoji). r = half-size in current units; works in tile or px space.
import { ITEMS } from './content';
import { Ctx, OUT, poly, rr, ell, shade } from './util';

export function drawItem(ctx: Ctx, id: string, x: number, y: number, r: number, ink = true): void {
  const col = ITEMS[id]?.color ?? '#cccccc';
  const lw = ink ? r * 0.17 : 0;
  const f = (fill: string | CanvasGradient) => {
    ctx.fillStyle = fill; ctx.fill();
    if (lw) { ctx.lineWidth = lw; ctx.strokeStyle = OUT; ctx.lineJoin = 'round'; ctx.stroke(); }
  };
  ctx.save();
  ctx.translate(x, y);
  switch (id) {
    case 'ore': {
      poly(ctx, [-0.85 * r, 0.35 * r, -0.55 * r, -0.55 * r, 0.15 * r, -0.85 * r, 0.85 * r, -0.25 * r, 0.7 * r, 0.6 * r, -0.2 * r, 0.8 * r]);
      f(col);
      poly(ctx, [-0.55 * r, -0.5 * r, 0.15 * r, -0.8 * r, 0.3 * r, -0.2 * r, -0.3 * r, 0]);
      ctx.fillStyle = shade(col, 0.45); ctx.fill();
      ctx.fillStyle = '#7fd6ff';
      ell(ctx, 0.35 * r, 0.25 * r, 0.16 * r, 0.12 * r); ctx.fill();
      ell(ctx, -0.35 * r, 0.35 * r, 0.1 * r, 0.08 * r); ctx.fill();
      break;
    }
    case 'moss': {
      ctx.beginPath();
      ctx.arc(-0.4 * r, 0.2 * r, 0.45 * r, 0, Math.PI * 2);
      ctx.moveTo(0.85 * r, 0.2 * r);
      ctx.arc(0.4 * r, 0.2 * r, 0.45 * r, 0, Math.PI * 2);
      ctx.moveTo(0.5 * r, -0.25 * r);
      ctx.arc(0, -0.25 * r, 0.5 * r, 0, Math.PI * 2);
      f(col);
      ctx.fillStyle = '#e8fff2';
      ell(ctx, -0.12 * r, -0.4 * r, 0.14 * r, 0.1 * r); ctx.fill();
      ell(ctx, 0.45 * r, 0.05 * r, 0.1 * r, 0.08 * r); ctx.fill();
      break;
    }
    case 'ice': {
      poly(ctx, [0, -0.9 * r, 0.8 * r, -0.45 * r, 0.8 * r, 0.45 * r, 0, 0.9 * r, -0.8 * r, 0.45 * r, -0.8 * r, -0.45 * r]);
      f(col);
      poly(ctx, [0, -0.9 * r, 0.8 * r, -0.45 * r, 0, 0, -0.8 * r, -0.45 * r]);
      ctx.fillStyle = '#f2fbff'; ctx.fill();
      poly(ctx, [0, 0, 0.8 * r, -0.45 * r, 0.8 * r, 0.45 * r, 0, 0.9 * r]);
      ctx.fillStyle = shade(col, -0.18); ctx.fill();
      if (lw) { poly(ctx, [0, -0.9 * r, 0.8 * r, -0.45 * r, 0.8 * r, 0.45 * r, 0, 0.9 * r, -0.8 * r, 0.45 * r, -0.8 * r, -0.45 * r]); ctx.lineWidth = lw; ctx.strokeStyle = OUT; ctx.stroke(); }
      break;
    }
    case 'crystal': {
      poly(ctx, [-0.15 * r, -0.95 * r, 0.35 * r, -0.3 * r, 0.15 * r, 0.9 * r, -0.4 * r, 0.9 * r, -0.5 * r, -0.2 * r]);
      f(col);
      poly(ctx, [0.35 * r, 0.9 * r, 0.55 * r, -0.2 * r, 0.85 * r, 0.1 * r, 0.75 * r, 0.9 * r]);
      f(shade(col, -0.15));
      poly(ctx, [-0.15 * r, -0.95 * r, -0.05 * r, 0.8 * r, -0.4 * r, 0.85 * r, -0.5 * r, -0.2 * r]);
      ctx.fillStyle = shade(col, 0.45); ctx.fill();
      break;
    }
    case 'scrap': {
      poly(ctx, [-0.9 * r, -0.3 * r, -0.2 * r, -0.75 * r, 0.85 * r, -0.4 * r, 0.6 * r, 0.2 * r, 0.9 * r, 0.7 * r, -0.5 * r, 0.75 * r]);
      f(col);
      ctx.fillStyle = shade(col, -0.35);
      for (const [a, b] of [[-0.5, -0.25], [0.45, -0.3], [-0.2, 0.45], [0.5, 0.5]]) { ell(ctx, a * r, b * r, 0.09 * r, 0.09 * r); ctx.fill(); }
      ctx.beginPath(); ctx.moveTo(-0.6 * r, 0.1 * r); ctx.lineTo(0.4 * r, -0.05 * r);
      ctx.strokeStyle = shade(col, 0.35); ctx.lineWidth = r * 0.12; ctx.stroke();
      break;
    }
    case 'ingot': {
      poly(ctx, [-0.95 * r, 0.55 * r, -0.6 * r, -0.35 * r, 0.6 * r, -0.35 * r, 0.95 * r, 0.55 * r]);
      f(col);
      poly(ctx, [-0.6 * r, -0.35 * r, 0.6 * r, -0.35 * r, 0.45 * r, -0.05 * r, -0.45 * r, -0.05 * r]);
      ctx.fillStyle = '#ffffff'; ctx.globalAlpha = 0.7; ctx.fill(); ctx.globalAlpha = 1;
      ctx.fillStyle = shade(col, -0.25); ctx.fillRect(-0.85 * r, 0.3 * r, 1.7 * r, 0.2 * r);
      break;
    }
    case 'sailcloth': {
      rr(ctx, -0.9 * r, -0.5 * r, 1.5 * r, 1.0 * r, 0.15 * r);
      f(col);
      ell(ctx, 0.6 * r, 0, 0.32 * r, 0.5 * r); f(shade(col, -0.08));
      ctx.beginPath(); ctx.arc(0.6 * r, 0, 0.22 * r, 0, Math.PI * 1.6);
      ctx.strokeStyle = shade(col, -0.35); ctx.lineWidth = r * 0.1; ctx.stroke();
      ctx.fillStyle = '#7fe0a8'; ctx.fillRect(-0.9 * r, -0.12 * r, 1.4 * r, 0.18 * r);
      break;
    }
    case 'ration': {
      rr(ctx, -0.65 * r, -0.8 * r, 1.3 * r, 1.6 * r, 0.25 * r);
      f('#c7ccd6');
      ctx.fillStyle = col; ctx.fillRect(-0.62 * r, -0.4 * r, 1.24 * r, 0.75 * r);
      ctx.fillStyle = '#7a3f1d'; ell(ctx, 0, -0.03 * r, 0.22 * r, 0.2 * r); ctx.fill();
      ell(ctx, 0, -0.8 * r, 0.6 * r, 0.14 * r); ctx.fillStyle = '#e9edf3'; ctx.fill();
      break;
    }
    case 'fuelcell': {
      rr(ctx, -0.45 * r, -0.95 * r, 0.9 * r, 1.9 * r, 0.4 * r);
      f('#4a3f6b');
      rr(ctx, -0.28 * r, -0.6 * r, 0.56 * r, 1.2 * r, 0.25 * r);
      ctx.fillStyle = col; ctx.fill();
      ctx.fillStyle = '#f0e8ff'; ctx.fillRect(-0.1 * r, -0.45 * r, 0.12 * r, 0.8 * r);
      ctx.fillStyle = '#c9a14a'; ctx.fillRect(-0.45 * r, -0.12 * r, 0.9 * r, 0.16 * r);
      break;
    }
    case 'tools': {
      rr(ctx, -0.9 * r, -0.25 * r, 1.8 * r, 1.05 * r, 0.15 * r);
      f(col);
      ctx.beginPath(); ctx.moveTo(-0.35 * r, -0.25 * r); ctx.lineTo(-0.35 * r, -0.65 * r); ctx.lineTo(0.35 * r, -0.65 * r); ctx.lineTo(0.35 * r, -0.25 * r);
      ctx.strokeStyle = OUT; ctx.lineWidth = r * 0.2; ctx.stroke();
      ctx.fillStyle = shade(col, -0.3); ctx.fillRect(-0.9 * r, 0.12 * r, 1.8 * r, 0.14 * r);
      ctx.fillStyle = '#e6c46a'; ctx.fillRect(-0.12 * r, 0.04 * r, 0.24 * r, 0.3 * r);
      break;
    }
    case 'rigging': {
      ell(ctx, 0, 0, 0.9 * r, 0.8 * r); f(col);
      ell(ctx, 0, 0, 0.35 * r, 0.3 * r); ctx.fillStyle = OUT; ctx.fill();
      ctx.strokeStyle = shade(col, -0.3); ctx.lineWidth = r * 0.09;
      for (const k of [0.5, 0.68]) { ell(ctx, 0, 0, k * r * 1.05, k * r * 0.93); ctx.stroke(); }
      ctx.beginPath(); ctx.moveTo(0.6 * r, 0.55 * r); ctx.quadraticCurveTo(0.9 * r, 0.95 * r, 0.4 * r, 1.0 * r);
      ctx.strokeStyle = OUT; ctx.lineWidth = r * 0.14; ctx.stroke();
      break;
    }
    case 'engine': {
      ctx.beginPath();
      const n = 8;
      for (let i = 0; i < n * 2; i++) {
        const a = (i / (n * 2)) * Math.PI * 2;
        const rad = (i % 2 ? 0.7 : 0.95) * r;
        const a2 = a + Math.PI / (n * 2);
        ctx.lineTo(Math.cos(a) * rad, Math.sin(a) * rad);
        ctx.lineTo(Math.cos(a2) * rad, Math.sin(a2) * rad);
      }
      ctx.closePath();
      f(col);
      ell(ctx, 0, 0, 0.32 * r, 0.32 * r); f('#3a3550');
      ell(ctx, -0.25 * r, -0.35 * r, 0.14 * r, 0.1 * r); ctx.fillStyle = shade(col, 0.5); ctx.fill();
      break;
    }
    case 'solarsail': {
      poly(ctx, [-0.9 * r, 0.75 * r, -0.2 * r, -0.95 * r, 0.9 * r, -0.4 * r, 0.65 * r, 0.75 * r]);
      const g = ctx.createLinearGradient(0, -r, 0, r);
      g.addColorStop(0, '#fff2b8'); g.addColorStop(1, col);
      f(g);
      ctx.strokeStyle = shade(col, -0.35); ctx.lineWidth = r * 0.08;
      ctx.beginPath();
      ctx.moveTo(-0.2 * r, -0.95 * r); ctx.lineTo(-0.15 * r, 0.75 * r);
      ctx.moveTo(-0.55 * r, -0.1 * r); ctx.lineTo(0.78 * r, 0.15 * r);
      ctx.stroke();
      break;
    }
    default: {
      ell(ctx, 0, 0, 0.8 * r, 0.8 * r); f(col);
    }
  }
  ctx.restore();
}
