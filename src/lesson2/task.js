/*
  Напишите функцию, которая параметрами принимает 2 числа и возвращает их сумму
*/
export function sum(a, b) {
  return a + b;
}

/*
  Напишите функцию, которая возвращает сумму всех чисел, что передаются параметрами
*/
// Adding any amount of numbers
// Throws an 'Invalid parameters' Error if any of the arguments is Oject, Array or Boolean type
export function sumAll(...rest) {
  const args = [...rest];
  const invalidTypes = ['object', 'boolean', 'string'];

  if (args.length === 0) {
    return 0;
  }

  args.forEach(el => {
    if (invalidTypes.includes(typeof el)) {
      throw new Error('Invalid parameters');
    }
  });

  return args.reduce((previousValue, currentValue) => previousValue + currentValue);
}

/*
  Напишите функцию, которая возвращает число x в степень n
*/
export function pow(x, n) {
  return x ** n;
}

/*
  Напишите функцию, которая возвращает рандомное целое число от from до to
*/
export function random(min, max) {
  /* eslint-disable no-mixed-operators */
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default {
  sum,
  sumAll,
  pow,
  random,
};
