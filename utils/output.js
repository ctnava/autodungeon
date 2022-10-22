const fs = require('fs');
const { pathTo } = require('./dirs.js');

function save(data) {
  let outPath = pathTo('output', 'data');
  const files = fs.readdirSync(outPath);
  const cache = JSON.stringify({ data }, undefined, 2);
  const path = `${outPath}/${files.length}.json`;
  fs.writeFileSync(path, cache);
}

function get(id) {
  let outPath = pathTo('output');
  let data = JSON.parse(fs.readFileSync(`${outPath}/data/${id}.json`));
  let image;
  return { data, image };
}

module.exports = { save, get };
