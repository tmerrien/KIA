// Dockhands and porters.
import { BUILDINGS } from './content';
import { buyTech, newGame, tick } from './api';
import { grant, run } from './testutil';
import type { GameEvent } from './types';

function setup(seed = 1) {
  const s = newGame(seed);
  grant(s, 'bunkhouse', 'lodge'); // also grants warehouse, shopfront, smelter, loom
  s.warehouse = {};
  return s;
}

describe('helpers', () => {
  it('one helper per hut, spawned on a walkable tile beside it; extra shifts add one of each', () => {
    const s = setup();
    expect(s.helpers.map((h) => h.kind)).toEqual(['dockhand', 'porter']);
    for (const h of s.helpers) {
      const hut = BUILDINGS[h.kind === 'dockhand' ? 'bunkhouse' : 'lodge'];
      const dx = h.x < hut.x ? hut.x - h.x : h.x >= hut.x + hut.w ? h.x - (hut.x + hut.w - 1) : 0;
      const dy = h.y < hut.y ? hut.y - h.y : h.y >= hut.y + hut.h ? h.y - (hut.y + hut.h - 1) : 0;
      expect(dx + dy).toBe(1);
    }
    grant(s, 'shift2');
    expect(s.helpers.filter((h) => h.kind === 'dockhand')).toHaveLength(2);
    expect(s.helpers.filter((h) => h.kind === 'porter')).toHaveLength(2);
  });

  it('helpers wait without a warehouse', () => {
    const s = setup();
    delete s.built.warehouse;
    run(s, 1);
    expect(s.helpers.every((h) => h.task === 'Waiting for a warehouse')).toBe(true);
  });

  it('dockhands fill the warehouse with raw goods', () => {
    const s = setup();
    const tasks = new Set<string>();
    for (let i = 0; i < 1200; i++) { tick(s, 0.1); tasks.add(s.helpers[0].task); }
    const raw = ['ore', 'moss', 'crystal', 'scrap', 'ice'];
    const stored = raw.reduce((n, it) => n + (s.warehouse[it] ?? 0), 0);
    expect(stored + Object.values(s.workshops).reduce((n, w) => n + Object.values(w.input).reduce((a, b) => a + b, 0), 0)).toBeGreaterThanOrEqual(10);
    expect([...tasks].some((t) => /Harvesting glowmoss|Planting glowmoss/.test(t))).toBe(true);
    expect(tasks.has('Storing goods')).toBe(true);
  });

  it('goods flow node -> warehouse -> workshop -> shelf -> crew without the player', () => {
    const s = setup(4);
    s.player.x = 1; s.player.y = 1; // out of the way, never ordered
    const ev: GameEvent[] = [];
    let smelterFed = false;
    for (let i = 0; i < 6000; i++) {
      ev.push(...tick(s, 0.1));
      if ((s.workshops.smelter.input.ore ?? 0) > 0) smelterFed = true;
    }
    expect(smelterFed).toBe(true);
    expect(ev.some((e) => e.t === 'crafted' && e.item === 'ingot')).toBe(true);
    expect(ev.some((e) => e.t === 'sale' && e.item === 'ingot')).toBe(true);
    expect(ev.some((e) => e.t === 'sale' && e.item === 'sailcloth')).toBe(true);
  });

  it('two helpers never hold the same job claim', () => {
    const s = setup(2);
    grant(s, 'shift2');
    for (let i = 0; i < 3000; i++) {
      tick(s, 0.1);
      const claims = s.helpers.map((h) => h.job?.claim).filter((c): c is string => !!c);
      expect(new Set(claims).size).toBe(claims.length);
    }
  });

  it('porters feed a workshop from the warehouse', () => {
    const s = setup();
    s.helpers = s.helpers.filter((h) => h.kind === 'porter');
    s.warehouse = { ore: 10 };
    const ev = run(s, 45);
    expect(s.warehouse.ore ?? 0).toBe(0);
    expect(ev.filter((e) => e.t === 'crafted' && e.item === 'ingot').length).toBeGreaterThanOrEqual(4);
  });

  it('porters never shelve goods that an open construction site still needs', () => {
    const s = setup();
    grant(s, 'tinker');
    buyTech(s, 'rigger'); // the rigging-shop site needs 10 sailcloth
    s.helpers = s.helpers.filter((h) => h.kind === 'porter');
    s.workshops.loom.output = 6;
    run(s, 60);
    expect(s.shelf.sailcloth ?? 0).toBe(0);
    expect(s.warehouse.sailcloth).toBe(6);
  });
});
