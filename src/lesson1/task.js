/*
	Напишите функцию, которая принимает 1 аргумент и возварщает его тип
*/

//------------------------------------------------------------------------------------------
// 'undefined', 'null', 'boolean', 'string', 'number', 'symbol', 'object'
//------------------------------------------------------------------------------------------

function getDataType(variable) {
  // if (variable === null) {
  //   return 'null';
  // }

  // if (typeof variable === 'function') {
  //   return 'object';
  // }

  return typeof variable;
}

/*
	Напишите функцию, которая принимает 1 аргумент и возвращает:
	'primitive' если тип данных относится к примивным
	'primitive-special' если тип данных специальный
	'object' - если простой обьект
	'object-array' - если массив
	'object-function' - если функция
*/

function getDataTypePseudoName(variable) {
  const primitiveTypes = ['string', 'boolean', 'number', 'symbol'];
  if (primitiveTypes.includes(typeof variable)) {
    return 'primitive';
  }

  const variableType = Object.prototype.toString.call(variable);

  switch (variableType) {
    case '[object Function]':
      return 'object-function';

    case '[object Array]':
      return 'object-array';

    case '[object Null]':
    case '[object Undefined]':
      return 'primitive-special';

    default:
      return 'object';
  }
}

/*
	Напишите функцию, которая принимает 2 аргумента,
	и возврвщает 1 если их значения и их типы равны,
	0 если равны только значения
	и -1 в другом случае
*/

function compareByType(a, b) {
  /* eslint-disable eqeqeq */
  if (a === b) {
    return 1;
  } else if (a == b) {
    return 0;
  }
  return -1;
}

// Numbers

/*
	Напишите функцию, которая принимает 1 аргумент,
	и в случае если аргумент имеет числовой тип увеличивает его на 1
	и возвращает результат,
	в любом другом случае возвращает -1
*/

//------------------------------------------------------------------------------------------
// accept only finite numbers
//------------------------------------------------------------------------------------------

function increase(value) {
  // return Number.isFinite(value) ? value + 1 : -1;
  return typeof value === 'number' ? value + 1 : -1;
}

/*
	Напишите функцию, которая принимает 1 аргумент(число),
	и в случае если аргумент не Infinity или NaN возвращает строку 'safe' иначе 'danger'
*/

//------------------------------------------------------------------------------------------
// Valid type of argument?
//------------------------------------------------------------------------------------------

function testForSafeNumber(value) {
  if (typeof value !== 'number') {
    throw new TypeError('Argument is not a number');
  }
  return Number.isFinite(value) ? 'safe' : 'danger';
}

// Strings

/*
	Напишите функцию, которая принимает 1 аргумент (строку),
	и возвращает массив из елементов строки разделенных по пробелу ' '
*/

//------------------------------------------------------------------------------------------
// string, new String() as valid arguments
// several spaces in a row results as '' elements in resulting array,
// so resuting array.join(' ') will give us initial string
// f.e. stringToArray(' a b ')) -> ['', 'a', 'b', '']
//------------------------------------------------------------------------------------------

function stringToArray(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Argument is not a string');
  }
  return str.split(' ');
}

/*
	Напишите функцию, которая принимает 1 аргумент (строку),
	и возвращает часть этой строки до первой запятой
*/

//------------------------------------------------------------------------------------------
// string, new String() as valid arguments
// when no commas -> returns str
//------------------------------------------------------------------------------------------

function getStringPart(str) {
  // if (Object.prototype.toString.call(str) !== '[object String]') {
  if (typeof str !== 'string') {
    throw new TypeError('Argument is not a string');
  }
  return str.split(',')[0];
}

/*
	Напишите функцию, которая принимает 2 аргумента (строку и симовл),
	и возвращает порядковый номер симовола в строе если символ встречается в строке 1 раз,
	false в противоположном случае
*/

//------------------------------------------------------------------------------------------
// string, new String() as valid arguments
//------------------------------------------------------------------------------------------

