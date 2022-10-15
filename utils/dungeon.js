const dice = require('./dice.js');

function trapPlacement(
  roomCount = 6,
  traps = ['boulder', 'acidPit', 'lTurret']
) {
  if (roomCount < 1 || traps.length < 1)
    throw new error('trapPlacement: invalid parameters');

  let locations = [];
  let types = [];
  traps.forEach((toPlace) => {
    let deployed = false;
    while (!deployed) {
      let num = dice.roll(roomCount);
      if (!locations.includes(num)) {
        locations.push(num);
        types.push(toPlace);
        deployed = true;
      }
    }
  });

  return { locations, types };
}

function mobPlacement(roomCount = 6, mobs = ['zombie', 'goblin', 'golem']) {
  if (roomCount < 1 || mobs.length < 1)
    throw new error('trapPlacement: invalid parameters');
}

function generate(
  roomCount = 6,
  mobs = ['zombie', 'goblin', 'golem'],
  traps = ['boulder', 'acidPit', 'lTurret'],
  bosses = ['ghostSharks', 'mummyWizard', 'tRex']
) {
  if (roomCount < 1 || mobs.length < 1 || traps.length < 1)
    throw new error('createRooms: invalid parameters');

  const trap = trapPlacement(roomCount, traps);
  const mob = mobPlacement(roomCount, mobs);

  let rooms = [];
  rooms.push({ description: 'Entry', trap: undefined, mobs: ['players'] });

  for (let i = 1; i <= roomCount; i++) {
    let room = { description: 'dungeon', trap: undefined, mobs: [] };

    if (trap.locations.includes(i)) {
      const idx = trap.locations.indexOf(i);
      room.trap = trap.types[idx];
    }

    rooms.push(room);
  }

  const bossIdx = Math.floor(Math.random() * bosses.length);

  rooms.push({
    description: 'endgame',
    trap: undefined,
    mobs: [bosses[bossIdx]],
  });

  return rooms;
}

module.exports = { generate };
