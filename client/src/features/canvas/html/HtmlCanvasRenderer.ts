import CanvasRenderer from '@/features/canvas/CanvasRenderer';
import Layer from '../../../core/models/Layer';
import ColorUtils from '../../../core/utils/ColorUtils';
import PixelUtils from '../../../core/utils/PixelUtils';
import PDocument from '@/core/models/PDocument';
import CanvasContext from '../CanvasContext';

class HtmlCanvasRenderer implements CanvasRenderer {
  private context: CanvasRenderingContext2D;

  private canvasContext: CanvasContext;

  constructor(canvasContext: CanvasContext, renderingContext: CanvasRenderingContext2D) {
    this.canvasContext = canvasContext;
    this.context = renderingContext;
  }

  render(document: PDocument): void {
    const { context } = this;
    const { width, height } = this.canvasContext;

    context.clearRect(0, 0, width, height);

    const { tempLayer, backgroundLayer, layers, baseSize } = document;

    this.renderLayer(backgroundLayer, baseSize);

    const pixelSize = baseSize * layers[0].scale;
    const halfPixelSize = pixelSize / 2;
    layers[0].colors.forEach((pixel, index) => {
      let selectedLayer: Layer = layers[0];
      if (tempLayer.colors[index] === 1) {
        selectedLayer = tempLayer;
        context.fillStyle = ColorUtils.intToColor(tempLayer.colors[index]);
      } else {
        selectedLayer = layers.find((layer) => layer.colors[index] !== 0) || selectedLayer;

        context.fillStyle = ColorUtils.intToColor(pixel);
      }
      const gridPosition = PixelUtils.getGridPosition(index, selectedLayer);
      const screenPosition = gridPosition.mul(pixelSize).sub(halfPixelSize);
      context.fillRect(screenPosition.x, screenPosition.y, pixelSize, pixelSize);
    });

    // activeDocument.layers.forEach((layer) => this.renderLayer(layer, baseSize));

    // this.renderLayer(activeDocument.tempLayer, baseSize);

    // this.pixelStore.getPixels().forEach((pixel) => {
    //   context.fillStyle =  'rgb(' pixel.color;
    //   context.fillRect(pixel.topLeftX, pixel.topLeftY, 5, 5);
    // });
  }

  private renderLayer(layer: Layer, baseSize: number) {
    const { context } = this;

    const pixelSize = baseSize * layer.scale;
    const halfPixelSize = pixelSize / 2;
    layer.colors.forEach((pixel, index) => {
      context.fillStyle = ColorUtils.intToColor(pixel);
      const gridPosition = PixelUtils.getGridPosition(index, layer);
      const screenPosition = gridPosition.mul(pixelSize).sub(halfPixelSize);
      context.fillRect(screenPosition.x, screenPosition.y, pixelSize, pixelSize);
    });
  }
}

export default HtmlCanvasRenderer;