function isSingleSymbolMatch(str, symbol) {
  // if (
  //   Object.prototype.toString.call(str) !== '[object String]' ||
  //   Object.prototype.toString.call(symbol) !== '[object String]'
  // ) {
  if (typeof str !== 'string' || typeof symbol !== 'string') {
    throw new TypeError('Argument is not a string');
  }

  if (str.indexOf(symbol) !== -1 && str.indexOf(symbol) === str.lastIndexOf(symbol)) {
    return str.indexOf(symbol);
  }
  return false;
}

/*
	Напишите функцию, которая принимает 2 аргумента,
	массив в разделитель[опционально],
	и возвращает строку ввиде элементов массива c разделителями если разделитель задан
	или строку разделенную "-" если не задан
*/

//------------------------------------------------------------------------------------------
// separator type - any that casts toString (same behaviour as Array.prototype.join(separator))
// [1,2].join([{},true]) -> "1[object Object],true2"
// join([1,2], [{},true]) -> "1[object Object],true2"
//------------------------------------------------------------------------------------------

function join(array, separator) {
  if (!Array.isArray(array)) {
    throw new TypeError('Argument is not an Array');
  }
  if (separator === undefined || separator === null) {
    return array.join('-');
  }
  return array.join(separator.toString() || '-');
}

/*
	Напишите функцию, которая принимает 2 массива,
	и возвращает один состоящий из элементов перового и второго (последовательно сначала первый потом второй)
*/

//------------------------------------------------------------------------------------------
// arrB is optional
//------------------------------------------------------------------------------------------

function glue(arrA, arrB = []) {
  if (!Array.isArray(arrA) || !Array.isArray(arrB)) {
    throw new TypeError('Argument i not an Array');
  }
  return [...arrA, ...arrB];
}

/*
	Напишите функцию, которая принимает 1 массив,
	и возвращает другой массив отсортированный от большего к меньшему
*/

//------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------

function order(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('Argument is not an Array');
  }
  return arr.sort((a, b) => a < b);
}

/*
	Напишите функцию, которая принимает 1 массив,
	и возвращает другой без чисел которые меньше 0
*/

//------------------------------------------------------------------------------------------
// questionable behaviour: array elements which are not numbers, are not handled and return as is
// removeNegative([1,-2,'-1']) === [1, '-1'], removeNegative([1,2,3,false]) === [1, 2, 3, false]
//------------------------------------------------------------------------------------------

function removeNegative(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('Argument is not an Array');
  }
  return arr.filter(el => {
    if (typeof el === 'number') {
      return el >= 0;
    }
    return true;
  });
}

/*
	Напишите функцию, которая принимает 2 числовых массива,
	и возвращает новый массив, состоящий из элементов первого но без элементов
	которые присутствуют во втром
	[1,2,3], [1, 3] => [2]
*/

//------------------------------------------------------------------------------------------
// questionable behaviour: if arrays include elements which are not numbers -> throw error
// arrB is optional
//------------------------------------------------------------------------------------------

function without(arrA, arrB = []) {
  if (!Array.isArray(arrA) || !Array.isArray(arrB)) {
    throw new TypeError('Argument is not an Array');
  }

  arrA.forEach(el => {
    if (typeof el !== 'number') {
      throw new TypeError('Array element is not a number');
    }
  });

  arrB.forEach(el => {
    if (typeof el !== 'number') {
      throw new TypeError('Array element is not a number');
    }
  });

  return arrA.filter(el => !arrB.includes(el));
}

/*
  Напишите функцию, которая принимает строку,
  содержащую выражение математической операции с двумя
  операндами (поддерживаются 4 базовых оператора + - / *).
  Функция вычисляет выражение и возвращает число либо NaN.
  '12/6' => 2
*/

//------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------

