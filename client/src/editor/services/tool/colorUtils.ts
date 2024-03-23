export type Color = {
  r: number;
  g: number;
  b: number;
  a?: number;
};

export const colorToHexString = ({ r, g, b, a }: Color) => {
  const toString = (num: number) => {
    const str = num.toString(16);
    return str.length === 1 ? '0' + str : str;
  };

  const aStr = toString(Math.floor((a || 1) * 255));
  const rStr = toString(r);
  const gStr = toString(g);
  const bStr = toString(b);

  return '#' + rStr + gStr + bStr + aStr;
};
