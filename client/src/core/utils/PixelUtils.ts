import Layer from '../models/Layer';
import Point from '../models/Point';

class PixelUtils {
  static getPixelAtScreenPosition(x: number, y: number, gridSize: number, canvasWidth: number) {
    const gridX = Math.floor(x / gridSize);
    const gridY = Math.floor(y / gridSize);
    return gridY * canvasWidth + gridX;
  }

  static getGridPosition(pixelIndex: number, layer: Layer) {
    const y = Math.floor(pixelIndex / layer.width);
    const x = pixelIndex - y * layer.width;

    return new Point(x, y);
  }

  static getIndexAtGridPosition(gridX: number, gridY: number, canvasWidth: number) {
    return gridY * canvasWidth + gridX;
  }
}

export default PixelUtils;
