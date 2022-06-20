import ColorUtils from '@/core/utils/ColorUtils';
import CheckerBoard from '@/features/frame/CheckerBoard';
import LayerUtils from '../utils/LayerUtils';
import Layer from './Layer';

class PDocument {
  tempLayer: Layer;

  backgroundLayer: Layer;

  layers: Layer[] = [];

  activeLayer: Layer;

  name = '';

  baseSize = 5;

  checkerSize = 4;

  canvasWidth = 0;

  canvasHeight = 0;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.tempLayer = LayerUtils.createLayer(this, 1);

    const backgroundLayer = LayerUtils.createLayer(this, 4);
    const transparentColorInt = ColorUtils.colorToInt('rgba(0, 0, 0, 0)');
    backgroundLayer.colors.fill(transparentColorInt);
    this.backgroundLayer = backgroundLayer;

    const firstLayer = LayerUtils.createLayer(this, 1);
    firstLayer.colors.fill(transparentColorInt);
    this.layers.push(firstLayer);

    this.activeLayer = firstLayer;

    CheckerBoard.create(this);
  }
}

export default PDocument;
