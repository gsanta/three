import PDocument from '../models/PDocument';
import Point from '../models/Point';

class PixelUtils {
  static getPixelAtScreenPosition(x: number, y: number, gridSize: number, canvasWidth: number) {
    const gridX = Math.floor(x / gridSize);
    const gridY = Math.floor(y / gridSize);
    return gridY * canvasWidth + gridX;
  }

  static getGridPosition(pixelIndex: number, document: PDocument, frameIndex: number) {
    const { canvasWidth } = document;
    const scaledWidth = canvasWidth / document.layers[frameIndex].scale;
    const y = Math.floor(pixelIndex / scaledWidth);
    const x = pixelIndex - y * scaledWidth;

    return new Point(x, y);
  }

  static getIndexAtGridPosition(gridX: number, gridY: number, canvasWidth: number) {
    return gridY * canvasWidth + gridX;
  }

  static iteratePixels(document: PDocument, callback: (row: number, col: number, index: number, val: number) => void) {
    const { canvasWidth } = document;
    document.layers[0].pixels.forEach((currVal, index) => {
      const currCol = index % canvasWidth;
      const currRow = Math.floor(index / canvasWidth);

      callback(currRow, currCol, index, currVal);
    });
  }
}

export default PixelUtils;
