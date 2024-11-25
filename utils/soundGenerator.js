// utils/soundGenerator.js

const objectSounds = [
  '/sounds/door_creak.mp3', 
  '/sounds/footsteps.mp3',
  '/sounds/monster_growl.mp3',
  '/sounds/object_break.mp3', 
];

const ambientSounds = [
  '/sounds/wind_howling.mp3',
  '/sounds/water_drip.mp3',
  '/sounds/distant_screams.mp3',
  '/sounds/dark_ambient.mp3', 
];

function generateRandomSound(type) {
  const soundList = type === 'ambient' ? ambientSounds : objectSounds;
  const randomIndex = Math.floor(Math.random() * soundList.length);
  return soundList[randomIndex];
}

export { generateRandomSound };
