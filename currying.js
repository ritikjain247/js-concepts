

// f(a, b) => f(a)(b)


function f(a) {
  return function (b) {
    return `${a}, ${b}`;
  }
}

console.log(f(5)(8));


function sum(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    }
  }
}
console.log(sum(2)(4)(6));


function evaluate(expression) {
  return function (a) {
    return function (b) {
      switch (expression) {
        case 'add':
          return a + b;
        case 'subtract':
          return a - b;
        case 'multiply':
          return a * b;
        case 'divide':
          return a / b;
      }
    }
  }
}

console.log(evaluate('divide')(15)(3));

const divide = evaluate('divide');

console.log(divide(18)(3));


// Infinite currying
function add(a) {
  return function (b) {
    if (b) return add(a + b);
    return a;
  }
}


// Currying vs Partial application
// Partial application -

function sum(a) {
  return function (b, c) {
    return a + b + c;
  }
}


// number of arguments (3) != number of nested functions so thjis is not currying, it's partial application of sum function 
// partial application converts a funciton into another funciton with small arrity (lesser number of parameters)

function partial(fn, ...args) {
  return function (...moreArgs) {
    return fn(...args, ...moreArgs);
  };
}

// or use bind


// A function to convert any f(a, b, c) into f(a)(b)(c)
function curryAny(func) {
  return function curriedFunc(...args) {
    if (func.length <= args.length) {
      return func(...args);
    }
    else {
      return function (...next) {
        return curriedFunc(...args, ...next);
      }
    }
  }
}

/**
 * @param {Function} func
 * @return {Function}
 */
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    }

    return (arg) =>
      arg === undefined
        ? curried.apply(this, args)
        : curried.apply(this, [...args, arg]);
  };
}