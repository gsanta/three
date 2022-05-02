import Pixel, { defaultColor } from '@/core/primitives/Pixel';
import CanvasStore from './CanvasStore';

class PixelService {
  private canvasStore: CanvasStore;

  constructor(canvasStore: CanvasStore) {
    this.canvasStore = canvasStore;
  }

  getPixelAtScreenPosition(x: number, y: number) {
    const gridX = Math.floor(x / this.canvasStore.gridSizeX);
    const gridY = Math.floor(y / this.canvasStore.gridSizeY);
    return this.getPixelAtGridPosition(gridX, gridY);
  }

  getPixelAtGridPosition(gridX: number, gridY: number) {
    const { gridSizeX, gridSizeY } = this.canvasStore;
    const topLeftX = gridX * gridSizeX;
    const topLeftY = gridY * gridSizeY;

    const pixel: Pixel = {
      gridX,
      gridY,
      topLeftX,
      topLeftY,
      width: gridSizeX,
      height: gridSizeY,
      color: defaultColor,
    };

    return pixel;
  }
}

export default PixelService;
