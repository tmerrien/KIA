// Frame composition: space -> fleet -> terrain -> ground decals -> y-sorted entities -> light -> overlays.
import type { GameState, GameEvent, Ref } from '../sim/types';
import type { Camera, Renderer } from './api';
import { BUILDINGS, MAP, TUNING, siteCost } from './content';
import { Space } from './space';
import { Terrain } from './terrain';
import { drawNode, nodeGlow } from './nodes';
import { drawBuilding, drawSite, drawPlatform, buildingGlow, visualTop, siteFraction, lantern } from './buildings';
import { drawPlayer, drawHelper, drawCrew } from './characters';
import { drawShip, shipGlow, SHIP_STYLES } from './ships';
import { drawRails } from './rails';
import { Fx } from './fx';
import { drawItem } from './glyphs';
import { Ctx, OUT, rr, ell, line, glow, clamp } from './util';

interface Ent { k: number; draw: () => void }

// static decorations
const LAMPS: [number, number][] = [[2.5, 19.15], [11.5, 19.15], [15.3, 19.15], [21.5, 19.15], [26.5, 19.15], [33.5, 19.15]];
const PIER_LAMPS: [number, number][] = MAP.rows.flatMap((row, y) => [...row].map((c, x) => [c, x] as const)
  .filter(([c, x]) => c === 'P' && MAP.rows[y + 1]?.[x] !== 'P').map(([, x]) => [x + 0.86, y + 0.92] as [number, number]));
const DOCKED = [
  { x: 20.45, y: 22.25, s: 0.9, st: 0, dir: 1 as const, ph: 0 },
  { x: 15.6, y: 23.55, s: 0.85, st: 1, dir: -1 as const, ph: 1.7 },
  { x: 10.1, y: 22.9, s: 0.62, st: 3, dir: 1 as const, ph: 3.1 },
];

function lampPost(ctx: Ctx, x: number, yb: number): void {
  ell(ctx, x, yb, 0.16, 0.05); ctx.fillStyle = 'rgba(30,25,60,0.3)'; ctx.fill();
  line(ctx, x, yb, x, yb - 1.15, OUT, 0.11);
  line(ctx, x, yb, x, yb - 1.15, '#3f3a52', 0.06);
  line(ctx, x, yb - 1.1, x + 0.22, yb - 1.1, OUT, 0.06);
  line(ctx, x, yb - 1.1, x + 0.22, yb - 1.1, '#c9a14a', 0.03);
  ell(ctx, x, yb - 1.17, 0.05, 0.05); ctx.fillStyle = '#c9a14a'; ctx.fill();
  lantern(ctx, x + 0.22, yb - 0.92);
}

