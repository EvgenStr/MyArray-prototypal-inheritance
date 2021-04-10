function MyArray() {
  if (!new.target) return new MyArray(...arguments);
  this.length = 0;
  for (let i = 0; i < arguments.length; i++) {
    this.push(arguments[i]);
    // this.push(...arguments)
  };
}

MyArray.prototype = new MyArrayProto();
MyArray.isMyArray = function isMyArray(item) {
  return item instanceof MyArray;
};

function MyArrayProto() {
  if (!new.target) return new MyArrayProto();
  this.push = function push() {
    for (let i = 0; i < arguments.length; i++) {
      this[this.length++] = arguments[i];
    }
    return this.length;
  };

  this.pop = function pop() {
    if (this.length === 0) return;
    const lastValue = this[this.length - 1];
    delete this[--this.length];
    return lastValue;
  };

  this.forEach = function forEach(cb) {
    for (let i = 0; i < this.length; i++) {
      cb(this[i], i, this);
    }
  };
  // this.isMyArray = function isMyArray(item) {
  //   return item instanceof MyArray;
  // };
  this.unshift = function unshift(...params) {
    if (this.length === 0) {
      this.push(...params);
      return this.length;
    }
    for (i = this.length - 1; i >= 0; i--) {
      this[i + params.length] = this[i];
    }
    for (let i = 0; i < params.length; i++) {
      this[i] = params[i]
    };
    return this.length += params.length;
  };

  this.shift = function shift() {
    if (this.length === 0) return;
    const result = this[0];
    delete this[0];
    this.length--;
    this.forEach((elem, i, arr) => {
      arr[i] = arr[i + 1];
    });
    delete this[this.length];
    return result;
  };

  this.concat = function concat(...params) {
    let newMyArray = new MyArray();

    this.forEach((elem) => {
      newMyArray.push(elem)
    });

    for (let i = 0; i < params.length; i++) {
      if (!params[i].length) {
        newMyArray.push(params[i]);
        continue;
      }
      for (let k = 0; k < params[i].length; k++) {
        newMyArray.push(params[i][k]);
      }
    };
    //without create new myArray
    // for (let i = 0; i < params.length; i++) {
    //   this.push(params[i]);
    // }
    return newMyArray;
  };


  this.reverse = function reverse() {
    if (this.length <= 1) return this;
    let newArray = [];
    this.forEach((elem) => {
      newArray.push(elem)
    });
    this.forEach((elem, i, arr) => {
      arr[arr.length - i - 1] = newArray[i];
    });
    return this;
  };

  this.map = function map(cb) {
    let newArray = new MyArray();
    for (let i = 0; i < this.length; i++) {
      newArray.push(cb(this[i], i, this));
    }
    return newArray;
  };
  this.some = function some(cb) {
    for (let i = 0; i < this.length; i++) {
      if (cb(this[i], i, this)) {
        return true;
      }
    }
    return false;
  };
  this.every = function every(cb) {
    for (let i = 0; i < this.length; i++) {
      if (!cb(this[i], i, this)) {
        return false;
      }
    }
    return true;
  };
  this.filter = function filter(cb) {
    const newMyArray = new MyArray();
    for (let i = 0; i < this.length; i++) {
      if (!cb(this[i], i, this)) {
        newMyArray.push(this[i]);
      }
    }
    return newMyArray;
  };
};

const arr1 = new MyArray(1, 2, 3, 4, 5);
const arr2 = new MyArray(6, 7, 8);
const arr4 = MyArray(10, 10);
let arr3 = arr1.map(square);
let arr5 = MyArray(2, 3, 4, 5, 6, 7, 8, 9);
let arr6 = new MyArray(0, 1);

// console.log(arr4)
arr5.unshift(1, 2, 3, 4);
// arr3 = arr1.concat(arr2);
console.log(arr1.filter((elem) => {
  if (elem % 2 - 1) return true;
}));


function square(num) {
  let result = num * num;
  return result;
}
