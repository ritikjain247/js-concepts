/**
Polymorphism is a core concept in object-oriented programming (OOP) that allows objects of different classes to be treated as objects of a common superclass. It also allows the same operation to behave differently on different classes. Polymorphism is mainly achieved through method overriding and method overloading.

Types of Polymorphism
Method Overriding: This occurs when a subclass provides a specific implementation of a method that is already defined in its superclass. The subclass's method overrides the superclass's method.

Method Overloading: This occurs when multiple methods have the same name but different parameters. JavaScript does not support method overloading in the traditional sense, but similar behavior can be achieved.
 */


// Polymorphism via Method Overriding
// In JavaScript, polymorphism is typically implemented using method overriding in a prototypal inheritance system or the class syntax.

// Example with Prototypal Inheritance
function Animal() {}

Animal.prototype.speak = function() {
  console.log('Animal speaks');
};

function Dog() {}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.speak = function() {
  console.log('Dog barks');
};

function Cat() {}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.speak = function() {
  console.log('Cat meows');
};

let animals = [new Dog(), new Cat()];

animals.forEach(animal => animal.speak()); // Dog barks, Cat meows


// Example with Class Syntax
class Animal {
  speak() {
    console.log('Animal speaks');
  }
}

class Dog extends Animal {
  speak() {
    console.log('Dog barks');
  }
}

class Cat extends Animal {
  speak() {
    console.log('Cat meows');
  }
}

let animals2 = [new Dog(), new Cat()];

animals.forEach(animal => animal.speak()); // Dog barks, Cat meows



// Polymorphism via Method Overloading (Simulated)
// JavaScript does not support method overloading natively. However, you can simulate it using various techniques, such as checking the number and types of arguments within a single method.

// Simulating Method Overloading

class Calculator {
  add(a, b, c) {
    if (typeof c !== 'undefined') {
      return a + b + c;
    }
    return a + b;
  }
}

let calc = new Calculator();
console.log(calc.add(1, 2));      // Output: 3
console.log(calc.add(1, 2, 3));   // Output: 6


/*
Practical Use Cases of Polymorphism
1. Designing Reusable Components: Polymorphism allows you to design more reusable components. For example, a graphics system where draw() method can be called on any shape object (circle, rectangle, etc.), and the appropriate method for that shape is executed.
2. Implementing Interface Contracts: Different classes can implement the same interface with their own specific behaviors, ensuring a consistent API while allowing different underlying behaviors.
3. Reducing Code Complexity: By using polymorphism, you can reduce the complexity of your code. Instead of using complex conditional statements to perform different operations based on object types, you can rely on polymorphic behavior.
*/