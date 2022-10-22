const roll = (sides = 20, num = 1) => {
  let total = 0;
  for (let i = 1; i <= num; i++) {
    let result = Math.floor(Math.random() * sides) + 1;
    total += result;
  }
  return total;
};

module.exports = { roll };
