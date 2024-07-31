/*
1. Prototypal Inheritance
JavaScript uses prototypal inheritance. Every JavaScript object has a prototype. An object's prototype is also an object. All JavaScript objects inherit their properties and methods from their prototype.

Creating Inheritance Using Prototypes
Here is an example of how inheritance works using prototypes:
*/

// Define a constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Add a method to the prototype
Person.prototype.greet = function() {
  console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
};

// Create a new object
let person1 = new Person('John', 30);
person1.greet(); // Output: Hello, my name is John and I am 30 years old.

// Define another constructor function
function Student(name, age, grade) {
  // Call the parent constructor
  Person.call(this, name, age);
  this.grade = grade;
}

// Inherit the prototype of Person
Student.prototype = Object.create(Person.prototype);

// If you don't set Student.prototype.constructor to Student,
// it will take the prototype.constructor of Person (parent).
// To avoid that, we set the prototype.constructor to Student (child).

// Set the constructor property to refer to Student
Student.prototype.constructor = Student;
// // OR
// Student.prototype = Object.create(Person.prototype, {
//   constructor: {
//     value: Student,
//     enumerable: false,
//     writable: true,
//     configurable: true,
//   },
// });

// Add a method to the Student prototype
Student.prototype.study = function() {
  console.log(`${this.name} is studying.`);
};

// Create a new Student object
let student1 = new Student('Jane', 22, 'A');
student1.greet(); // Output: Hello, my name is Jane and I am 22 years old.
student1.study(); // Output: Jane is studying.




/*
2. Class Based Inheritance Syntax
Since ECMAScript 2015 (ES6), JavaScript has included a class syntax that makes inheritance easier and more intuitive. Under the hood, it still uses prototypes, but the syntax is cleaner and more familiar to developers coming from class-based languages like Java or C++.

Creating Inheritance Using Class Syntax
Here is the same example using class syntax:
*/

// Define a Person class
class Person2 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

// Define a Student class that extends Person
class Student2 extends Person2 {
  constructor(name, age, grade) {
    super(name, age); // Call the parent constructor
    this.grade = grade;
  }

  study() {
    console.log(`${this.name} is studying.`);
  }
}

// Create a new Person object
let person2 = new Person2('John', 30);
person2.greet(); // Output: Hello, my name is John and I am 30 years old.

// Create a new Student object
let student2 = new Student2('Jane', 22, 'A');
student2.greet(); // Output: Hello, my name is Jane and I am 22 years old.
student2.study(); // Output: Jane is studying.



/*
Modes of inheritance
JavaScript, as of the ECMAScript 2015 (ES6) specification and later, does not natively support traditional access modifiers (like private, protected, and public) that are found in other object-oriented languages such as C++ or Java. However, there are ways to achieve similar behavior using various techniques. Let's explore how to simulate private, protected, and public access in JavaScript.
*/

// Public Members
// Public members are the default in JavaScript. Any property or method added to an object or its prototype is public and accessible from anywhere.
class Person3 {
  constructor(name, age) {
    this.name = name; // public property
    this.age = age;   // public property
  }

  greet() { // public method
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}
let person3 = new Person3('John', 30);
console.log(person3.name); // John
person3.greet(); // Hello, my name is John and I am 30 years old.


// Private Members (Using Symbols or WeakMaps)
// As of ECMAScript 2022 (ES13), JavaScript supports truly private class fields and methods using the # syntax. This is the most modern way to achieve private members:
class Person4 {
  #name; // private field
  #age;  // private field

  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }

  #getDetails() { // private method
    return `${this.#name}, ${this.#age} years old`;
  }

  greet() {
    console.log(`Hello, my name is ${this.#name} and I am ${this.#age} years old.`);
  }
}

let person4 = new Person4('John', 30);
console.log(person4.name); // undefined
person4.greet(); // Hello, my name is John and I am 30 years old.


// Protected Members
// JavaScript does not have a native way to define protected members, which are accessible within the class and its subclasses but not from outside. However, you can simulate this behavior by using naming conventions and closures.

// Using naming conventions:
class Person5 {
  constructor(name, age) {
    this._name = name; // convention to indicate protected
    this._age = age;   // convention to indicate protected
  }

  greet() {
    console.log(`Hello, my name is ${this._name} and I am ${this._age} years old.`);
  }
}

class Student5 extends Person5 {
  study() {
    console.log(`${this._name} is studying.`);
  }
}

let student5 = new Student5('Jane', 22);
student5.greet(); // Hello, my name is Jane and I am 22 years old.
student5.study(); // Jane is studying.


// Using closures (less common):
function Person6(name, age) {
  let _name = name;
  let _age = age;

  this.greet = function() {
    console.log(`Hello, my name is ${_name} and I am ${_age} years old.`);
  };

  this.getName = function() {
    return _name;
  };

  this.getAge = function() {
    return _age;
  };
}

function Student6(name, age, grade) {
  Person6.call(this, name, age);
  let _grade = grade;

  this.study = function() {
    console.log(`${this.getName()} is studying.`);
  };
}

Student6.prototype = Object.create(Person6.prototype);
Student6.prototype.constructor = Student6;

let student6 = new Student6('Jane', 22, 'A');
student6.greet(); // Hello, my name is Jane and I am 22 years old.
student6.study(); // Jane is studying.
