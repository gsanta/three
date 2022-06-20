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

  static getClipPositions(layer: Layer) {
    const positions: number[] = [];

    const { width, height, scale } = layer;
    const clipWidth = 2 / width;
    const clipHeight = 2 / height;
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const x = (i / width) * 2 - 1;
        const y = (j / height) * 2 - 1;
        positions.push(x, y);
        positions.push(x + clipWidth, y);
        positions.push(x, y + clipHeight);

        positions.push(x + clipWidth, y + clipHeight);
      }
    }

    return positions;

    // const positions: number[] = [];
    // const size = 2 / width;
    // for (let i = 0; i < width; i++) {
    //   for (let j = 0; j < width; j++) {
    //     const x = (i / width) * 2 - 1;
    //     const y = (j / width) * 2 - 1;
    //     positions.push(x, y);
    //     positions.push(x + size, y);
    //     positions.push(x, y + size);

    //     positions.push(x + size, y + size);
    //     // positions.push(x + size, y);
    //     // positions.push(x, y + size);
    //   }
    // }
    // return positions;
  }
}

export default PixelUtils;
