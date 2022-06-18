import DocumentStore from '@/features/document/DocumentStore';
import CanvasStore from '../../features/canvas/CanvasStore';
import Layer from '../models/Layer';
import ColorUtils from '../utils/ColorUtils';
import PixelUtils from '../utils/PixelUtils';

class PixelRenderer {
  private context: CanvasRenderingContext2D;

  documentStore: DocumentStore;

  private canvas: CanvasStore;

  constructor(documentStore: DocumentStore, canvas: CanvasStore, context: CanvasRenderingContext2D) {
    this.documentStore = documentStore;
    this.canvas = canvas;
    this.context = context;
  }

  render(): void {
    const { context } = this;

    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const { activeDocument } = this.documentStore;
    const { tempLayer, backgroundLayer, layers } = activeDocument;
    const { baseSize } = this.documentStore.activeDocument;

    this.renderLayer(backgroundLayer, baseSize);
    // this.renderLayer(layers[0], baseSize);

    const pixelSize = baseSize * layers[0].scale;
    const halfPixelSize = pixelSize / 2;
    layers[0].pixels.forEach((pixel, index) => {
      let selectedLayer: Layer = layers[0];
      if (tempLayer.pixels[index] === 1) {
        selectedLayer = tempLayer;
        context.fillStyle = ColorUtils.intToColor(tempLayer.pixels[index]);
      } else {
        selectedLayer = layers.find((layer) => layer.pixels[index] !== 0) || selectedLayer;

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
    layer.pixels.forEach((pixel, index) => {
      context.fillStyle = ColorUtils.intToColor(pixel);
      const gridPosition = PixelUtils.getGridPosition(index, layer);
      const screenPosition = gridPosition.mul(pixelSize).sub(halfPixelSize);
      context.fillRect(screenPosition.x, screenPosition.y, pixelSize, pixelSize);
    });
  }
}

export default PixelRenderer;
