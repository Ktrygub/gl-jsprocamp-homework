// Adding any amount of arguments
// Throws an Error if any of the arguments is Oject, Array or Boolean type

export function sum(...rest) {
  const args = [...rest];
  const invalidTypes = ['object', 'boolean'];

  if (args.length === 0) {
    return 0;
  }

  args.forEach(el => {
    if (invalidTypes.includes(typeof el)) {
      throw Error('Invalid parameters');
    }
  });

  return args.reduce((previousValue, currentValue) => previousValue + currentValue);
}

export default {
  sum,
};
