import Point from './Point';

class Pixel {
  position: Point;

  color: string | undefined;

  constructor(position: Point) {
    this.position = position;
  }
}

export default Pixel;
