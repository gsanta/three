import Num3 from '@/client/editor/models/Num3';

export type RGBColor = {
  r: number;
  g: number;
  b: number;
  a?: number;
};

export const colorToHexString = ({ r, g, b }: RGBColor) => {
  const toString = (num: number) => {
    const str = num.toString(16);
    return str.length === 1 ? '0' + str : str;
  };

  const rStr = toString(r);
  const gStr = toString(g);
  const bStr = toString(b);

  return '0x' + rStr + gStr + bStr;
};

export const colorToArray = ({ r, g, b }: RGBColor): Num3 => {
  return [r / 255, g / 255, b / 255];
};
