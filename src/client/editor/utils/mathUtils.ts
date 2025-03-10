import Num3 from '../types/Num3';

class MathUtils {
  static normalizeAngle(angle: number) {
    return ((angle % 360) + 360) % 360;
  }

  static distance(pos1: Num3, pos2: Num3) {
    return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2) + Math.pow(pos1[2] - pos2[2], 2));
  }
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
