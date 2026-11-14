// Save/load, determinism and offline catch-up.
import { catchUp, deserialize, newGame, orderPlayer, serialize, tick } from './api';
import { grant, nodeIndex, run } from './testutil';

describe('persistence', () => {
  it('serialize -> deserialize round-trips a mid-game state exactly', () => {
    const s = newGame(8);
    grant(s, 'bunkhouse', 'lodge', 'drydock');
    orderPlayer(s, { k: 'node', i: nodeIndex(s, 'ore') });
    run(s, 30);
    const json = serialize(s);
    const t = deserialize(json)!;
    expect(t).toEqual(s);
    expect(serialize(t)).toBe(json);
    // and the loaded copy continues identically
    run(s, 20); run(t, 20);
    expect(serialize(t)).toBe(serialize(s));
  });

  it('rejects garbage, wrong versions and broken shapes', () => {
    expect(deserialize('not json')).toBeNull();
    expect(deserialize('null')).toBeNull();
    const s = JSON.parse(serialize(newGame()));
    expect(deserialize(JSON.stringify({ ...s, version: 2 }))).toBeNull();
    expect(deserialize(JSON.stringify({ ...s, coins: 'lots' }))).toBeNull();
    expect(deserialize(JSON.stringify({ ...s, nodes: [] }))).toBeNull();
  });

  it('same seed + same inputs = same game (no hidden randomness)', () => {
    const a = newGame(77), b = newGame(77);
    for (const s of [a, b]) { s.shelf = { ore: 8 }; run(s, 120); }
    expect(serialize(a)).toBe(serialize(b));
    const c = newGame(78);
    c.shelf = { ore: 8 }; run(c, 120);
    expect(serialize(c)).not.toBe(serialize(a));
  });
});

describe('catchUp (offline)', () => {
  it('sells shelf stock at the customer rate, regrows nodes and pays the fleet', () => {
    const s = newGame(1);
    s.shelf = { ingot: 20 };
    s.nodes[nodeIndex(s, 'ore')].amount = 0;
    s.fleet = [{ id: 1, name: 'Wayward Gull', voyage: 0 }];
    const coins = s.coins;
    const ev = catchUp(s, 600);
    expect(s.shelf).toEqual({});                 // 600s = ~120 crews, far more than 20 goods
    expect(s.nodes[nodeIndex(s, 'ore')].amount).toBe(3);
    expect(s.coins).toBe(coins + 20 * 20 + 10 * 2500);
    expect(ev.some((e) => e.t === 'toast' && e.text.startsWith('While you were away'))).toBe(true);
  });

  it('is capped at offlineCapSeconds', () => {
    const s = newGame(1);
    s.fleet = [{ id: 1, name: 'Wayward Gull', voyage: 0 }];
    catchUp(s, 10 * 24 * 3600);
    expect(s.coins).toBe(20 + (28800 / 60) * 2500);
  });

  it('few seconds offline sells only a few goods', () => {
    const s = newGame(1);
    s.shelf = { ore: 8 };
    catchUp(s, 10); // 2 crews, at most 3 goods each
    expect(s.sold).toBeGreaterThanOrEqual(2);
    expect(s.sold).toBeLessThanOrEqual(6);
    tick(s, 0.1);
  });
});
