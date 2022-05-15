import CanvasStore from '../../features/canvas/CanvasStore';
import PixelStore from '../../features/canvas/Frame';
import ColorUtils from '../utils/ColorUtils';
import PixelUtils from '../utils/PixelUtils';

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

    const { pixelSize } = this.pixelStore;
    const halfGridSize = this.pixelStore.pixelSize / 2;

    this.pixelStore.pixels2.forEach((pixel, index) => {
      context.fillStyle = ColorUtils.intToColor(pixel);
      const gridPosition = PixelUtils.getGridPosition(index, this.pixelStore.canvasWidth);
      const screenPosition = gridPosition.mul(pixelSize).sub(halfGridSize);
      context.fillRect(screenPosition.x, screenPosition.y, 5, 5);
    });

    // this.pixelStore.getPixels().forEach((pixel) => {
    //   context.fillStyle =  'rgb(' pixel.color;
    //   context.fillRect(pixel.topLeftX, pixel.topLeftY, 5, 5);
    // });
  }
}

export default PixelRenderer;
