class Rectangle {
  #width;
  #height;
  constructor(_width, _height) {
    this.#width = _width;
    this.#height = _height;
  }

  static isSquare(rect) {
    return rect.width === rect.height;
  }

  get width() {
    return this.#width;
  }

  set width(_width) {
    if (isNaN(_width)) throw new Error('Width must be a number');
    if (_width <= 0) {
      throw new Error('Width must be positive');
    }
    this.#width = _width;
  }

  get height() {
    return this.#height;
  }

  set height(_height) {
    if (isNaN(_height)) throw new Error('Height must be a number');
    if (_height <= 0) {
      throw new Error('Height must be positive');
    }
    this.#height = _height;
  }

  get area() {
    return this.#width * this.#height;
  }
}

const rect = new Rectangle(5, 10);
console.log(rect.height);
console.log(Rectangle.isSquare(rect));
rect.height = 5;
console.log(rect.area);
rect.height = 'a';

console.log(Rectangle.isSquare(rect));