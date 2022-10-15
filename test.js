const dungeon = require('./utils/dungeon.js');
const dice = require('./utils/dice.js');

console.log('Generated Crypt', dungeon.generate());
console.log('Rolling 2d20... Result:', dice.roll(20, 2));
