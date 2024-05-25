import Num3 from '@/client/editor/types/Num3';
import { calculateDistance } from './findClosestBlock';

const isPositionCloseTo = (expected: Num3, actual: Num3): boolean => {
  const distance = calculateDistance(expected, actual);

  return distance < 0.1;
};

export default isPositionCloseTo;
