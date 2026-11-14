// Tech, construction sites + pouring, automation, drydock contracts, shipyard and fleet.
import { TECH_BY_ID, TUNING } from './content';
import {
  buyTech, canAfford, carryCap, era, fulfillContract, newGame, orderPlayer, pour, shelfCap, siteNeeds, techStatus, tick,
} from './api';
import { pourRate } from './economy';
import { grant, run, toasts } from './testutil';

describe('tech', () => {
  it('statuses: available, locked, site, owned', () => {
    const s = newGame();
    expect(techStatus(s, 'satchel')).toBe('available');
    expect(techStatus(s, 'boots')).toBe('locked');
    buyTech(s, 'smelter');
    expect(techStatus(s, 'smelter')).toBe('site');
    grant(s, 'smelter');
    expect(techStatus(s, 'smelter')).toBe('owned');
    expect(techStatus(s, 'boots')).toBe('available');
  });

  it('a tech without `build` is bought instantly with coins and items and applies its effect', () => {
    const s = newGame();
    expect(toasts(buyTech(s, 'satchel'))).toEqual(['You need 40 more coins.']);
    s.coins = 100;
    const ev = buyTech(s, 'satchel');
    expect(ev).toContainEqual({ t: 'tech', tech: 'satchel' });
    expect(s.coins).toBe(40);
    expect(carryCap(s)).toBe(20);
  });

  it('item costs come from the satchel first, then the warehouse', () => {
    const s = newGame();
    grant(s, 'shopfront', 'warehouse');
    s.satchel = { ingot: 3 };
    s.warehouse = { ingot: 10 };
    expect(canAfford(s, 7000, { ingot: 10 })).toBe(false);
    s.coins = 7000;
    grant(s, 'bunkhouse');
    s.coins = 7000;
    expect(canAfford(s, 7000, { ingot: 10 })).toBe(true);
    buyTech(s, 'domes');
    expect(s.tech.domes).toBe(true);
    expect(s.satchel.ingot).toBeUndefined();
    expect(s.warehouse.ingot).toBe(3);
    expect(s.nodes.filter((n) => n.kind === 'moss' && n.active)).toHaveLength(9); // activateNodes
  });

  it('locked techs explain what they need', () => {
    const s = newGame();
    expect(toasts(buyTech(s, 'cutter'))).toEqual(['Requires Smelter first.']);
  });

  it('era is the highest era among owned techs (min 1)', () => {
    const s = newGame();
    expect(era(s)).toBe(1);
    grant(s, 'smelter');
    expect(era(s)).toBe(1);
    grant(s, 'boots');
    expect(era(s)).toBe(2);
  });

  it('effects: shelf and speed', () => {
    const s = newGame();
    grant(s, 'shopfront');
    expect(shelfCap(s)).toBe(30);
    grant(s, 'boots');
    orderPlayer(s, { k: 'tile', x: 25, y: 16 });
    tick(s, 1);
    expect(s.player.x).toBeCloseTo(17 + 3.1 * 1.4, 5);
  });
});

describe('construction sites', () => {
  it('buying a build tech creates a free site; pour + delivery complete it', () => {
    const s = newGame();
    const cost = TECH_BY_ID.smelter.cost; // 150 coins + 4 scrap
    buyTech(s, 'smelter');
    expect(s.coins).toBe(20);
    expect(siteNeeds(s, 'smelter')).toEqual({ coinsLeft: cost, items: { scrap: 4 } });

    // pour: rate = max(minRate, cost * (baseFraction + accelPerSecond * hold))
    s.coins = 1000;
    const ev = pour(s, 'smelter', 0, 0.1);
    expect(ev[0]).toEqual({ t: 'poured', building: 'smelter', coins: pourRate(cost, 0) * 0.1 });
    expect(pourRate(cost, 0)).toBeCloseTo(cost * TUNING.pour.baseFraction);
    expect(pourRate(cost, 2)).toBeCloseTo(cost * (0.25 + 0.9 * 2));
    expect(pourRate(4, 0)).toBe(TUNING.pour.minRate);
    let hold = 0.1;
    while (siteNeeds(s, 'smelter')!.coinsLeft > 0) { pour(s, 'smelter', hold, 0.1); hold += 0.1; }
    expect(s.coins).toBe(1000 - cost);
    expect(s.built.smelter).toBeUndefined(); // still needs scrap

    s.satchel = { scrap: 6 };
    orderPlayer(s, { k: 'bld', id: 'smelter' });
    const done = run(s, 6);
    expect(done).toContainEqual({ t: 'built', building: 'smelter' });
    expect(done).toContainEqual({ t: 'tech', tech: 'smelter' });
    expect(s.satchel).toEqual({ scrap: 2 });
    expect(s.sites.smelter).toBeUndefined();
    expect(s.workshops.smelter).toEqual({ input: {}, output: 0, busy: false, progress: 0 });
  });

  it('pouring is limited by coins in hand', () => {
    const s = newGame();
    buyTech(s, 'smelter');
    s.coins = 10;
    for (let i = 0; i < 20; i++) pour(s, 'smelter', 1, 0.1);
    expect(s.coins).toBe(0);
    expect(siteNeeds(s, 'smelter')!.coinsLeft).toBe(140);
  });

  it('a site pulls missing items from the warehouse too', () => {
    const s = newGame();
    grant(s, 'warehouse', 'tinker');
    buyTech(s, 'rigger');
    s.warehouse = { tools: 4, sailcloth: 7 };
    s.satchel = { sailcloth: 3 };
    orderPlayer(s, { k: 'bld', id: 'rigger' });
    run(s, 10);
    expect(siteNeeds(s, 'rigger')!.items).toEqual({});
    expect(s.warehouse).toEqual({});
  });
});

