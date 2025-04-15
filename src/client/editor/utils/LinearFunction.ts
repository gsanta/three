class LinearFunction {
  constructor(m: number, b: number) {
    this.m = m;
    this.b = b;
  }

  get(x: number) {
    return this.m * x + this.b;
  }

  private m: number;

  private b: number;
}

export default LinearFunction;
