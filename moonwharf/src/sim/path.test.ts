// Pathing, walkability and map queries.
import { buyTech, footprint, isAdjacent, isWalkable, newGame, orderPlayer, refAt, tick } from './api';
import { findPath } from './path';
import { run, toasts } from './testutil';

describe('walkability', () => {
  it("'.', '=' and 'P' are walkable; '#' and ' ' are not", () => {
    const s = newGame();
    expect(isWalkable(s, 1, 1)).toBe(true);    // '.'
    expect(isWalkable(s, 5, 19)).toBe(true);   // '='
    expect(isWalkable(s, 18, 22)).toBe(true);  // 'P'
    expect(isWalkable(s, 0, 0)).toBe(false);   // '#'
    expect(isWalkable(s, 10, 22)).toBe(false); // ' '
    expect(isWalkable(s, -1, 5)).toBe(false);  // off map
  });

  it('active nodes, built buildings and sites block their tiles; inactive nodes do not', () => {
    const s = newGame();
    expect(isWalkable(s, 3, 3)).toBe(false);   // active ore node
    expect(isWalkable(s, 3, 14)).toBe(true);   // inactive moss bed
    expect(isWalkable(s, 17, 17)).toBe(false); // market stall (start built)
    expect(isWalkable(s, 9, 7)).toBe(true);    // smelter not built yet
    buyTech(s, 'smelter');                     // creates a site
    expect(isWalkable(s, 9, 7)).toBe(false);
    expect(isWalkable(s, 10, 8)).toBe(false);
  });
});

describe('queries', () => {
  it('refAt maps tiles to nodes, buildings and plain tiles; footprint gives their rectangles', () => {
    const s = newGame();
    expect(refAt(s, 3, 3)).toEqual({ k: 'node', i: 0 });
    expect(refAt(s, 18, 18)).toEqual({ k: 'bld', id: 'stall' });
    expect(refAt(s, 9, 7)).toEqual({ k: 'tile', x: 9, y: 7 });
    expect(footprint(s, { k: 'bld', id: 'stall' })).toEqual({ x: 16, y: 17, w: 3, h: 2 });
    expect(footprint(s, { k: 'node', i: 0 })).toEqual({ x: 3, y: 3, w: 1, h: 1 });
  });
});

describe('BFS pathing', () => {
  it('walks around an obstacle with 4-direction unit steps', () => {
    const s = newGame();
    // ore node at (5,2) sits between (4,2) and (6,2)
    const p = findPath(s, 4, 2, { k: 'tile', x: 6, y: 2 })!;
    expect(p).toHaveLength(4);
    expect(p.some(([x, y]) => x === 5 && y === 2)).toBe(false);
    let [px, py] = [4, 2];
    for (const [x, y] of p) {
      expect(Math.abs(x - px) + Math.abs(y - py)).toBe(1);
      expect(isWalkable(s, x, y)).toBe(true);
      [px, py] = [x, y];
    }
  });

  it('paths to an edge-adjacent tile of a footprint, never a diagonal one', () => {
    const s = newGame();
    const p = findPath(s, 1, 1, { k: 'node', i: 0 })!; // ore at (3,3)
    const [x, y] = p[p.length - 1];
    expect(Math.abs(x - 3) + Math.abs(y - 3)).toBe(1);
  });

  it('returns [] when already adjacent and null when unreachable', () => {
    const s = newGame();
    expect(findPath(s, 3, 2, { k: 'node', i: 0 })).toEqual([]);
    expect(findPath(s, 17, 16, { k: 'tile', x: 0, y: 0 })).toBeNull();
    expect(findPath(s, 17, 16, { k: 'tile', x: 10, y: 23 })).toBeNull();
  });

  it("an unreachable order toasts \"Can't get there.\" and leaves the player idle", () => {
    const s = newGame();
    const ev = orderPlayer(s, { k: 'tile', x: 12, y: 23 });
    expect(toasts(ev)).toEqual(["Can't get there."]);
    expect(s.player.target).toBeNull();
    expect(s.player.path).toEqual([]);
  });
});

describe('movers', () => {
  it('the player moves along tile centers at walkSpeed and stops on the target tile', () => {
    const s = newGame();
    orderPlayer(s, { k: 'tile', x: 20, y: 16 });
    tick(s, 0.5); // 3.1 tiles/s
    expect(s.player.x).toBeCloseTo(18.55, 5);
    expect(s.player.y).toBe(16);
    run(s, 2);
    expect([s.player.x, s.player.y]).toEqual([20, 16]);
    expect(s.player.path).toEqual([]);
    expect(s.player.target).toBeNull(); // plain tiles clear the target on arrival
  });

  it('isAdjacent is true once the player stands still next to the ref', () => {
    const s = newGame();
    const stall = { k: 'bld', id: 'stall' } as const;
    orderPlayer(s, { k: 'tile', x: 10, y: 10 });
    run(s, 5);
    expect(isAdjacent(s, stall)).toBe(false);
    orderPlayer(s, stall);
    run(s, 6);
    expect(isAdjacent(s, stall)).toBe(true);
  });

  it('placing a site on top of a mover nudges it to the nearest walkable tile', () => {
    const s = newGame();
    s.player.x = 9; s.player.y = 7; // inside the future smelter footprint
    buyTech(s, 'smelter');
    expect(isWalkable(s, s.player.x, s.player.y)).toBe(true);
    expect(Math.abs(s.player.x - 9) + Math.abs(s.player.y - 7)).toBe(1);
  });

  it('a walking player re-routes around a site that appears on its path', () => {
    const s = newGame();
    s.player.x = 8; s.player.y = 7;
    orderPlayer(s, { k: 'tile', x: 12, y: 7 }); // straight line through the smelter footprint (9..10, 7..8)
    buyTech(s, 'smelter');
    expect(s.player.path.some(([x, y]) => x >= 9 && x <= 10 && y >= 7 && y <= 8)).toBe(false);
    run(s, 5);
    expect([s.player.x, s.player.y]).toEqual([12, 7]);
  });
});
