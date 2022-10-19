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

function onePer(roomCount, entities, placeAll) {
  let locations = [];
  let labels = [];
  entities.forEach((toPlace) => {
    let deployed = false;
    while (!deployed) {
      let num = dice.roll(roomCount);
      if (!locations.includes(num)) {
        locations.push(num);
        labels.push(toPlace);
        deployed = true;
      }
    }
  });

  return { locations, labels };
}

function randomize(roomCount, entities, perRoomLimit, placeAll) {
  let pruned = placeAll ? entities : prune(entities);
  if (perRoomLimit === 1) output = onePer(roomCount, pruned, placeAll);

  return output;
}

function dispenseEntities(roomCount, type, locations, labels) {
  let rooms = [];

  for (let i = 1; i <= roomCount; i++) {
    let room = {};
    room[type] = [];

    if (locations.includes(i)) {
      room[type].push(labels[locations.indexOf(i)]);
    }

    rooms.push(room);
  }

  return rooms;
}

function distribute(
  roomCount,
  type,
  entities,
  perRoomLimit = 1,
  placeAll = true
) {
  let { locations, labels } = randomize(
    roomCount,
    entities,
    perRoomLimit,
    placeAll
  );

  return dispenseEntities(roomCount, type, locations, labels);
}

module.exports = { distribute, prune };
