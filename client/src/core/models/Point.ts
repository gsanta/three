class Point {
  x: number;

  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  mul(num: number): Point {
    this.x = this.x * num;
    this.y = this.y * num;

    return this;
  }

  sub(x: number, y?: number): Point {
    this.x = this.x - x;
    this.y = y === undefined ? this.y - x : this.y - y;

    return this;
  }
}

export default Point;
