const dungeon = require('./utils/dungeon.js');
const dice = require('./utils/dice.js');

const options = {
  perRoomLimits: { mobs: 3, trapLimit: 3 },
  deployAll: { mobs: true, traps: true },
  mobs: ['zombie', 'goblin', 'golem'],
  traps: ['boulder', 'acidPit', 'lTurret'],
  bosses: ['ghostSharks', 'mummyWizard', 'tRex'],
};

const { mobs, traps, bosses, roomCount } = options;
const mobLimit = options.perRoomLimits.mobs;
const trapLimit = options.perRoomLimits.traps;
const deployAllMobs = options.deployAll.mobs;
const deployAllTraps = options.deployAll.traps;

console.log(
  'Generated Dungeon',
  dungeon.generate(
    mobLimit,
    trapLimit,
    deployAllMobs,
    deployAllTraps,
    mobs,
    traps,
    bosses,
    roomCount
  )
);