describe('automation (Cargo rails)', () => {
  it('workshops pull inputs from and push outputs to the warehouse; the shelf restocks itself', () => {
    const s = newGame();
    grant(s, 'rails', 'tinker'); // tinker consumes ingots, so the shelf must leave 20 in the warehouse
    s.helpers = []; // isolate automation from porters/dockhands
    s.warehouse = { ore: 30, scrap: 20, ingot: 25, fuelcell: 3 };
    s.shelf = {};
    run(s, 0.6);
    const sm = s.workshops.smelter;
    expect(sm.input.ore! + (sm.busy ? 2 : 0)).toBe(12); // filled to workshopInputCap, one batch may have started
    expect(s.workshops.tinker.input.ingot! + (s.workshops.tinker.busy ? 1 : 0)).toBe(12);
    // shelf: highest tier first; ingots stay because the warehouse is below the 20 reserve
    expect(s.shelf).toEqual({ fuelcell: 3 });
    const ev = run(s, 60);
    expect(ev.filter((e) => e.t === 'crafted' && e.item === 'tools').length).toBeGreaterThan(0);
    expect(s.workshops.smelter.output).toBe(0);       // outputs are pushed out every 0.5s
    expect(s.workshops.tinker.output).toBe(0);
    expect(s.warehouse.tools ?? 0).toBe(0);            // new tool kits went on to the shelf
    expect(s.shelf.ingot ?? 0).toBe(0);
  });

  it('nothing moves without the automation effect', () => {
    const s = newGame();
    grant(s, 'warehouse');
    s.helpers = [];
    s.warehouse = { ore: 30 };
    run(s, 2);
    expect(s.workshops.smelter.input).toEqual({});
  });
});

describe('drydock contracts', () => {
  it('keeps 3 contracts of built products; reward = sum(price * qty) * contractMultiplier', () => {
    const s = newGame(11);
    grant(s, 'drydock');
    tick(s, 0.1);
    expect(s.contracts).toHaveLength(3);
    for (const c of s.contracts) {
      expect(c.ship.length).toBeGreaterThan(0);
      let v = 0;
      for (const [it, n] of Object.entries(c.items)) {
        expect(['ingot', 'sailcloth', 'ration', 'fuelcell', 'tools', 'rigging', 'engine']).toContain(it);
        v += ({ ingot: 20, sailcloth: 22, ration: 18, fuelcell: 40, tools: 55, rigging: 120, engine: 180 } as Record<string, number>)[it] * n;
      }
      expect(c.reward).toBe(Math.round(v * TUNING.contractMultiplier));
    }
  });

  it('fulfilling pays the reward, takes the goods and a new contract appears', () => {
    const s = newGame(11);
    grant(s, 'drydock');
    tick(s, 0.1);
    const c = s.contracts[0];
    expect(toasts(fulfillContract(s, c.id))[0]).toContain('needs');
    s.warehouse = { ...c.items };
    const coins = s.coins;
    expect(fulfillContract(s, c.id)).toEqual([{ t: 'contract', ship: c.ship, coins: c.reward }]);
    expect(s.coins).toBe(coins + c.reward);
    expect(s.warehouse).toEqual({});
    expect(s.contracts).toHaveLength(3);
    expect(s.contracts.find((k) => k.id === c.id)).toBeUndefined();
  });
});

describe('shipyard and fleet', () => {
  it('the shipyard consumes its recipe from the warehouse and launches a ship', () => {
    const s = newGame();
    grant(s, 'shipyard');
    s.warehouse = { ingot: 6, engine: 2, rigging: 2, solarsail: 1 };
    s.helpers = [];
    run(s, 0.2);
    expect(s.shipyard!.busy).toBe(true);
    expect(s.warehouse).toEqual({});
    const ev = run(s, 40);
    expect(s.fleet).toHaveLength(1);
    expect(s.fleet[0].name).toBe('Wayward Gull');
    expect(ev.some((e) => e.t === 'toast')).toBe(true);
  });

  it('each ship pays fleetVoyageIncome * fleetIncome every fleetVoyageSeconds', () => {
    const s = newGame();
    s.fleet = [{ id: 1, name: 'Brass Comet', voyage: 0 }, { id: 2, name: 'Quiet Tern', voyage: 30 }];
    const coins = s.coins;
    let ev = run(s, 60.05);
    expect(ev.filter((e) => e.t === 'voyage')).toHaveLength(2);
    expect(s.coins).toBe(coins + 2 * 2500);
    grant(s, 'charters');
    const before = s.coins;
    ev = run(s, 60);
    expect(ev.filter((e) => e.t === 'voyage').map((e) => (e as { coins: number }).coins)).toEqual([5000, 5000]);
    expect(s.coins).toBe(before + 10000);
  });
});
