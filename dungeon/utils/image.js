const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

const dice = require('./dice.js');
const dirs = require('../../utils/dirs.js');

const finalPath = () =>
  `${dirs.pathTo('outputs', 'images')}/${
    fs.readdirSync(dirs.pathTo('outputs', 'data')).length
  }.png`;

async function drawLayer(base, type, entity, x = 0, y = 0) {
  const { canvas, context } = base;
  const image = await loadImage(dirs.pathTo(type, entity));
  await context.drawImage(image, x, y, dimensions.width, dimensions.height);
  await fs.writeFileSync(finalPath(), canvas.toBuffer('image/png'));
}

function selectMap() {
  const selection = dice.roll(fs.readdirSync('./assets/maps').length, 1);
  const mapPath = dirs.pathTo('maps', `${selection}`);
  const coordinates = allCoordinates[selection];
  const dimensions = allDimensions[selection];
  return { mapPath, coordinates, dimensions };
}

// center of the room
const allCoordinates = {
  1: {
    1: { x: 1400, y: 4700 },
    2: { x: 1400, y: 3070 },
    3: { x: 3070, y: 3070 },
    4: { x: 4760, y: 3070 },
    5: { x: 4760, y: 1400 },
    6: { x: 6440, y: 1400 },
    7: { x: 6440, y: 3070 },
    8: { x: 6440, y: 4900 },
  },
  2: {
    1: { x: 0, y: 0 },
    2: { x: 0, y: 0 },
    3: { x: 0, y: 0 },
    4: { x: 0, y: 0 },
    5: { x: 0, y: 0 },
    6: { x: 0, y: 0 },
    7: { x: 0, y: 0 },
    8: { x: 0, y: 0 },
  },
  3: {
    1: { x: 0, y: 0 },
    2: { x: 0, y: 0 },
    3: { x: 0, y: 0 },
    4: { x: 0, y: 0 },
    5: { x: 0, y: 0 },
    6: { x: 0, y: 0 },
    7: { x: 0, y: 0 },
    8: { x: 0, y: 0 },
  },
};

const allDimensions = {
  1: { height: 8400, width: 6160 },
  2: { height: 7832, width: 6720 },
  3: { height: 8400, width: 6720 },
};

async function generate(game) {
  const { mapPath, coordinates, dimensions } = selectMap();
  let canvas = createCanvas(dimensions.width, dimensions.height);
  let context = canvas.getContext('2d');
  let base = { canvas, context };

  for await (const room of game) {
    const types = Object.keys(room).filter((key) => key !== 'description');
    for await (const type of types) {
      for await (const entity of room[type]) {
        console.log(entity);
      }
    }
  }
}

module.exports = { generate };
