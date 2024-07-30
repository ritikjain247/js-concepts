

// Function composition is the pointwise application of one function to the result of another. 


// Single argument
function compose(...fns) {
  return function (x) {
    let result = x;

    for (let i = fns.length - 1; i >= 0; i--) {
      result = fns[i](result);
    }

    return result;
  };
}

function compose(...fns) {
  return function (val) {
    return fns.reduceRight((result, func) => func(result), val);
  };
}

// Pipe - left to right
function pipe(...fns) {
  return function (val) {
    return fns.reduce((result, func) => func(result), val);
  };
}




// Multiple arguments - 

function compose(...fns) {
  return function (...args) {
    // Start with the initial arguments
    let result = args;

    // Apply each function from right to left
    for (let i = fns.length - 1; i >= 0; i--) {
      result = [fns[i](...result)];
    }

    // Return the final result
    return result[0];
  };
}

function compose(...fns) {
  return function (...args) {
    return fns.reduceRight((result, func) => [func(...result)], args)[0];
  };
}

function pipe(...fns) {
  return function (...args) {
    return fns.reduce((result, func) => [func(...result)], args)[0];
  };
}