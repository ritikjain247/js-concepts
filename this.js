"use strict"

// console.log(this); // globalThis

function x() {
  console.log('x', this); // strict - undefined else global
}
x(); // undefined
// window.x(); //window

const arrowx = () => {
  console.log('arrowx', this);
}
arrowx(); // window


// This inside objects
const obj = {
  a: 10,
  x: function () {
    console.log('obj x', this); // obj
    const y = function () {
      console.log('obj y', this); // undefined
    };
    y();
  },
};
obj.x();

const obj2 = {
  a: 10,
  x: function () {
    console.log('obj2 x', this); // obj4
    const y = () => {
      console.log('obj2 y', this); // obj4
    };
    y();
  },
};
obj2.x();

const obj3 = {
  a: 10,
  x: () => {
    console.log('obj3 x', this); // window
    const y = function () {
      console.log('obj3 y', this); // undefined
    };
    y();
  },
};
obj3.x();

const obj4 = {
  a: 10,
  x: () => {
    console.log('obj4 x', this); // window
    const y = () => {
      console.log('obj4 y', this); // window
    };
    y();
  },
};
obj4.x();