export function createRenderer(canvas: HTMLCanvasElement): Renderer {
  const ctx = canvas.getContext('2d')!;
  const space = new Space();
  const terrain = new Terrain();
  const fx = new Fx();
  let cw = canvas.clientWidth || 390, ch = canvas.clientHeight || 844, dpr = 1;
  let clock = 0;

  function resize(cssWidth: number, cssHeight: number, d: number): void {
    cw = cssWidth; ch = cssHeight; dpr = d;
    canvas.width = Math.round(cssWidth * d);
    canvas.height = Math.round(cssHeight * d);
  }

  function screenToTile(cam: Camera, px: number, py: number) {
    return { x: Math.floor(cam.x + px / cam.zoom), y: Math.floor(cam.y + py / cam.zoom) };
  }

  function draw(s: GameState, cam: Camera, dt: number, opts: { selected: Ref | null; events: GameEvent[]; pouring: string | null; coinScreen: { x: number; y: number } }): void {
    dt = clamp(dt, 0, 0.25);
    clock += dt;
    const t = clock;
    const z = cam.zoom;
    const vw = cw / z, vh = ch / z;
    const vx0 = cam.x - 3, vy0 = cam.y - 3, vx1 = cam.x + vw + 3, vy1 = cam.y + vh + 4;
    const vis = (x: number, y: number, w = 1, h = 1) => x + w > vx0 && x < vx1 && y + h > vy0 && y < vy1;

    fx.events(opts.events, s);
    fx.update(dt, opts.pouring, opts.coinScreen);

    // --- background (screen space)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.imageSmoothingEnabled = true;
    space.draw(ctx, cw, ch, cam, t);

    // --- world
    const S = z * dpr;
    ctx.setTransform(S, 0, 0, S, -cam.x * S, -cam.y * S);
    drawFleet(ctx, s, t);
    terrain.draw(ctx, cam.x, cam.y, vw, vh, S);

    // ground decals
    for (const id of ['drydock', 'shipyard']) drawPlatform(ctx, id, s);
    if (s.tech['rails']) drawRails(ctx, s, t);
    if (opts.selected) selectionFloor(ctx, s, opts.selected, t);

    // y-sorted entities
    const ents: Ent[] = [];
    s.nodes.forEach((n, i) => { if (vis(n.x, n.y - 1, 1, 2)) ents.push({ k: n.y + (n.kind === 'moss' ? 0.2 : 0.8), draw: () => drawNode(ctx, n, i, t) }); });
    for (const id in BUILDINGS) {
      const d = BUILDINGS[id];
      if (!vis(d.x, d.y - 2, d.w, d.h + 2)) continue;
      const built = !!s.built[id] || (!!d.startBuilt && !s.sites[id]);
      if (built) ents.push({ k: d.y + d.h - (d.kind === 'drydock' || d.kind === 'shipyard' ? 0.4 : 0), draw: () => drawBuilding(ctx, id, s, t) });
      else if (s.sites[id]) ents.push({ k: d.y + d.h, draw: () => drawSite(ctx, id, s, t) });
    }
    for (const [x, y] of LAMPS) if (vis(x - 1, y - 2, 2, 2)) ents.push({ k: y, draw: () => lampPost(ctx, x, y) });
    for (const [x, y] of PIER_LAMPS) if (vis(x - 1, y - 2, 2, 2)) ents.push({ k: y, draw: () => lampPost(ctx, x, y) });
    for (const sh of DOCKED) {
      if (!vis(sh.x - 2, sh.y - 2.5, 4, 3.5)) continue;
      const by = sh.y + Math.sin(t * 1.1 + sh.ph) * 0.06;
      ents.push({ k: sh.y + 0.3, draw: () => drawShip(ctx, sh.x, by, sh.s, SHIP_STYLES[sh.st], t, sh.dir) });
    }
    // a fleet ship rests at the east pier once you own one
    if (s.fleet.length > 0) {
      const by = 22.7 + Math.sin(t * 1.0 + 4) * 0.06;
      ents.push({ k: 23, draw: () => drawShip(ctx, 26.9, by, 0.72, SHIP_STYLES[s.fleet[0].id % SHIP_STYLES.length], t, -1) });
    }
    for (const c of s.crews) if (vis(c.x, c.y - 1)) ents.push({ k: c.y + 0.78, draw: () => drawCrew(ctx, c, t) });
    for (const h of s.helpers) if (vis(h.x, h.y - 1)) ents.push({ k: h.y + 0.78, draw: () => drawHelper(ctx, h, t) });
    const p = s.player;
    ents.push({ k: p.y + 0.79, draw: () => drawPlayer(ctx, p, s.satchel, t) });
    ents.sort((a, b) => a.k - b.k);
    for (const e of ents) e.draw();

    // --- light pass
    ctx.globalCompositeOperation = 'screen';
    const fl = 0.9 + 0.1 * Math.sin(t * 7.3) * Math.sin(t * 3.1);
    for (const [x, y] of LAMPS) if (vis(x - 2, y - 3, 4, 4)) glow(ctx, x + 0.22, y - 0.92, 1.5, '#ffb84a', 0.42 * fl);
    for (const [x, y] of PIER_LAMPS) if (vis(x - 2, y - 3, 4, 4)) glow(ctx, x + 0.22, y - 0.92, 1.6, '#ffb84a', 0.45 * fl);
    s.nodes.forEach((n, i) => { if (vis(n.x - 1, n.y - 1, 3, 3)) nodeGlow(ctx, n, t, i); });
    for (const id in BUILDINGS) {
      const d = BUILDINGS[id];
      if ((s.built[id] || (d.startBuilt && !s.sites[id])) && vis(d.x - 1, d.y - 2, d.w + 2, d.h + 3)) buildingGlow(ctx, id, s, t);
    }
    for (const sh of DOCKED) if (vis(sh.x - 2, sh.y - 3, 4, 4)) shipGlow(ctx, sh.x, sh.y, sh.s, SHIP_STYLES[sh.st], sh.dir);
    glow(ctx, p.x + 0.5, p.y + 0.4, 1.3, '#ffcf8a', 0.12);
    ctx.globalCompositeOperation = 'source-over';

    // --- screen overlays
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    vignette(ctx, cw, ch);
    const W = (wx: number, wy: number): [number, number] => [(wx - cam.x) * z, (wy - cam.y) * z];
    overlays(ctx, s, W, z, t, vis);
    if (opts.selected) selectionBrackets(ctx, s, opts.selected, W, z, t);
    fx.draw(ctx, cam, opts.coinScreen, t);
  }

  return { resize, draw, screenToTile };
}


