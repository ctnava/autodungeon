const dice = require('./dice.js');

function prune(entities) {
  let survivors = [];
  let idx = dice.roll(entities.length) - 1;
  survivors.push(entities[idx]);

  let leftovers =
    idx === 0
      ? entities.slice(1, entities.length + 1)
      : idx === entities.length
      ? entities.slice(0, entities.length)
      : [
          ...entities.slice(0, idx),
          ...entities.slice(idx + 1, entities.length + 1),
        ];

  leftovers.forEach((entity) => {
    let dead = dice.roll(2) - 1 === 0;
    if (!dead) survivors.push(entity);
  });

  return survivors;
}

function placement(roomCount, entities, perRoomLimit) {
  let locations = [];
  let labels = [];
  entities.forEach((toPlace) => {
    let deployed = false;
    while (!deployed) {
      let num = dice.roll(roomCount);

      const eligible = {
        limit1: perRoomLimit === 1 && !locations.includes(num),
        multi:
          perRoomLimit !== 1 &&
          locations.filter((n) => n === num).length < perRoomLimit,
      };

      if (eligible.limit1 || eligible.multi) {
        locations.push(num);
        labels.push(toPlace);
        deployed = true;
      }
    }
  });

  return { locations, labels };
}

function dispenseEntities(roomCount, type, locations, labels) {
  let rooms = [];

  for (let location = 1; location <= roomCount; location++) {
    let room = {};
    room[type] = [];

    labels.forEach((label, idx) => {
      if (location === locations[idx]) room[type].push(label);
    });

    rooms.push(room);
  }
  return rooms;
}

function distribute(roomCount, type, entities, perRoomLimit, placeAll) {
  const pruned = placeAll ? entities : prune(entities);
  const { locations, labels } = placement(roomCount, pruned, perRoomLimit);
  const hallways = dispenseEntities(roomCount, type, locations, labels);
  return hallways;
}

module.exports = { distribute };
