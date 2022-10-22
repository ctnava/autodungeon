const fs = require('fs');

const output = (name) => {
  const outPath = './output';
  if (!fs.existsSync(outPath)) fs.mkdirSync(outPath);
  const img = `${outPath}/images`;
  const dat = `${outPath}/data`;
  if (!fs.existsSync(img)) fs.mkdirSync(img);
  if (!fs.existsSync(dat)) fs.mkdirSync(dat);

  if (name === 'images') return img;
  else if (name === 'data') return dat;
  else throw new Error('utils/dirs:output - Invalid Output Type');
};

const pathTo = (type, name) => {
  if (type === 'output') return output(name);

  const assetPath = './assets';
  const folders = fs.readdirSync(assetPath);
  if (!folders.includes(type))
    throw new Error('utils/dirs:pathTo - Invalid Asset Type');

  const entityPath = `${assetPath}/${type}`;
  const fileNames = fs.readdirSync(entityPath);
  const names = fileNames.map((fileName) => fileName.split('.')[0]);
  if (!names.includes(name))
    throw new Error('utils/dirs:pathTo - Asset Not Found');

  return `${entityPath}/${fileNames[names.indexOf(name)]}`;
};

module.exports = { pathTo };
