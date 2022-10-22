const { distribute } = require('./distribution.js');

function generate(
  mobLimit = 3,
  trapLimit = 3,
  deployAllMobs = true,
  deployAllTraps = true,
  mobs = ['zombie', 'goblin', 'golem'],
  traps = ['boulder', 'acidPit', 'lTurret'],
  bosses = ['ghostSharks', 'mummyWizard', 'tRex'],
  roomCount = 6
) {
  if (roomCount < 3) throw new error('generate: invalid roomCount');
  if (traps.length < 3) throw new error('generate: invalid trap array');
  if (mobs.length < 3) throw new error('generate: invalid mob array');

  // generating individual placements by entity types
  const trapPlacement = distribute(
    roomCount,
    'traps',
    traps,
    trapLimit,
    deployAllTraps
  );
  const mobPlacement = distribute(
    roomCount,
    'mobs',
    mobs,
    mobLimit,
    deployAllMobs
  );

  // aggregating placement data
  let entityPlacement = [];
  mobPlacement.forEach((mob, idx) => {
    entityPlacement.push({ ...mob, ...trapPlacement[idx] });
  });

  // applying aggregate data
  let rooms = [];
  rooms.push({ description: 'entrance', mobs: ['players'], traps: [] });
  for (let i = 1; i <= roomCount; i++) {
    rooms.push({ description: 'hallways', ...entityPlacement[i - 1] });
  }
  const bossIdx = Math.floor(Math.random() * bosses.length);
  rooms.push({
    description: 'bossRoom',
    mobs: [bosses[bossIdx]],
    traps: [],
  });

  // dungeon generated
  return rooms;
}

module.exports = { generate };
