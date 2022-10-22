const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

const dice = require('./dice.js');
const dirs = require('../../utils/dirs.js');

const finalPath = () =>
  `./output/images/${
    fs.readdirSync(dirs.pathTo('output', 'data')).length - 1
  }.png`;

async function drawLayer(base, type, entity, coordinates) {
  const { canvas, context } = base;
  const image = await loadImage(dirs.pathTo(type, entity));
  await context.drawImage(image, coordinates.x, coordinates.y);
  await fs.writeFileSync(finalPath(), canvas.toBuffer('image/png'));
}

function selectMap() {
  const selection = dice.roll(fs.readdirSync('./assets/maps').length, 1);
  const mapPath = `./assets/maps/${selection}.png`;
  const coordinates = allCoordinates[selection];
  const dimensions = allDimensions[selection];
  return { selection, mapPath, coordinates, dimensions };
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
  1: { width: 8400, height: 6160 },
  2: { width: 7832, height: 6720 },
  3: { width: 8400, height: 6720 },
};

const offset = (num) => {
  let x, y;
  const defSet = 128;

  const rows = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ];

  let rIdx, cIdx;
  rows.forEach((row, idx) => {
    if (row.includes(num)) {
      rIdx = idx;
      cIdx = row.indexOf(num);
    }
  });

  if (cIdx === 0) x = defSet * 2;
  else if (cIdx === 1) x = defSet;
  else if (cIdx === 2) x = 0;
  else if (cIdx === 3) x = 0 - defSet;

  if (rIdx === 0) y = defSet * 2;
  else if (rIdx === 1) y = defSet;
  else if (rIdx === 2) y = 0;
  else if (rIdx === 3) y = 0 - defSet;

  return { x, y };
};

async function generate(game) {
  const { selection, mapPath, coordinates, dimensions } = selectMap();
  console.log(selection, mapPath, coordinates, dimensions);
  if (selection === 1) {
    let canvas = createCanvas(dimensions.width, dimensions.height);
    let context = canvas.getContext('2d');
    let base = { canvas, context, dimensions };
    console.log(mapPath, finalPath());
    await context.drawImage(
      await loadImage(mapPath),
      0,
      0,
      dimensions.width,
      dimensions.height
    );
    await fs.writeFileSync(finalPath(), canvas.toBuffer('image/png'));

    for await (const room of game) {
      const types = Object.keys(room).filter((key) => key !== 'description');
      let count = 1;
      for await (const type of types) {
        for await (const entity of room[type]) {
          const bossList = fs
            .readdirSync('./assets/bosses')
            .map((name) => name.split('.')[0]);
          const exempt = ['players', ...bossList];

          const set = exempt.includes(entity) ? { x: 0, y: 0 } : offset(count);
          const assetType =
            type === 'traps'
              ? type
              : bossList.includes(entity)
              ? 'bosses'
              : 'mobs';
          console.log(assetType, entity);

          await drawLayer(base, assetType, entity, {
            x: coordinates[game.indexOf(room) + 1].x + set.x,
            y: coordinates[game.indexOf(room) + 1].y + set.y,
          });
          count++;
        }
      }
    }
  }
}

module.exports = { generate };
