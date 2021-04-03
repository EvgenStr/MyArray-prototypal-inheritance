function MyArray() {
  this.length = 0;
  for (let i = 0; i < arguments.length; i++) {
    this.push(arguments[i]);
  }
}

MyArray.prototype = new MyArrayProto();

function MyArrayProto() {
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

  this.isMyArray = function isMyArray() {
    return this instanceof MyArray;
  };

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
  this.concat = function concat(arr) {
    // console.log(arr, 'concat');
    let newMyArray = [];
    this.forEach((elem) => {
      newMyArray.push(elem)
    });
    for (let i = 0; i < arr.length; i++) {
      newMyArray.push(arr[i]);
    }

    //without create new my array
    // for (let i = 0; i < arr.length; i++) {
    //   this.push(arr[i]);
    // }
    return new MyArray(...newMyArray);
  }
}

const arr1 = new MyArray(1, 2, 3, 4, 5);
const arr2 = new MyArray(6, 7, 8);

// arr.unshift(2, 3, 6);
arr3 = arr1.concat(arr2);
console.log(arr3)


function square(num) {
  let result = num * num;
  return result;
}

// arr.forEach((elem, i, arr) => {
//   console.log(elem, 'elem',i,arr,  'foreach')
//   arr[i] = square(elem);
// })