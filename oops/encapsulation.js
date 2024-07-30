// Encapsulation using Closures
// One way to achieve encapsulation in JavaScript is by using closures to create private variables and methods.

function Car(make, model) {
  let _make = make;
  let _model = model;

  this.getMake = function () {
    return _make;
  };
  this.getModel = function () {
    return _model;
  };
  this.setMake = function (make) {
    _make = make;
  };
  this.setModel = function (model) {
    _model = model;
  };
}

const myCar = new Car('Toyota', 'Corolla');
console.log(myCar.getMake()); // Toyota
console.log(myCar.getModel()); // Corolla

myCar.setMake('Honda');
myCar.setModel('Civic');
console.log(myCar.getMake()); // Honda
console.log(myCar.getModel()); // Civic


// Encapsulation using ES6 Classes
// ES6 classes provide a more straightforward syntax for creating objects and achieving encapsulation. With classes, you can define private fields using a convention (prefixing with an underscore) or using the # syntax for truly private fields (currently a stage 3 proposal).

// Using Underscore Convention **NOT TRUE ENCAPSULATION**
class Car2 {
  constructor(make, model) {
      this._make = make;
      this._model = model;
  }

  getMake() {
      return this._make;
  }
  getModel() {
      return this._model;
  }
  setMake(make) {
      this._make = make;
  }
  setModel(model) {
      this._model = model;
  }
}

const myCar2 = new Car2('Toyota', 'Corolla');
console.log(myCar2.getMake()); // Toyota
console.log(myCar2.getModel()); // Corolla

myCar2.setMake('Honda');
myCar2.setModel('Civic');
console.log(myCar2.getMake()); // Honda
console.log(myCar2.getModel()); // Civic


// Using # for Private Fields **TRUE ENCAPSULATION**
class Car3 {
  #make;
  #model;

  constructor(make, model) {
      this.#make = make;
      this.#model = model;
  }

  getMake() {
      return this.#make;
  }
  getModel() {
      return this.#model;
  }
  setMake(make) {
      this.#make = make;
  }
  setModel(model) {
      this.#model = model;
  }
}

const myCar3 = new Car3('Toyota', 'Corolla');
console.log(myCar.getMake()); // Toyota
console.log(myCar.getModel()); // Corolla

myCar.setMake('Honda');
myCar.setModel('Civic');
console.log(myCar.getMake()); // Honda
console.log(myCar.getModel()); // Civic



// Encapsulation using Object Literals
// Object literals can also be used to achieve encapsulation by hiding properties and methods within a closure.
const Car4 = (make, model) => {
  let _make = make;
  let _model = model;

  return {
      getMake: () => _make,
      getModel: () => _model,
      setMake: (make) => { _make = make; },
      setModel: (model) => { _model = model; }
  };
};

const myCar4 = Car4('Toyota', 'Corolla');
console.log(myCar4.getMake()); // Toyota
console.log(myCar4.getModel()); // Corolla

myCar4.setMake('Honda');
myCar4.setModel('Civic');
console.log(myCar4.getMake()); // Honda
console.log(myCar4.getModel()); // Civic




// Not encapsulation - 
class PokemonClass {
  constructor(name) {
    this._name = name;
  }
  getName() {
    return this._name;
  }
  setName(name) {
    this._name = name;
  }
}
let pikachuclass = new PokemonClass();
pikachuclass.setName('Pikachu');
pikachuclass._name = 'doremon';
console.log(pikachuclass.getName()); // doremon. _name accessible outside


// True encapsulation - 
function Pokemon(name) {
  let _name = name;

  this.getName = function () {
    return _name;
  }
  this.setName = function (name) {
    _name = name;
  }
}
let pikachu = new Pokemon();
pikachu.setName('Pikachu');
pikachu._name = 'doremon'; // doesn't change obj _name property as it is private.
console.log(pikachu.getName());


// another syntax ES2022
class PokemonClassy {
  #name;
  constructor(name) {
    this.#name = name;
  }
  #privateFunction() {
    console.log('private method called');
  }
  getName() {
    return this.#name;
  }
  setName(name) {
    this.#privateFunction();
    this.#name = name;
  }
}
let pikachuclassy = new PokemonClassy('Pikachu');
pikachuclassy.setName('Pikachu');
// Attempting to access the private field directly will throw an error
// pikachuclassy.#name = 'doremon'; // SyntaxError
// pikachuclassy.#privateFunciton(); // SyntaxError
console.log(pikachuclassy.getName()); // Pikachu


// w/o es2022
const _name = new WeakMap();
class PokemonClass2 {
  constructor(name) {
    _name.set(this, name);
  }
  getName() {
    return _name.get(this);
  }
  setName(name) {
    _name.set(this, name);
  }
}
let pikachuclass2 = new PokemonClass2('Pikachu');
pikachuclass2.setName('Pikachu');
// Attempting to access the private property directly will not work as it is not part of the instance
pikachuclass2._name = 'doremon';
console.log(pikachuclass2.getName()); // Pikachu