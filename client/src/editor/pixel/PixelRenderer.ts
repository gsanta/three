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
    context.beginPath();
    context.rect(20, 20, 150, 100);
    context.stroke();
  }
}

export default PixelRenderer;
