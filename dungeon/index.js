const dungeon = require('./utils/dungeon.js');
const dice = require('./utils/dice.js');

const { save, get } = require('../utils/output.js');

function create(inputs, store = true) {
  const game = dungeon.generate(
    inputs.perRoomLimits.mobs,
    inputs.perRoomLimits.traps,
    inputs.deployAll.mobs,
    inputs.deployAll.traps,
    inputs.mobs,
    inputs.traps,
    inputs.bosses,
    inputs.roomCount
  );
  if (store) save(game);
  return { data: game };
}

module.exports = { create, dice, get };
