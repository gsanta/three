import DocumentStore from '@/features/document/DocumentStore';
import CanvasStore from '../../features/canvas/CanvasStore';
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
    const { activeLayer, canvasWidth } = activeDocument;
    const { baseSize } = this.documentStore.activeDocument;
    const pixelSize = baseSize * activeLayer.scale;
    const halfPixelSize = pixelSize / 2;
    const scaledCanvasWidth = canvasWidth / activeLayer.scale;

    activeLayer.pixels.forEach((pixel, index) => {
      context.fillStyle = ColorUtils.intToColor(pixel);
      const gridPosition = PixelUtils.getGridPosition(index, scaledCanvasWidth);
      const screenPosition = gridPosition.mul(pixelSize).sub(halfPixelSize);
      context.fillRect(screenPosition.x, screenPosition.y, pixelSize, pixelSize);
    });

    // this.pixelStore.getPixels().forEach((pixel) => {
    //   context.fillStyle =  'rgb(' pixel.color;
    //   context.fillRect(pixel.topLeftX, pixel.topLeftY, 5, 5);
    // });
  }
}

export default PixelRenderer;
