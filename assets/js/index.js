function MyArray() {
  if (!new.target) return new MyArray(arguments);
  this.length = 0;
  for (let i = 0; i < arguments.length; i++) {
    this.push(arguments[i]);
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
    this.forEach((elem, i, arr) => {
      arr[i + params.length] = elem;
    });
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
    let newMyArray = [];

    this.forEach((elem) => {
      newMyArray.push(elem)
    });

    if (!MyArray.isMyArray(params[0])) {
      for (let i = 0; i < params.length; i++)
        newMyArray.push(params[i]);
      return new MyArray(...newMyArray);
    };

    for (let i = 0; i < params[0].length; i++) {
      newMyArray.push(params[0][i]);
    }
    //without create new myArray
    // for (let i = 0; i < params.length; i++) {
    //   this.push(params[i]);
    // }
    return new MyArray(...newMyArray);
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
  }
  this.map = function map(cb) {
    if (this.length < 1) return this;
    let newArray = [];
    for (let i = 0; i < this.length; i++) {
      newArray[i] = cb(this[i], i, this);
    }
    return new MyArray(...newArray);

  }
}

const arr1 = new MyArray(1, 2, 3, 4, 5);
const arr2 = new MyArray(6, 7, 8);
let arr3 = arr1.map(square)
// console.log(arr3)

const arr4 = MyArray(10, 10)
console.log(arr4)
// arr.unshift(2, 3, 6);
// arr3 = arr1.concat(arr2);
// console.log(arr1.reverse())

function square(num) {
  let result = num * num;
  return result;
}