function calcExpression(expression) {
  if (typeof expression !== 'string') {
    throw new TypeError('Argument is not a string');
  }
  // with eval

  // try {
  //   return eval(expression);
  // } catch (error) {
  //   return NaN;
  // }

  // without eval

  // remove all white spaces
  const expr = expression.replace(/ /g, '');

  const operatorsArray = expr.match(/(?!^-)[-/*+]/g);

  if (operatorsArray.length === 0) {
    throw new Error('Please use valid math operation. Valid operator: +, -, /, *');
  }
  if (operatorsArray.length > 1) {
    // condition for x/-y syntax
    if (operatorsArray[0] !== '/' || operatorsArray[1] !== '-') {
      throw new Error('Please use only one operation at a time. Valid operator: +, -, /, *');
    }
  }

  const operator = operatorsArray[0];

  const chooseLogic = operator => {
    switch (operator) {
      case '+':
        return (x, y) => x + y;
      case '-':
        return (x, y) => x - y;
      case '*':
        return (x, y) => x * y;
      case '/':
        return (x, y) => x / y;
      default:
        throw new Error('Please use valid math operation. Valid operator: +, -, /, *');
    }
  };

  const mathFunc = chooseLogic(operator);

  // stricter way to parse float values
  const filterFloat = value => {
    if (/^(-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value)) {
      return Number(value);
    }
    return NaN;
  };

  const operandsArray = expr.split(operator).map(el => filterFloat(el));

  if (operandsArray.includes(NaN)) {
    return NaN;
  }

  const [x, y] = operandsArray;

  const result = mathFunc(x, y);

  return parseFloat(result.toFixed(12));
}

/*
  Напишите функцию, которая принимает строку,
  содержащую выражение логической операции с двумя
  операндами (поддерживаются 5 базовых операторов > < = >= <=).
  Функция вычисляет выражение и возвращает true / false,
  либо бросает exception в случае ошибки.
  '100>5' => true
*/

//------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------

function calcComparison(expression) {
  if (typeof expression !== 'string') {
    throw new TypeError('Argument is not a string');
  }
  // with eval
  // const expr = expression
  //   .replace('=', '===')
  //   .replace('>===', '>=')
  //   .replace('<===', '<=');
  // try {
  //   return eval(expr);
  // } catch (e) {
  //   throw new Error(e);
  // }

  // without eval

  // remove all white spaces
  const expr = expression.replace(/ /g, '');

  const operatorsArray = expr.match(/[><=]+/g);

  if (operatorsArray.length === 0) {
    throw new Error('Please use valid logical operation. Valid operator: >, <, =, >=, <=');
  }
  if (operatorsArray.length > 1) {
    throw new Error('Please use only one operation at a time. Valid operator: >, <, =, >=, <=');
  }

  const operator = operatorsArray[0];

  const chooseLogic = operator => {
    switch (operator) {
      case '>':
        return (x, y) => x > y;
      case '<':
        return (x, y) => x < y;
      case '=':
        return (x, y) => x === y;
      case '>=':
        return (x, y) => x >= y;
      case '<=':
        return (x, y) => x <= y;
      default:
        throw new Error('Please use valid logical operation. Valid operator: >, <, =, >=, <=');
    }
  };

  const logicFunc = chooseLogic(operator);

  // stricter way to parse float values
  const filterFloat = value => {
    if (/^(-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value)) {
      return Number(value);
    }
    throw new TypeError('Invalid argument. Use valid numbers as arguments.');
  };

  const [x, y] = expr.split(operator).map(el => filterFloat(el));

  return logicFunc(x, y);
}

/*
  Напишите функцию, которая принимает обьект и строку,
  содержащую выражение доступа к свойствам обьекта.
  Функция возвращает значение запрашиваемого свойства либо
  бросает exception в случае ошибки.
  { a: { x: 2 }, b: 5 }, '.a.x' => 2
  { a: 1, b: 2 }, '.c' => exception
*/

//------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------

function evalKey(obj, expression) {
  if (typeof obj !== 'object' || typeof expression !== 'string') {
    throw new TypeError('Invalid arguments');
  }
  if (!expression.startsWith('.')) {
    throw new Error('Inalid access key.');
  }

  const accessKeys = expression.split('.');

  let result = obj;
  for (let i = 1; i < accessKeys.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(result, accessKeys[i])) {
      throw new Error('Inalid access key.');
    }
    result = result[accessKeys[i]];
  }

  return result;
}

export default {
  getDataType,
  getDataTypePseudoName,
  compareByType,
  increase,
  testForSafeNumber,
  stringToArray,
  getStringPart,
  isSingleSymbolMatch,
  join,
  glue,
  order,
  removeNegative,
  without,
  calcExpression,
  calcComparison,
  evalKey,
};
