let myPromise = new Promise(function (resolve, reject) {
  // some ops
  let condition = true;

  if (condition) resolve('success');
  else reject('error');
});

myPromise
  .then(res => console.log(res))
  .catch(err => console.error(err))
  .finally(() => console.error('promise settled'));




class EventEmitter {
  constructor() {
    this.events = {};
  }

  /**
   * @param {string} eventName
   * @param {Function} listener
   * @returns {EventEmitter}
   */
  on(eventName, listener) {
    if (!this.events.hasOwnProperty(eventName)) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
    return this;
  }

  /**
   * @param {string} eventName
   * @param {Function} listener
   * @returns {EventEmitter}
   */
  off(eventName, listener) {
    if (!this.events.hasOwnProperty(eventName)) {
      return this;
    }

    const listeners = this.events[eventName];

    // Find only first instance of the listener.
    const index = listeners.findIndex(
      (listenerItem) => listenerItem === listener,
    );

    if (index < 0) {
      return this;
    }

    this.events[eventName].splice(index, 1);
    return this;
  }

  /**
   * @param {string} eventName
   * @param  {...any} args
   * @returns {boolean}
   */
  emit(eventName, ...args) {
    if (!this.events.hasOwnProperty(eventName) || this.events[eventName].length === 0) {
      return false;
    }

    const listeners = this.events[eventName].slice();
    listeners.forEach((listener) => {
      listener.apply(null, args);
    });

    return true;
  }
}