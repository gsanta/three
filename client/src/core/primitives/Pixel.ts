interface Pixel {
  gridX?: number;

  gridY?: number;

  width?: number;

  height?: number;

  topLeftX: number;

  topLeftY: number;

  color: string;
}

export const defaultColor = '#000000';

export default Pixel;
