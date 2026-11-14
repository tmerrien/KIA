import { newGame } from './state';
import { runBot, newBotMemory, botGoal, botStep } from './bot';
test('dbg', () => {
  const s = newGame(7);
  const mem = newBotMemory();
  runBot(s, 3000, () => false, 0.1, mem);
  let last = '';
  for (let i = 0; i < 3000; i++) {
    botStep(s, mem, 0.1);
    const t = JSON.stringify(s.player.target) + ' ' + JSON.stringify(s.satchel);
    if (t !== last) { console.log(s.time.toFixed(1), botGoal(s)?.id, Math.round(s.coins), JSON.stringify(s.shelf), t, JSON.stringify(s.workshops.loom), JSON.stringify(s.nodes.slice(10,13).map(n=>n.crop))); last = t; }
  }
});
