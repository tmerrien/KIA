// Customer crews: walk in from the pier, buy from the shelf, walk out.
import { ITEMS } from './content';
import { newGame, orderPlayer, tick } from './api';
import { run } from './testutil';
import type { GameEvent } from './types';

describe('crews', () => {
  it('sell shelf goods end to end: gather -> stall -> crews pay item prices', () => {
    const s = newGame(3);
    s.satchel = { scrap: 4, ore: 4 };
    orderPlayer(s, { k: 'bld', id: 'stall' });
    const start = s.coins;
    const ev: GameEvent[] = [];
    while (s.coins === start && s.time < 60) ev.push(...tick(s, 0.1));
    expect(s.coins).toBeGreaterThan(start);
    const sales = ev.filter((e) => e.t === 'sale');
    expect(sales.length).toBeGreaterThan(0);
    const paid = sales.reduce((a, e) => a + (e.t === 'sale' ? e.coins : 0), 0);
    expect(s.coins - start).toBe(paid);
    for (const e of sales) if (e.t === 'sale') expect(e.coins).toBe(ITEMS[e.item].price);
    run(s, 120);
    expect(s.shelf).toEqual({});
    expect(s.sold).toBe(8);
    expect(s.earned).toBe(4 * 4 + 4 * 3);
  });

  it('crews walk the pier to the market spot and leave again; an empty shelf disappoints them', () => {
    const s = newGame(5);
    let sawShopping = false, sawDisappointed = false;
    for (let i = 0; i < 600; i++) {
      tick(s, 0.1);
      for (const c of s.crews) {
        if (c.state === 'shopping') { sawShopping = true; expect([c.x, c.y]).toEqual([17, 19]); }
        if (c.disappointed) sawDisappointed = true;
      }
    }
    expect(sawShopping).toBe(true);
    expect(sawDisappointed).toBe(true);
    expect(s.coins).toBe(20);
  });

  it('crews arrive roughly every customerInterval / customerRate seconds', () => {
    const s = newGame(9);
    let spawned = 0;
    const seen = new Set<number>();
    for (let i = 0; i < 3000; i++) {
      tick(s, 0.1);
      for (const c of s.crews) if (!seen.has(c.id)) { seen.add(c.id); spawned++; }
    }
    expect(spawned).toBeGreaterThan(300 / 5 * 0.8);
    expect(spawned).toBeLessThan(300 / 5 * 1.25);
  });
});
