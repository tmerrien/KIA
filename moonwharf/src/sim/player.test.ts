// Gathering, crops, stall, workshop and warehouse interactions.
import { carryCap, newGame, orderPlayer, tick } from './api';
import { grant, nodeIndex, run, runUntil, toasts } from './testutil';

describe('gathering', () => {
  it('gathers a finite node until it is empty, then it regrows over time', () => {
    const s = newGame();
    const i = nodeIndex(s, 'wreck'); // max 4, regrow 12s, work 1.1s
    orderPlayer(s, { k: 'node', i });
    const ev = run(s, 15);
    expect(s.satchel.scrap).toBe(4);
    expect(s.nodes[i].amount).toBe(0);
    expect(ev.filter((e) => e.t === 'gather')).toHaveLength(4);
    expect(s.player.action).toBeNull(); // auto-repeat stopped
    run(s, 12.05);
    expect(s.nodes[i].amount).toBe(1);
    run(s, 40);
    expect(s.nodes[i].amount).toBe(4); // capped at max
  });

  it('explains an empty node', () => {
    const s = newGame();
    const i = nodeIndex(s, 'wreck');
    s.nodes[i].amount = 0;
    s.nodes[i].timer = 5;
    s.player.x = 10; s.player.y = 16; // next to the wreck at (10,17)
    expect(toasts(orderPlayer(s, { k: 'node', i }))).toEqual(['Nothing left here. It regrows in 7s.']);
  });

  it('stops when the satchel is full and says where to sell', () => {
    const s = newGame();
    const i = nodeIndex(s, 'ice'); // infinite
    orderPlayer(s, { k: 'node', i });
    const ev = run(s, 30);
    expect(s.satchel.ice).toBe(carryCap(s));
    expect(toasts(ev)).toContain('Your satchel is full. Sell at the market stall.');
    expect(s.player.action).toBeNull();
  });

  it('crop cycle: harvest a ripe bed, it replants itself, then says how long it is still growing', () => {
    const s = newGame();
    const i = nodeIndex(s, 'moss');
    expect(s.nodes[i].crop).toBe('ripe');
    orderPlayer(s, { k: 'node', i });
    runUntil(s, () => s.nodes[i].crop === 'growing', 20);
    expect(s.satchel.moss).toBe(3);           // yield
    expect(s.player.action).toBeNull();
    run(s, 6.5);
    const ev = orderPlayer(s, { k: 'node', i });
    expect(toasts(ev)).toEqual(['Still growing (12s)']);
    runUntil(s, () => s.nodes[i].crop === 'ripe', 20);
    expect(s.nodes[i].crop).toBe('ripe');
  });
});

describe('buildings', () => {
  it('stall moves satchel goods onto the shelf, highest price first, up to shelf capacity', () => {
    const s = newGame();
    s.satchel = { ore: 6, scrap: 4 };          // shelf holds 8
    orderPlayer(s, { k: 'bld', id: 'stall' });
    run(s, 2);
    expect(s.shelf).toEqual({ scrap: 4, ore: 4 });
    expect(s.satchel).toEqual({ ore: 2 });
    const ev = orderPlayer(s, { k: 'bld', id: 'stall' });
    expect(toasts(ev)).toEqual(['The shelf is full. Wait for crews to buy.']);
  });

  it('the job board keeps player.target so the UI can open the tech tree', () => {
    const s = newGame();
    orderPlayer(s, { k: 'bld', id: 'board' });
    run(s, 4);
    expect(s.player.path).toEqual([]);
    expect(s.player.target).toEqual({ k: 'bld', id: 'board' });
  });

  it('workshop: loads inputs from the satchel, crafts over time, hands finished goods back', () => {
    const s = newGame();
    grant(s, 'smelter');
    s.satchel = { ore: 15, scrap: 1 };
    orderPlayer(s, { k: 'bld', id: 'smelter' });
    run(s, 8);
    expect(s.satchel).toEqual({ ore: 3, scrap: 1 }); // input cap is 12 per item
    const ev = run(s, 41); // 8s per ingot
    expect(ev.filter((e) => e.t === 'crafted' && e.item === 'ingot').length).toBeGreaterThanOrEqual(5);
    expect(s.workshops.smelter.output).toBeGreaterThanOrEqual(5);
    orderPlayer(s, { k: 'bld', id: 'smelter' });
    expect(s.satchel.ingot).toBeGreaterThanOrEqual(5);
  });

  it('workshops stop when output reaches workshopOutputCap', () => {
    const s = newGame();
    grant(s, 'smelter');
    s.workshops.smelter.output = 20;
    s.workshops.smelter.input = { ore: 12 };
    run(s, 30);
    expect(s.workshops.smelter.output).toBe(20);
    expect(s.workshops.smelter.input.ore).toBe(12);
  });

  it('warehouse deposits the whole satchel; takeFromWarehouse needs adjacency', async () => {
    const { takeFromWarehouse } = await import('./api');
    const s = newGame();
    grant(s, 'warehouse');
    s.satchel = { ore: 3, ingot: 2 };
    expect(toasts(takeFromWarehouse(s, 'ore', 1))).toEqual(['Walk to the warehouse first.']);
    orderPlayer(s, { k: 'bld', id: 'warehouse' });
    run(s, 10);
    expect(s.satchel).toEqual({});
    expect(s.warehouse).toMatchObject({ ore: 3, ingot: 2 });
    takeFromWarehouse(s, 'ingot', 5);
    expect(s.satchel).toEqual({ ingot: 2 });
    expect(s.warehouse.ingot).toBeUndefined();
  });

  it('orders cancel the current gather', () => {
    const s = newGame();
    s.player.x = 10; s.player.y = 16;
    orderPlayer(s, { k: 'node', i: nodeIndex(s, 'wreck') });
    tick(s, 0.5);
    expect(s.player.action).not.toBeNull();
    orderPlayer(s, { k: 'tile', x: 12, y: 16 });
    expect(s.player.action).toBeNull();
  });
});
