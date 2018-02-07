export function getRandomInt(frm, to) {
  const min = Math.ceil(Math.min(frm, to));
  const max = Math.floor(Math.max(frm, to));
  /* eslint-disable no-mixed-operators */
  return Math.floor(Math.random() * (max - min + 1)) + min;
  /* eslint-enable no-mixed-operators */
}

export function getRandomElement(array) {
  return array[getRandomInt(0, array.length - 1)];
}
