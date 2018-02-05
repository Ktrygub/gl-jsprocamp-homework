/*
  Write a function that creates custom set object. Function
  accepts single optional parameter (array) do define initial
  set content.
  Set should have add(), has(), delete(), forEach(), clear() methods
  and size property. Should not use es6 objects Set, WeakSet,
  but work in similar way. Set should preserve addition order
  in forEach() method.
  mySet = createSet(['a', 'b', 'c'])
*/

// TODO: make CustomSet and CustomMap iterable
// TODO: class refactoring

function CustomSet(arr) {
  this.entries = [];
  arr.forEach(el => this.add(el));
}

CustomSet.prototype = {
  get size() {
    return this.entries.length;
  },

  add(value) {
    if (!this.has(value)) {
      this.entries.push(value);
    }
    return this;
  },

  delete(value) {
    if (this.has(value)) {
      this.entries = this.entries.filter(el => !((Number.isNaN(value) && Number.isNaN(el)) || el === value));
      return true;
    }
    return false;
  },

  has(value) {
    return this.entries.includes(value);
  },

  forEach(callback, thisArg = this) {
    thisArg.entries.forEach((el, index, array) => {
      const value = el;
      callback(value, value, array);
    });
  },

  clear() {
    this.entries = [];
  },
};

export function createSet(arr = []) {
  return new CustomSet(arr);
}

/*
  Write a function that creates custom map object. Function
  accepts single optional parameter (array) do define initial
  map content.
  Map should have set(), get(), has(), delete(), forEach(), clear()
  methods and size property. Should not use es6 objects Map, WeakMap,
  but work in similar way. Map should preserve addition order
  in forEach() method.
  myMap = createMap([['a', 1], ['b', 2], ['c', 3]])
*/

function CustomMap(arr) {
  this.entries = [];
  arr.forEach(el => this.set(...el));
}

CustomMap.prototype = {
  get size() {
    return this.entries.length;
  },

  get(key) {
    return this.entries.find(el => el[0] === key || (Number.isNaN(key) && Number.isNaN(el[0])));
  },

  has(key) {
    return !!this.get(key);
  },

  set(key, value) {
    if (!this.has(key)) {
      this.entries.push([key, value]);
    } else {
      const updateElement = this.get(key);
      updateElement[1] = value;
    }
    return this;
  },

  delete(key) {
    if (this.has(key)) {
      this.entries = this.entries.filter(el => !((Number.isNaN(key) && Number.isNaN(el[0])) || el[0] === key));
      return true;
    }
    return false;
  },

  forEach(callback, thisArg = this) {
    thisArg.entries.forEach((el, index, array) => {
      const [key, value] = el;
      callback(value, key, array);
    });
  },

  clear() {
    this.entries = [];
  },
};

export function createMap(arr = []) {
  return new CustomMap(arr);
}

export default {
  createSet,
  createMap,
};
