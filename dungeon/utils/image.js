const fs = require('fs');
const canvas = require('canvas');
const dirs = require('../../utils/dirs.js');
const { get } = require('../../utils/output.js');

const filePath = () => {
  const imgDir = dirs.pathTo('outputs', 'images');
  const datDir = dirs.pathTo('outputs', 'data');
  const num = fs.readdirSync(datDir).length;
  return `${imgDir}/${num}.png`;
};

function generate(game) {
  //
}

module.exports = { generate };
