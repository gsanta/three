import Axis from '../types/Axis';
import Num3 from '../types/Num3';
import { defaultSnap } from './sceneUtils';

class VectorUtils {
  static getAxisIndex = (axis: Axis) => {
    if (axis === 'x') {
      return 0;
    }

    if (axis === 'y') {
      return 1;
    }

    return 2;
  };

  static multiplyVec3(vec1: Num3, vec2: Num3): Num3 {
    return [vec1[0] * vec2[0], vec1[1] * vec2[1], vec1[2] * vec2[2]];
  }

  static subtractNum3(vec1: Num3, vec2: Num3): Num3 {
    return vec1.map((val, index) => val - vec2[index]) as Num3;
  }

  static addNum3(vec1: Num3, vec2: Num3): Num3 {
    return vec1.map((val, index) => val + vec2[index]) as Num3;
  }
}

export default VectorUtils;

export const multiplyVector = (
  vector: [number, number, number],
  val: number,
  direction?: Axis,
): [number, number, number] => {
  const copy = [...vector];
  if (direction) {
    copy[VectorUtils.getAxisIndex(direction)] *= val;
  } else {
    copy.forEach((_val, index) => {
      copy[index] *= val;
    });
  }
  return copy as Num3;
};

export const addVector = (
  vector1: [number, number, number],
  vector2: [number, number, number],
): [number, number, number] => {
  return vector1.map((val, index) => (val += vector2[index])) as Num3;
};

export const snapTo = (num: number, snapVal = defaultSnap) => {
  const base = num < 0 ? Math.ceil(num / snapVal) : Math.floor(num / snapVal);
  return base * snapVal;
};
