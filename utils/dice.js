const roll = (sides = 20, num = 1) => {
  let total = 0;
  for (let i = 1; i <= num; i++) {
    let result = 0;
    while (result === 0) {
      result = Math.floor(Math.random() * sides);
    }
    total += result;
  }
  return total;
};

module.exports = { roll };
