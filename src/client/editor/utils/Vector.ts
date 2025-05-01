import Axis from '../models/Axis';
import Num3 from '../models/Num3';

class Vector {
  constructor(position: Num3 = [0, 0, 0]) {
    this.position = position;
  }

  multiply(other: Vector): Vector {
    const newPosition = this.get().map((val, index) => val * other.get()[index]) as Num3;
    return new Vector(newPosition);
  }

  sub(other: Vector): Vector {
    const newPosition = this.get().map((val, index) => val - other.get()[index]) as Num3;
    return new Vector(newPosition);
  }

  add(other: Vector): Vector {
    const newPosition = this.get().map((val, index) => val + other.get()[index]) as Num3;
    return new Vector(newPosition);
  }

  negate(): Vector {
    const newPosition = this.get().map((val) => -val) as Num3;
    return new Vector(newPosition);
  }

  rotateY(angle: number): Vector {
    const result = [0, this.position[1], 0] as Num3;
    const rad = angle;

    result[0] = this.position[0] * Math.cos(rad) + this.position[2] * Math.sin(rad);
    result[2] = -this.position[0] * Math.sin(rad) + this.position[2] * Math.cos(rad);

    return new Vector(result);
  }

  size() {
    return Math.sqrt(this.position[0] ** 2 + this.position[1] ** 2 + this.position[2] ** 2);
  }

  get(): Num3 {
    return this.position;
  }

  static getAxisIndex = (axis: Axis) => {
    if (axis === 'x') {
      return 0;
    }

    if (axis === 'y') {
      return 1;
    }

    return 2;
  };

  private position: Num3;
}

export default Vector;
