const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

const dirs = require('../../utils/dirs.js');

const filePath = () => {
  const imgDir = dirs.pathTo('outputs', 'images');
  const datDir = dirs.pathTo('outputs', 'data');
  const num = fs.readdirSync(datDir).length;
  return `${imgDir}/${num}.png`;
};

function generate(game) {
  const pathTo = filePath();
}

module.exports = { generate };
