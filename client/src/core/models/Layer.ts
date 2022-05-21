class Layer {
  pixels: Uint32Array = new Uint32Array();

  constructor(pixels: Uint32Array) {
    this.pixels = pixels;
  }

  scale = 1;
}

export default Layer;
