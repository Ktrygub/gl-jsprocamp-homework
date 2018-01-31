/*
  Напишите функцию, которая параметрами принимает 2 числа и возвращает их сумму
*/

//------------------------------------------------------------------------------------------
// sum(0.1, 0.2) === 0.3
//------------------------------------------------------------------------------------------

function sum(a = 0, b = 0) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Invalid argument type');
  }

  return parseFloat((a + b).toFixed(12));
}

/*
  Напишите функцию, которая возвращает сумму всех чисел, что передаются параметрами
*/

//------------------------------------------------------------------------------------------
// sumAll(0.1, 0.2, 0.3) === 0.6
//------------------------------------------------------------------------------------------

function sumAll(...rest) {
  const args = [...rest];

  args.forEach(el => {
    if (typeof el !== 'number') {
      throw new TypeError('Invalid argument type');
    }
  });

  const result = args.reduce((sum, el) => sum + el, 0);

  return parseFloat(result.toFixed(12));
}

/*
  Напишите функцию, которая возвращает число x в степень n
*/

function pow(x, n) {
  if (typeof x !== 'number' || typeof n !== 'number') {
    throw new TypeError('Invalid argument type');
  }
  return x ** n;
}

/*
  Напишите функцию, которая возвращает рандомное целое число от from до to
*/

//------------------------------------------------------------------------------------------
// random(0, 2) should behave same as random(2, 0)
// random(-0.8, 2.7) should returns between [0, 2]
// Throws 'Invalid parameters' Error if from/to is not a finite number
// Throws if length of [from, to] interval is greater than Number.MAX_VALUE
//------------------------------------------------------------------------------------------

function random(frm, to) {
  if (!Number.isFinite(frm) || !Number.isFinite(to)) {
    throw new Error('Interval should have finite length');
  }

  const min = Math.trunc(Math.min(frm, to));
  const max = Math.trunc(Math.max(frm, to));

  if (max - min > Number.MAX_VALUE) {
    throw new Error('Length of [from, to] interval could not be greater than Number.MAX_VALUE');
  }
  /* eslint-disable no-mixed-operators */
  return Math.floor(Math.random() * (max - min + 1)) + min;
  /* eslint-enable no-mixed-operators */
}

export default {
  sum,
  sumAll,
  pow,
  random,
};
