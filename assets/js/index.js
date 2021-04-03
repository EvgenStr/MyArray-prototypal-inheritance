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
      console.log(this[i],this.length,i, 'elem')
      cb(this[i], i, this);
    }
  };
  this.isMyArray = function isMyArray(){
    return this instanceof MyArray;
  }
}



const arr = new MyArray(1, 2, 3, 4, 5);

function square(num) {
  let result = num * num;
  console.log((num , 'swuare'));
  return result;
}

arr.forEach((elem, i, arr) => {
  console.log(elem, 'elem',i,arr,  'foreach')
  arr[i] = square(elem);
})