const dungeon = require('./utils/dungeon.js');
const dice = require('./utils/dice.js');

let stop = false;
let counter = 0;

while (!stop) {
  let game = dungeon.generate();
  counter++;
  game.forEach((room) => {
    let allMobsSpawned = room.mobs.length === 3;
    let allTrapsSpawned = room.traps.length === 3;
    if (allMobsSpawned && allTrapsSpawned) {
      stop = true;
      console.log(
        `\nA horrible time was generated in ${counter} attempts...\n`
      );
      console.log(`Map Layout`, game, `\n`);
    }
  });
}
