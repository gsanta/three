import Canvas from './Canvas';
import PixelStore from './PixelStore';

class PixelRenderer {
  private context: CanvasRenderingContext2D;

  pixelStore: PixelStore;

  private canvas: Canvas;

  constructor(pixelStore: PixelStore, canvas: Canvas, context: CanvasRenderingContext2D) {
    this.pixelStore = pixelStore;
    this.canvas = canvas;
    this.context = context;
  }

  render(): void {
    const { context } = this;

    context.clearRect(0, 0, this.canvas.size.x, this.canvas.size.y);

    this.pixelStore.getPixels().forEach((pixel) => {
      context.beginPath();
      context.rect(pixel.position.x, pixel.position.y, 5, 5);
      context.stroke();
    });
  }
}

export default PixelRenderer;
