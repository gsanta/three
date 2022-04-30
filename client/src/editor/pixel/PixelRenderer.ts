import CanvasData from './CanvasData';
import PixelStore from './PixelStore';

class PixelRenderer {
  private context: CanvasRenderingContext2D;

  pixelStore: PixelStore;

  private canvas: CanvasData;

  constructor(pixelStore: PixelStore, canvas: CanvasData, context: CanvasRenderingContext2D) {
    this.pixelStore = pixelStore;
    this.canvas = canvas;
    this.context = context;
  }

  render(): void {
    const { context } = this;

    context.clearRect(0, 0, this.canvas.size.x, this.canvas.size.y);

    this.pixelStore.getPixels().forEach((pixel) => {
      context.fillRect(pixel.position.x, pixel.position.y, 5, 5);
    });
  }
}

export default PixelRenderer;
