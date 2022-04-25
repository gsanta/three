import Point from './Point';

class Pixel {
  private _position: Point;

  private _color: string | undefined;

  private _dirty = true;

  constructor(position: Point) {
    this._position = position;
  }

  get color(): string | undefined {
    return this._color;
  }

  set color(color: string | undefined) {
    this._color = color;
    this._dirty = true;
  }

  get position(): Point {
    return this._position;
  }

  set position(position: Point) {
    this._position = position;
    this._dirty = true;
  }

  get dirty() {
    return this._dirty;
  }
}

export default Pixel;
