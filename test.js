const dungeon = require('./dungeon/index.js');
const { pathTo } = require('./utils/dirs.js');

const test = (name, callback) => {
  let out;
  console.log(`\nTesting ${name} Output...`);
  try {
    out = callback();
  } catch (error) {
    console.log(`${name} Test Failed:\n${error}`);
    process.exit(1);
  }
  console.log(`${name} Test Passed!`);
  if (out !== undefined) return out;
};

function diceTest() {
  test('Dice', () => {
    function roll(sides, num) {
      const out = dungeon.dice.roll(sides, num);
      if (out > sides * num || out < num)
        throw new Error(
          `dungeon/utils/dice:roll - unexpected output: ${out}\ninput:${num}d${sides} min:${num} max:${
            sides * num
          }`
        );
    }
    roll(20, 1);
    roll(20, 2);
    roll(20, 10);

    roll(6, 1);
    roll(6, 2);
    roll(6, 10);

    roll(4, 1);
    roll(4, 2);
    roll(4, 10);

    roll(2, 1);
    roll(2, 2);
    roll(2, 10);
  });
}

function testDirs() {
  test('Directory', () => {
    let path;
    path = pathTo('maps', '1');
    console.log(path);
    path = pathTo('mobs', 'goblin');
    console.log(path);
    path = pathTo('bosses', 'mummyWizard');
    console.log(path);
    //   path = pathTo('traps', 'acidPit');
    //   console.log(path);
  });
}

function testDungeon() {
  const out = test('Dungeon', () => {
    const defaults = {
      roomCount: 6,
      perRoomLimits: { mobs: 3, trapLimit: 3 },
      deployAll: { mobs: true, traps: true },
      mobs: ['zombie', 'goblin', 'golem'],
      traps: ['boulder', 'acidPit', 'lTurret'],
      bosses: ['ghostSharks', 'mummyWizard', 'tRex'],
    };
    return dungeon.create(defaults);
  });
  return out;
}

function main() {
  diceTest();
  testDirs();
  const { data } = testDungeon();
  console.log(data);
  console.log();
}

main();
