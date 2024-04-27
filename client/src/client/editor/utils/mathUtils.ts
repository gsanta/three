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
