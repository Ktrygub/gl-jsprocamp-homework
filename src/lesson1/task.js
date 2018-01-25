/*
	Напишите функцию, которая принимает 1 аргумент и возварщает его тип
*/
function getDataType(variable) {
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
	и возврвщвет результат,
	в любом другом случае возврвщвет -1
*/
function increase(value) {
  return typeof value === 'number' ? value + 1 : -1;
}

/*
	Напишите функцию, которая принимает 1 аргумент(число),
	и в случае если аргумент не Infinity или NaN возвращает строку 'safe' иначе 'danger'
*/
function testForSafeNumber(value) {
  return Number.isFinite(value) ? 'safe' : 'danger';
}

// Strings

/*
	Напишите функцию, которая принимает 1 аргумент (строку),
	и возвращает массив из елементов строки разделенных по пробелу ' '
*/
function stringToArray(str) {
  return str.split(' ');
}

/*
	Напишите функцию, которая принимает 1 аргумент (строку),
	и возвращает часть этой строки до первой запятой
*/
function getStringPart(str) {
  const commaIndex = str.indexOf(',');
  return commaIndex >= -1 ? str.slice(0, commaIndex) : str;
}

/*
	Напишите функцию, которая принимает 2 аргумента (строку и симовл),
	и возвращает порядковый номер симовола в строе если символ встречается в строке 1 раз,
	false в противоположном случае
*/
function isSingleSymbolMatch(str, symbol) {
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
function join(array, separator) {
  return array.join(separator || '-');
}

/*
	Напишите функцию, которая принимает 2 массива,
	и возвращает один состоящий из элементов перового и второго (последовательно сначала первый потом второй)
*/
function glue(arrA, arrB) {
  return arrA.concat(arrB);
}

/*
	Напишите функцию, которая принимает 1 массив,
	и возвращает другой массив отсортированный от большего к меньшему
*/
function order(arr) {
  return arr.sort((a, b) => {
    if (a > b) {
      return -1;
    } else if (a < b) {
      return 1;
    }
    return 0;
  });
}

/*
	Напишите функцию, которая принимает 1 массив,
	и возвращает другой без чисел которые меньше 0
*/
function removeNegative(arr) {
  return arr.filter(el => el >= 0);
}

/*
	Напишите функцию, которая принимает 2 числовых массива,
	и возвращает новый массив, состоящий из элементов первого но без элементов
	которые присутствуют во втром
	[1,2,3], [1, 3] => [2]
*/
function without(arrA, arrB) {
  return arrA.filter(el => !arrB.includes(el));
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
};
