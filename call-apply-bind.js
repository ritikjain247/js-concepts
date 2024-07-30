const name = {
  first: 'Ritik',
  last: 'Jain',
}

const printName = function (city, state) {
  console.log(`${this.first} ${this.last} is from ${city}, ${state}`);
}

printName.call(name, 'Kota', 'Rajasthan');

const name2 = {
  first: 'Hritik',
  last: 'Roshan',
}
printName.call(name2, 'Mumbai', 'Maharashtra');

printName.apply(name2, ['Mumbai', 'Maharashtra']);


const printNameBound = printName.bind(name, 'Kota', 'Rajasthan');
printNameBound();

const printNameBound2 = printName.bind(name, 'Kota');
printNameBound2('Rajasthan');

const printNameBound3 = printName.bind(name);
printNameBound3('Kota', 'Rajasthan');


Function.prototype.myCall = function (context, ...argArray) {
  context._this = this;
  return context._this(...argArray);
};

Function.prototype.myApply = function (context, argArray = []) {
  context._this = this;
  return context._this(...argArray);
};

Function.prototype.myBind = function (context, ...argArray) {
  context._this = this; // this == fn (printName in this case)
  return function (...args) {
    return context._this(...argArray, ...args);
  };
};



const printNameBound1 = printName.myBind(name, 'Kota', 'Rajasthan');
printNameBound1();

const printNameBound12 = printName.myBind(name, 'Kota');
printNameBound12('Rajasthan');

const printNameBound13 = printName.myBind(name);
printNameBound13('Kota', 'Rajasthan');


 