import PDocument from './PDocument';

class Layer {
  static BACKGROUND_LAYER = 0;

  pixels: Uint32Array = new Uint32Array();

  private document: PDocument;

  get width() {
    return this.document.canvasWidth / this.scale;
  }

  get height() {
    return this.document.canvasHeight / this.scale;
  }

  constructor(document: PDocument) {
    this.document = document;
  }

  scale = 1;
}

export default Layer;
