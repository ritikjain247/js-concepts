/**
Abstraction is a fundamental concept in object-oriented programming (OOP) that focuses on hiding the complex implementation details of an object and exposing only the essential features to the user. This helps in managing complexity by allowing the user to interact with the object at a higher level without needing to understand the intricacies of its inner workings.

In JavaScript, abstraction can be achieved using various techniques such as:
1. Classes and Objects: By using classes to define objects with specific properties and methods, you can create a clear interface for interacting with those objects.
2. Encapsulation: By restricting access to certain properties and methods of an object, you can hide the internal state and behavior, exposing only what is necessary.
3. Modules: By using modules to organize code into separate, self-contained units, you can create clear interfaces for interacting with different parts of the codebase.
 */

// Abstraction with Classes and Objects
// In JavaScript, you can create classes and objects to define a clear interface for interacting with an object while hiding the complex implementation details.
class Car {
  constructor(make, model, year) {
    this.make = make;  // Public property
    this.model = model; // Public property
    this.year = year;   // Public property
  }

  startEngine() { // Public method
    console.log(`${this.make} ${this.model} engine started.`);
  }

  #checkOilLevel() { // Private method (ES2022)
    console.log('Checking oil level...');
  }

  performMaintenance() { // Public method
    this.#checkOilLevel();
    console.log(`${this.make} ${this.model} maintenance performed.`);
  }
}
let myCar = new Car('Toyota', 'Corolla', 2020);
myCar.startEngine();         // Toyota Corolla engine started.
myCar.performMaintenance();  // Checking oil level... Toyota Corolla maintenance performed.
// myCar.#checkOilLevel();   // Error: Private method is not accessible
// In this example, the Car class provides a public interface with methods like startEngine and performMaintenance. The internal details, such as checking the oil level, are hidden using a private method (#checkOilLevel), which is only accessible within the class.



// Abstraction with Encapsulation
// Encapsulation is closely related to abstraction and involves bundling the data (properties) and methods (functions) that operate on the data into a single unit (class) while restricting access to certain details.
class BankAccount {
  #balance; // Private property

  constructor(initialBalance) {
    this.#balance = initialBalance;
  }

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      console.log(`Deposited: $${amount}`);
    } else {
      console.log('Invalid deposit amount');
    }
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      console.log(`Withdrew: $${amount}`);
    } else {
      console.log('Invalid withdrawal amount');
    }
  }

  getBalance() {
    return this.#balance;
  }
}

let myAccount = new BankAccount(1000);
myAccount.deposit(500);          // Deposited: $500
myAccount.withdraw(200);         // Withdrew: $200
console.log(myAccount.getBalance()); // 1300
// console.log(myAccount.#balance); // Error: Private property is not accessible
// In this example, the BankAccount class encapsulates the #balance property and provides public methods (deposit, withdraw, and getBalance) to interact with it. The internal state (#balance) is hidden from outside access, ensuring that it can only be modified through the defined methods.



// Abstraction with Modules
// Modules allow you to organize code into separate, self-contained units with clear interfaces. This helps in managing complexity by exposing only the necessary parts of a module while hiding the implementation details.

// mathModule.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

function multiply(a, b) { // Private function
  return a * b;
}

function divide(a, b) { // Private function
  if (b !== 0) {
    return a / b;
  } else {
    throw new Error('Division by zero');
  }
}

// main.js
import { add, subtract } from './mathModule.js';

console.log(add(5, 3));       // 8
console.log(subtract(5, 3));  // 2
// console.log(multiply(5, 3)); // Error: multiply is not exported
