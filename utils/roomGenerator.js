// utils/roomGenerator.js

function generateRoom() {
  const rows = 10;
  const cols = 10;
  const room = [];

  for (let y = 0; y < rows; y++) {
    const row = [];
    for (let x = 0; x < cols; x++) {
      row.push(Math.random() > 0.7 ? 1 : 0); // 70% chance of being a wall (1)
    }
    room.push(row);
  }
  return room;
}

export default generateRoom;
