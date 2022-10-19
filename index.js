const dungeon = require('./utils/dungeon.js');
const dice = require('./utils/dice.js');

dungeon.generate(
  (mobLimit = 1), // perRoom
  (trapLimit = 1), // perRoom
  (deployAllMobs = true),
  (deployAllTraps = true),
  (mobs = ['zombie', 'goblin', 'golem']), // min 3
  (traps = ['boulder', 'acidPit', 'lTurret']), // min 3
  (bosses = ['ghostSharks', 'mummyWizard', 'tRex']),
  (roomCount = 6) // min 3
);
