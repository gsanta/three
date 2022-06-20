import ColorUtils from '../utils/ColorUtils';
import PDocument from './PDocument';

class Layer {
  static BACKGROUND_LAYER = 0;

  colors: Uint32Array = new Uint32Array();

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

  clear(clearColor = ColorUtils.colorToInt('rgba(0, 0, 0, 0)')) {
    this.colors.fill(clearColor);
  }

  scale = 1;
}

export default Layer;
