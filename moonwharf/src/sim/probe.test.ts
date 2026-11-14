import { newGame } from './state';
import { runBot, newBotMemory } from './bot';
import { era } from './effects';
test('probe dev', () => {
  const s = newGame(7);
  const mem = newBotMemory();
  const r = runBot(s, 3 * 3600, (s) => era(s) >= 5, 0.1, mem);
  console.log(JSON.stringify(r.eraReachedAt), JSON.stringify(r.techAt));
  console.log(mem.log.join('\n'));
  console.log('sat', JSON.stringify(s.satchel), 'ws', JSON.stringify(s.workshops), 'p', JSON.stringify(s.player), 'nodes', JSON.stringify(s.nodes.map(n=>[n.kind,n.amount,n.crop])));
  console.log('coins', s.coins, 'wh', JSON.stringify(s.warehouse), 'shelf', JSON.stringify(s.shelf), 'sites', JSON.stringify(s.sites), 'helpers', s.helpers.map(h=>h.task));
}, 600000);
