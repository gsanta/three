import Layer from '@/core/models/Layer';
import PixelUtils from '@/core/utils/PixelUtils';
import FloodFillRangeQueue from './FloodFillRangeQueue';

class QueueLinearFloodFiller {
  // private data?: FillerData;

  private layer?: Layer;

  private newColor = 0;

  private oldColor = 0;

  private pixelsChecked: boolean[] = [];

  private width = 0;

  private height = 0;

  private pixels = new Uint32Array();

  private ranges: FloodFillRangeQueue = new FloodFillRangeQueue();

  public floodFill(pixelIndex: number, newColor: number, layer: Layer): void {
    this.newColor = newColor;
    this.layer = layer;

    this.width = layer.width;
    this.height = layer.height;
    this.pixels = layer.colors;
    this.oldColor = this.pixels[pixelIndex];

    this.pixelsChecked = [];
    this.ranges = new FloodFillRangeQueue();

    const { x, y } = PixelUtils.getGridPosition(pixelIndex, layer);
    this.linearFill(x, y);

    while (this.ranges.getCount() > 0) {
      // Get next range of the queue
      const range = this.ranges.removeAndReturnFirstElement();

      const upY = range.y - 1;
      const downY = range.y + 1;

      for (let i = range.startX; i <= range.endX; i++) {
        if (this.checkPoint(i, upY)) {
          this.linearFill(i, upY);
        }

        if (this.checkPoint(i, downY)) {
          this.linearFill(i, downY);
        }
      }
    }
  }

  /*
   * Find the furthermost left and right boundaries of the fill area on a
   * given y coordinate and fills them on the way. Adds the resulting
   * horizontal range to the ranges-queue to be processed in the main loop.
   */
  private linearFill(x: number, y: number): void {
    if (!this.layer) {
      return;
    }

    let leftMostX = x;
    let pixelIndex = y * this.width + x;

    while (true) {
      this.layer.colors[this.width * y + leftMostX] = this.newColor;
      this.pixelsChecked[pixelIndex] = true;
      leftMostX -= 1;
      pixelIndex -= 1;
      if (!this.checkPoint(leftMostX, y)) {
        break;
      }
    }
    leftMostX += 1;

    let rightMostX = x;
    pixelIndex = y * this.width + x;
    while (true) {
      this.layer.colors[this.width * y + rightMostX] = this.newColor;
      this.pixelsChecked[pixelIndex] = true;
      rightMostX += 1;
      pixelIndex += 1;
      if (!this.checkPoint(rightMostX, y)) {
        break;
      }
    }
    rightMostX -= 1;

    this.ranges?.addToEndOfQueue({
      startX: leftMostX,
      endX: rightMostX,
      y,
    });
  }

  private checkPoint(x: number, y: number): boolean {
    if (!this.layer) {
      return false;
    }

    const pixelIndex = y * this.width + x;
    if (
      x >= 0 &&
      x < this.width &&
      y >= 0 &&
      y < this.height &&
      !this.pixelsChecked[pixelIndex] &&
      this.isPixelWithinColorTolerance(x, y)
    ) {
      return true;
    }
    return false;
  }

  private isPixelWithinColorTolerance(x: number, y: number): boolean {
    return this.pixels[this.width * y + x] === this.oldColor;
  }

  // private static boolean isPixelWithinColorTolerance(int x, int y) {
  // 	int pixelColor = mPixels[(mwidth * y) + x];

  // 	int targetRed = Color.red(mTargetColor);
  // 	int pixelRed = Color.red(pixelColor);
  // 	int targetBlue = Color.blue(mTargetColor);
  // 	int pixelBlue = Color.blue(pixelColor);
  // 	int targetGreen = Color.green(mTargetColor);
  // 	int pixelGreen = Color.green(pixelColor);
  // 	int targetAlpha = Color.alpha(mTargetColor);
  // 	int pixelAlpha = Color.alpha(pixelColor);

  // 	double diff = Math.sqrt(Math.pow((pixelRed - targetRed), 2)
  // 			+ Math.pow((pixelGreen - targetGreen), 2)
  // 			+ Math.pow((pixelBlue - targetBlue), 2)
  // 			+ Math.pow((pixelAlpha - targetAlpha), 2));

  // 	return diff < mSelectionThreshold;
  // }
}

export default QueueLinearFloodFiller;
