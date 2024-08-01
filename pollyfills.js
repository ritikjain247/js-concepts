const arr2 = [0, 1, [2, 6, [3, 7, [4, 5]]], [8, [9, 10]]];

/**
 * @param {number} index
 * @return {any | undefined}
 */
Array.prototype.myAt = function (index) {
  if (index < 0) index = this.length + index;
  return this[index];

  // Spec version
  // const len = this.length;
  // const relativeIndex = Number(index);
  // const k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
  // if (k < 0 || k >= len) {
  //   return undefined;
  // }
  // return this[k];
};


/**
 * @template T
 * @param {number} depth 
 * @return {Array<T>}
 */
Array.prototype.myFlat = function (depth = 1) {
  function flatten(array, depth) {
    if (!Array.isArray(array) || depth === 0) return array;
    const result = [];
    for (let element of array) {
      if (Array.isArray(element)) result.push(...flatten(element, depth - 1));
      else result.push(element);
    }
    return result;
  }
  return flatten(this, depth);
}


function flatten(array, depth) {
  if (!Array.isArray(array) || depth === 0) return array;
  let result = array.slice();

  while (depth > 0) {
    let flattened = [];
    let hasNestedArrays = false;
    for (let element of result) {
      if (Array.isArray(element)) {
        flattened = flattened.concat(element); // push(...element) will take more time
        hasNestedArrays = true;
      } else {
        flattened.push(element);
      }
    }
    result = flattened;
    depth--;
    if (!hasNestedArrays) break;
  }
  return result;
}


/**
 * @template T, U
 * @param { (value: T, index: number, array: Array<T>) => U } callbackFn
 * @param {any} [thisArg]
 * @return {Array<U>}
 */
Array.prototype.myMap = function (callbackFn, thisArg) {
  const len = this.length;
  const results = Array(len);

  for (let i = 0; i < len; i++) {
    if (Object.hasOwn(this, i)) results[i] = callbackFn.call(thisArg, this[i], i, this);
  }
  return results;
};


/**
 * @template T
 * @param { (value: T, index: number, array: Array<T>) => boolean } callbackFn
 * @param {any} [thisArg]
 * @return {Array<T>}
 */
Array.prototype.myFilter = function (callbackFn, thisArg) {
  const len = this.length;
  const results = [];

  for (let i = 0; i < len; i++) {
    const value = this[i];
    if (Object.hasOwn(this, i) && callbackFn.call(thisArg, value, i, this)) results.push(value);
  }
  return results;
};


/**
 * @template T, U
 * @param {(previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U} callbackFn
 * @param {U} [initialValue]
 * @return {Array<U>}
 */
Array.prototype.myReduce = function (callbackFn, initialValue) {
  if (!this.length && initialValue == null) throw Error('Empty array');
  let accumulator = initialValue ?? 0;

  this.forEach((item, index, array) => {
    if (item != null) accumulator = callbackFn(accumulator, item, index, array);
  });

  return accumulator;
};



// /**
//  * Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.
//  * @param thisArg The object to be used as the this object.
//  * @param argArray A set of arguments to be passed to the function.
//  * @return {any}
//  */
// Function.prototype.myApply2 = function (thisArg, argArray = []) {
//   return this.bind(thisArg)(...argArray);
// };


/**
 * @param {object|null|undefined} context - The value to use as `this` when calling the function.
 * @param {Array<any>|null|undefined} args - An array or array-like object specifying the arguments with which the function should be called.
 * @returns {*} The result of the function call.
 */
Function.prototype.myApply = function (context, args) {
  if (typeof this !== 'function') {
    throw new TypeError(this + ' is not a function');
  }
  context = context || globalThis; // Use `globalThis` instead of `window` for a more universal solution
  const fnSymbol = Symbol(); // Use a unique symbol to avoid property collision
  context[fnSymbol] = this;

  let result;
  if (!args) {
    result = context[fnSymbol]();
  } else {
    if (!Array.isArray(args) && typeof args !== 'object' && typeof args.length !== 'number') {
      throw new TypeError('CreateListFromArrayLike called on non-object');
    }
    result = context[fnSymbol](...args);
  }

  delete context[fnSymbol];
  return result;
};


/**
 * @param {object|null|undefined} context - The value to use as `this` when calling the function.
 * @param {Array<any>|null|undefined} args - An array or array-like object specifying the arguments with which the function should be called.
 * @returns {*} The result of the function call.
 */
Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError(this + ' is not a function');
  }
  context = context || globalThis; // Use `globalThis` instead of `window` for a more universal solution
  const fnSymbol = Symbol(); // Use a unique symbol to avoid property collision
  context[fnSymbol] = this;

  let result;
  if (!args) {
    result = context[fnSymbol]();
  } else {
    if (!Array.isArray(args) && typeof args !== 'object' && typeof args.length !== 'number') {
      throw new TypeError('CreateListFromArrayLike called on non-object');
    }
    result = context[fnSymbol](...args);
  }

  delete context[fnSymbol];
  return result;
};


// /**
//  * @param {any} thisArg
//  * @param {...*} argArray
//  * @return {Function}
//  */
// Function.prototype.myBind = function (thisArg, ...argArray) {
//   const originalMethod = this;
//   return function (...args) {
//     return originalMethod.apply(thisArg, [...argArray, ...args]);
//   };
// };

/**
 * @param {any} context
 * @param {...*} argArray
 * @return {Function}
 */
Function.prototype.myBind = function (context, ...argArray) {
  if (typeof this !== 'function') {
    throw new TypeError(this + ' is not a function');
  }
  context = context || globalThis;
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  return function (...args) {
    if (!Array.isArray(args) && typeof args !== 'object' && typeof args.length !== 'number') {
      throw new TypeError('CreateListFromArrayLike called on non-object');
    }
    return context[fnSymbol](...argArray, ...args);
  };
};





/**
 * @param {Function} func
 * @param {number} wait
 * @return {Function}
 */
function debounce(func, wait) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      timer = null;
      func.apply(this, args);
    }, wait);
  }
}


/**
 * @callback func
 * @param {number} wait
 * @return {Function}
 */
function throttle(func, wait = 0) {
  let shouldThrottle = false;

  return function (...args) {
    if (shouldThrottle) {
      return;
    }

    shouldThrottle = true;
    setTimeout(function () {
      shouldThrottle = false;
    }, wait);

    func.apply(this, args);
  };
}

// function throttle2(func, wait) {
//   let called = false;

//   return function (...args) {
//     if (!called) {
//       func.call(this, ...args);
//       called = true;
//     }

//     setTimeout(() => {
//       called = false;
//     }, wait)
//   }
// }




/**
 * @param {Array} iterable
 * @return {Promise}
 */
Promise.prototype.myRace = function (iterable) {
  return new Promise((resolve, reject) => {
    if (iterable.length === 0) {
      return;
    }

    iterable.forEach(async (item) => {
      try {
        const result = await item;
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  });
}


/**
 * @template T
 * @param {...(T | Array<T>)} items
 * @return {Array<T>}
 */
Array.prototype.myConcat = function (...items) {
  const result = [...this];

  items.forEach(item => {
    if (Array.isArray(item)) {
      result.push(...item);
    } else {
      result.push(item);
    }
  });
  return result;
};