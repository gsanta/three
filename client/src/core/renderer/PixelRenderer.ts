import CanvasStore from '../../features/canvas/CanvasStore';
import PixelStore from '../../features/canvas/PixelStore';

class PixelRenderer {
  private context: CanvasRenderingContext2D;

  pixelStore: PixelStore;

  private canvas: CanvasStore;

  constructor(pixelStore: PixelStore, canvas: CanvasStore, context: CanvasRenderingContext2D) {
    this.pixelStore = pixelStore;
    this.canvas = canvas;
    this.context = context;
  }

  render(): void {
    const { context } = this;

    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.pixelStore.getPixels().forEach((pixel) => {
      context.fillStyle = pixel.color;
      context.fillRect(pixel.topLeftX, pixel.topLeftY, 5, 5);
    });
  }
}

export default PixelRenderer;