// ---------------------------------------------------------------------------------------------------------

function drawFleet(ctx: Ctx, s: GameState, t: number): void {
  const period = TUNING.fleetVoyageSeconds || 60;
  s.fleet.forEach((ship, i) => {
    const p = ((ship.voyage % period) + period) % period / period;
    if (p > 0.6) return; // out on the trade route
    const u = p / 0.6;
    const st = SHIP_STYLES[ship.id % SHIP_STYLES.length];
    const lane = i % 3;
    const span = MAP.width + 14;
    if (lane === 1) {
      const x = MAP.width + 7 - u * span, y = -1.6 + Math.sin(t * 0.9 + i) * 0.08;
      drawShip(ctx, x, y, 0.5, st, t, -1);
      glow(ctx, x + 1.2, y + 0.2, 1.8, '#7ff0d8', 0.12);
    } else {
      const x = -7 + u * span, y = 27.4 + lane * 0.7 + Math.sin(t * 0.9 + i) * 0.08;
      drawShip(ctx, x, y, 0.62, st, t, 1);
    }
  });
}

function vignette(ctx: Ctx, w: number, h: number): void {
  const g = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.45, w / 2, h / 2, Math.max(w, h) * 0.75);
  g.addColorStop(0, 'rgba(18,10,40,0)');
  g.addColorStop(1, 'rgba(18,10,40,0.35)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

function refBounds(s: GameState, r: Ref): { x: number; y: number; w: number; h: number } | null {
  if (r.k === 'node') { const n = s.nodes[r.i]; return n ? { x: n.x, y: n.y - 0.25, w: 1, h: 1.25 } : null; }
  if (r.k === 'bld') { const d = BUILDINGS[r.id]; if (!d) return null; const top = s.built[r.id] || d.startBuilt ? visualTop(r.id, s) : d.y - 0.6; return { x: d.x, y: top, w: d.w, h: d.y + d.h - top }; }
  return { x: r.x, y: r.y, w: 1, h: 1 };
}

function selectionFloor(ctx: Ctx, s: GameState, r: Ref, t: number): void {
  let x: number, y: number, w: number, h: number;
  if (r.k === 'node') { const n = s.nodes[r.i]; if (!n) return; x = n.x; y = n.y; w = h = 1; }
  else if (r.k === 'bld') { const d = BUILDINGS[r.id]; if (!d) return; x = d.x; y = d.y; w = d.w; h = d.h; }
  else { x = r.x; y = r.y; w = h = 1; }
  const a = 0.3 + 0.15 * Math.sin(t * 5);
  rr(ctx, x + 0.04, y + 0.04, w - 0.08, h - 0.08, 0.15);
  ctx.fillStyle = `rgba(255,214,120,${a * 0.5})`; ctx.fill();
  ctx.strokeStyle = `rgba(255,200,90,${a + 0.3})`; ctx.lineWidth = 0.06; ctx.stroke();
}

function selectionBrackets(ctx: Ctx, s: GameState, r: Ref, W: (x: number, y: number) => [number, number], z: number, t: number): void {
  const b = refBounds(s, r);
  if (!b) return;
  const pad = 4 + Math.sin(t * 5) * 2;
  const [x0, y0] = W(b.x, b.y), [x1, y1] = W(b.x + b.w, b.y + b.h);
  const L = Math.min(14, (x1 - x0) * 0.3);
  ctx.lineCap = 'round';
  for (const [col, lw] of [[OUT, 6], ['#ffd27a', 3]] as [string, number][]) {
    ctx.strokeStyle = col; ctx.lineWidth = lw;
    ctx.beginPath();
    ctx.moveTo(x0 - pad, y0 - pad + L); ctx.lineTo(x0 - pad, y0 - pad); ctx.lineTo(x0 - pad + L, y0 - pad);
    ctx.moveTo(x1 + pad - L, y0 - pad); ctx.lineTo(x1 + pad, y0 - pad); ctx.lineTo(x1 + pad, y0 - pad + L);
    ctx.moveTo(x1 + pad, y1 + pad - L); ctx.lineTo(x1 + pad, y1 + pad); ctx.lineTo(x1 + pad - L, y1 + pad);
    ctx.moveTo(x0 - pad + L, y1 + pad); ctx.lineTo(x0 - pad, y1 + pad); ctx.lineTo(x0 - pad, y1 + pad - L);
    ctx.stroke();
  }
  void z;
}

const FONT = (px: number, wt = 800) => `${wt} ${px}px ui-rounded, "SF Pro Rounded", system-ui, sans-serif`;

function pill(ctx: Ctx, x: number, y: number, w: number, h: number, fill: string): void {
  rr(ctx, x - w / 2, y - h / 2, w, h, h / 2);
  ctx.fillStyle = fill; ctx.fill();
  ctx.lineWidth = 2; ctx.strokeStyle = OUT; ctx.stroke();
}

function bar(ctx: Ctx, cx: number, cy: number, w: number, f: number, col: string): void {
  rr(ctx, cx - w / 2 - 2, cy - 5, w + 4, 10, 5); ctx.fillStyle = OUT; ctx.fill();
  rr(ctx, cx - w / 2, cy - 3, w, 6, 3); ctx.fillStyle = '#4a4262'; ctx.fill();
  if (f > 0) { rr(ctx, cx - w / 2, cy - 3, Math.max(6, w * clamp(f, 0, 1)), 6, 3); ctx.fillStyle = col; ctx.fill(); }
}

function ring(ctx: Ctx, x: number, y: number, r: number, f: number, col: string): void {
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(42,34,54,0.75)'; ctx.fill();
  ctx.lineWidth = 3.5; ctx.strokeStyle = '#5a5276'; ctx.stroke();
  ctx.beginPath(); ctx.arc(x, y, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * clamp(f, 0, 1));
  ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.stroke();
}

function overlays(ctx: Ctx, s: GameState, W: (x: number, y: number) => [number, number], z: number, t: number, vis: (x: number, y: number, w?: number, h?: number) => boolean): void {
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
  const cap = TUNING.workshopOutputCap || 20;
  for (const id in BUILDINGS) {
    const d = BUILDINGS[id];
    if (!vis(d.x, d.y - 2, d.w, d.h + 2)) continue;
    const built = !!s.built[id] || (!!d.startBuilt && !s.sites[id]);
    const [cx, top] = W(d.x + d.w / 2, built ? visualTop(id, s) : d.y);
    if (built && d.kind === 'workshop' && d.recipe) {
      const ws = s.workshops[id];
      if (!ws) continue;
      const bw = Math.min(46, d.w * z * 0.6);
      if (ws.busy) bar(ctx, cx, top - 6, bw, ws.progress / (d.recipe.time || 1), '#7fe0a8'); // progress is seconds
      // output badge (top-right)
      const [bx, by] = W(d.x + d.w - 0.15, visualTop(id, s) + 0.15);
      if (ws.output > 0) {
        const full = ws.output >= cap;
        const txt = String(ws.output);
        ctx.font = FONT(12);
        const w = 26 + ctx.measureText(txt).width;
        pill(ctx, bx, by, w, 20, full ? '#ffd0c4' : '#fff6e0');
        drawItem(ctx, d.recipe.out, bx - w / 2 + 11, by, 6.5);
        ctx.fillStyle = full ? '#b0302a' : OUT; ctx.fillText(txt, bx + 7, by + 0.5);
      }
      if (!ws.busy) {
        // idle bubble: shows the missing input, or "zz" when simply waiting
        let missing: string | null = null;
        for (const k in d.recipe.in) if ((ws.input[k] ?? 0) < d.recipe.in[k]) { missing = k; break; }
        const ix = cx, iy = top - 10 + Math.sin(t * 2.5 + d.x) * 1.5;
        ctx.globalAlpha = 0.92;
        ell(ctx, ix, iy, 13, 11); ctx.fillStyle = '#ece8f4'; ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = OUT; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(ix - 3, iy + 10); ctx.lineTo(ix, iy + 16); ctx.lineTo(ix + 3, iy + 10); ctx.fillStyle = '#ece8f4'; ctx.fill();
        if (ws.output >= cap) { ctx.font = FONT(9); ctx.fillStyle = '#b0302a'; ctx.fillText('FULL', ix, iy + 0.5); }
        else if (missing) {
          ctx.globalAlpha = 0.55; drawItem(ctx, missing, ix, iy, 6.5); ctx.globalAlpha = 1;
          ctx.font = FONT(11); ctx.lineWidth = 3; ctx.strokeStyle = '#ece8f4'; ctx.strokeText('?', ix + 6, iy + 4); ctx.fillStyle = '#b0302a'; ctx.fillText('?', ix + 6, iy + 4);
        } else { ctx.font = FONT(10); ctx.fillStyle = '#6a6286'; ctx.fillText('zz', ix, iy + 0.5); }
        ctx.globalAlpha = 1;
      }
    } else if (built && id === 'shipyard' && s.shipyard?.busy) {
      const time = d.shipRecipe?.time ?? 40;
      bar(ctx, cx, top - 6, 60, s.shipyard.progress / time, '#7ff0d8');
    } else if (built && d.kind === 'board') {
      const py = top - 12 - Math.abs(Math.sin(t * 3)) * 5;
      const pr = 11 + Math.sin(t * 6) * 0.8;
      ctx.beginPath(); ctx.arc(cx, py, pr + 4 + Math.sin(t * 3) * 2, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,190,80,0.25)'; ctx.fill();
      ctx.beginPath(); ctx.arc(cx, py, pr, 0, Math.PI * 2); ctx.fillStyle = '#ffc04a'; ctx.fill(); ctx.lineWidth = 2.5; ctx.strokeStyle = OUT; ctx.stroke();
      ctx.font = FONT(15, 900); ctx.fillStyle = OUT; ctx.fillText('!', cx, py + 1);
    } else if (!built && s.sites[id]) {
      const f = siteFraction(s, id);
      const pct = `${Math.floor(f * 100)}%`;
      const [sx, sy] = W(d.x + d.w / 2, d.y - 0.25 - f * (d.h * 0.55 + 0.8));
      ctx.font = FONT(13);
      const w = ctx.measureText(pct).width + 18;
      pill(ctx, sx, sy - 12, w, 22, '#ffd36a');
      ctx.fillStyle = OUT; ctx.fillText(pct, sx, sy - 11.5);
      bar(ctx, sx, sy + 6, Math.max(36, d.w * z * 0.55), f, '#ffd36a');
      void siteCost;
    }
  }
  // action rings
  const p = s.player;
  if (p.action && p.action.d > 0) {
    const [x, y] = W(p.x + 0.5, p.y - 0.55);
    ring(ctx, x, y, 9, p.action.t / p.action.d, '#ffc04a');
  }
  for (const h of s.helpers) if (h.action && h.action.d > 0 && vis(h.x, h.y)) {
    const [x, y] = W(h.x + 0.5, h.y - 0.45);
    ring(ctx, x, y, 6.5, h.action.t / h.action.d, h.kind === 'porter' ? '#7fe0a8' : '#f2c14e');
  }
  // disappointed crew: little frown bubble
  for (const c of s.crews) if (c.disappointed && c.state === 'leaving' && vis(c.x, c.y)) {
    const [x, y] = W(c.x + 0.5, c.y - 0.45);
    ell(ctx, x, y, 9, 8); ctx.fillStyle = '#ece8f4'; ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = OUT; ctx.stroke();
    ctx.beginPath(); ctx.arc(x, y + 4, 3.5, Math.PI * 1.15, Math.PI * 1.85); ctx.lineWidth = 1.6; ctx.stroke();
    ctx.fillStyle = OUT; ctx.fillRect(x - 3.5, y - 2.5, 2, 2); ctx.fillRect(x + 1.5, y - 2.5, 2, 2);
  }
}
