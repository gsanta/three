import Axis from './Axis';
import Num3 from './Num3';

class Vector {
  constructor(position: Num3 = [0, 0, 0]) {
    this.position = position;
  }

  // returns -180 to 180 deg
  angle2(other: Vector) {
    const [x1, , z1] = this.position;
    const [x2, , z2] = other.get();

    const dot = x1 * x2 + z1 * z2;
    const det = x1 * z2 - z1 * x2; // This is the 2D cross product

    const angleRad = Math.atan2(det, dot);
    const angleDeg = angleRad * (180 / Math.PI);

    return angleDeg;
  }

  distance(other: Vector) {
    return Math.sqrt(
      Math.pow(this.position[0] - other.get()[0], 2) +
        Math.pow(this.position[1] - other.get()[1], 2) +
        Math.pow(this.position[2] - other.get()[2], 2),
    );
  }

  multiply(other: Vector): Vector {
    const newPosition = this.get().map((val, index) => val * other.get()[index]) as Num3;
    return new Vector(newPosition);
  }

  sub(other: Vector): Vector {
    const newPosition = this.get().map((val, index) => val - other.get()[index]) as Num3;
    return new Vector(newPosition);
  }

  subXZ(other: Vector): Vector {
    return new Vector([this.position[0] - other.get()[0], this.position[1], this.position[2] - other.get()[2]]);
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

  get x() {
    return this.position[0];
  }

  get y() {
    return this.position[1];
  }

  get z() {
    return this.position[2];
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

  static normalizeAngle(angle: number) {
    angle = angle % 360;
    if (angle < 0) angle += 360;
    return angle <= 180 ? angle : angle - 360;
  }

  static toDegree(rad: number, roundInt = true) {
    const degree = (rad * 180) / Math.PI;

    return roundInt ? Math.round(degree) : degree;
  }

  static toRadian(degree: number) {
    return (degree * Math.PI) / 180;
  }

  private position: Num3;
}

export default Vector;
