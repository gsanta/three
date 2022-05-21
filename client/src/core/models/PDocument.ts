import ColorUtils from '@/core/utils/ColorUtils';
import CheckerBoard from '@/features/frame/CheckerBoard';
import Layer from './Layer';

class PDocument {
  layers: Layer[] = [];

  activeLayer: Layer;

  name = '';

  baseSize = 5;

  checkerSize = 4;

  canvasWidth = 0;

  canvasHeight = 0;

  getLayerWidth(layerIndex: number) {
    return this.layers[layerIndex].scale * this.canvasWidth;
  }

  getLayerHeight(layerIndex: number) {
    return this.layers[layerIndex].scale * this.canvasHeight;
  }

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    const pixels = new Uint32Array(this.canvasWidth * this.canvasHeight);
    const frame = new Layer(pixels);

    const transparentColorInt = ColorUtils.colorToInt('rgba(0, 0, 0, 0)');
    pixels.fill(transparentColorInt);
    frame.pixels = pixels;

    this.activeLayer = frame;
    this.layers.push(frame);

    CheckerBoard.create(this);
  }
}

export default PDocument;
