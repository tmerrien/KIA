// End-to-end: era 1 is completable by hand, and a greedy bot can reach every era.
import { ERAS } from './content';
import { buyTech, carryCap, newGame, orderPlayer, pour, shelfCap, siteNeeds, tick } from './api';
import { newBotMemory, runBot } from './bot';
import { era } from './effects';
import type { GameState } from './types';

const total = (b: Record<string, number>) => Object.values(b).reduce((a, c) => a + c, 0);

/** Nearest node of `kinds` with stock, by Manhattan distance from the player. */
function nearestStocked(s: GameState, kinds: string[]): number | null {
  let best: number | null = null, bestD = Infinity;
  s.nodes.forEach((n, i) => {
    if (!n.active || !kinds.includes(n.kind) || n.amount < 1) return;
    const d = Math.abs(n.x - s.player.x) + Math.abs(n.y - s.player.y);
    if (d < bestD) { best = i; bestD = d; }
  });
  return best;
}

describe('playthrough', () => {
  it('new game -> Smelter built, by gathering scrap and ore and selling at the stall', () => {
    const s = newGame(42);
    buyTech(s, 'smelter'); // the site is free
    let hold = 0;
    while (!s.tech.smelter && s.time < 30 * 60) {
      const need = siteNeeds(s, 'smelter')!;
      // hold the pour button whenever we have coins
      if (s.coins > 0 && need.coinsLeft > 0) { pour(s, 'smelter', hold, 0.1); hold += 0.1; } else hold = 0;
      const idle = s.player.path.length === 0 && s.player.action === null;
      if (idle) {
        const scrapNeeded = need.items.scrap ?? 0;
        const full = total(s.satchel) >= carryCap(s);
        const node = nearestStocked(s, scrapNeeded > 0 ? ['wreck'] : ['wreck', 'ore']);
        if (scrapNeeded > 0 && (s.satchel.scrap ?? 0) >= scrapNeeded) orderPlayer(s, { k: 'bld', id: 'smelter' });
        else if ((full || node === null) && total(s.satchel) > 0 && total(s.shelf) < shelfCap(s)) orderPlayer(s, { k: 'bld', id: 'stall' });
        else if (!full && node !== null) orderPlayer(s, { k: 'node', i: node });
      }
      tick(s, 0.1);
    }
    expect(s.built.smelter).toBe(true);
    expect(s.workshops.smelter).toBeDefined();
    console.log(`[playthrough] Smelter built after ${(s.time / 60).toFixed(1)} simulated minutes, ${s.sold} goods sold`);
    expect(s.time).toBeLessThan(15 * 60);
  });
});

describe('balance probe', () => {
  it('a greedy bot reaches every era (logs simulated minutes per era)', () => {
    const s = newGame(7);
    const mem = newBotMemory();
    const r = runBot(s, 20 * 3600, (st) => era(st) >= 5, 0.1, mem);
    const lines = ERAS.map((e) => {
      const t = r.eraReachedAt[e.n];
      return `  era ${e.n} ${e.name.padEnd(10)} ${t === undefined ? 'not reached' : `${(t / 60).toFixed(1)} min`}`;
    });
    const techs = Object.entries(r.techAt).sort((a, b) => a[1] - b[1]).map(([id, t]) => `${id}@${(t / 60).toFixed(0)}m`).join(' ');
    console.log(`[balance probe] greedy bot, seed 7\n${lines.join('\n')}\n  techs: ${techs}`);
    for (const e of ERAS) expect(r.eraReachedAt[e.n]).toBeDefined();
  }, 120000);
});
