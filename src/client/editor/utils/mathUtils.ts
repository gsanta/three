import Num3 from '../models/Num3';

class MathUtils {
  constructor(vector: Num3) {
    this.vector = vector;
  }

  static normalizeAngle(angle: number) {
    angle = angle % 360;
    if (angle < 0) angle += 360;
    return angle <= 180 ? angle : angle - 360;
  }

  static distance(pos1: Num3, pos2: Num3) {
    return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2) + Math.pow(pos1[2] - pos2[2], 2));
  }

  static negate(pos: Num3): Num3 {
    return pos.map((coord) => -coord) as Num3;
  }

  add(other: Num3): Num3 {
    return this.vector.map((val, i) => val + other[i]) as Num3;
  }

  // returns -180 to 180 deg
  angle2(other: Num3) {
    const [x1, , z1] = this.vector;
    const [x2, , z2] = other;

    const dot = x1 * x2 + z1 * z2;
    const det = x1 * z2 - z1 * x2; // This is the 2D cross product

    const angleRad = Math.atan2(det, dot);
    const angleDeg = angleRad * (180 / Math.PI);

    return angleDeg;
  }

  dot2(other: Num3) {
    return this.vector[0] * other[0] + this.vector[2] * other[2];
  }

  sub2(other: Num3): Num3 {
    return [this.vector[0] - other[0], this.vector[1], this.vector[2] - other[2]];
  }

  private vector: Num3;
}

export default MathUtils;

export const toRadian = (degree: number) => (degree * Math.PI) / 180;

export const toDegree = (rad: number, roundInt = true) => {
  const degree = (rad * 180) / Math.PI;

  return roundInt ? Math.round(degree) : degree;
};

export const findNearestValue = (values: number[], value: number, eps = 0.1) => {
  const retVal = values.find((val) => Math.abs(value - val) < eps);

  if (retVal === undefined) {
    throw new Error(`Value '${value}' not found in the list ${values.join(', ')}`);
  }

  return retVal;
};
