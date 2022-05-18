import Point from '../models/Point';

class PixelUtils {
  static getPixelAtScreenPosition(x: number, y: number, gridSize: number, canvasWidth: number) {
    const gridX = Math.floor(x / gridSize);
    const gridY = Math.floor(y / gridSize);
    return gridY * canvasWidth + gridX;
  }

  static getGridPosition(pixelPosition: number, canvasWidth: number) {
    const y = Math.floor(pixelPosition / canvasWidth);
    const x = pixelPosition - y * canvasWidth;

    return new Point(x, y);
  }

  static getIndexAtGridPosition(gridX: number, gridY: number, canvasWidth: number) {
    return gridY * canvasWidth + gridX;
  }
}

export default PixelUtils;
