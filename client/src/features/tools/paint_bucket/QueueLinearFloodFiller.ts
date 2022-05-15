import Point from '@/core/primitives/Point';
import FloodFillRangeQueue from './FloodFillRangeQueue';

type FillerData = {
  width: number;

  height: number;

  pixels: number[];

  point: Point;

  targetColor: number;

  replacementColor: number;

  selectionThreshold?: number;
};

class QueueLinearFloodFiller {
  private data?: FillerData;

  private pixelsChecked: boolean[] = [];

  private ranges: FloodFillRangeQueue = new FloodFillRangeQueue();

  public floodFill(data: FillerData): void {
    this.data = data;
    this.pixelsChecked = [];
    this.ranges = new FloodFillRangeQueue();

    this.linearFill(this.data.point.x, this.data.point.y);

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
    if (!this.data) {
      return;
    }

    const { width, replacementColor, pixels } = this.data;

    let leftMostX = x;
    let pixelIndex = y * width + x;

    while (true) {
      pixels[width * y + leftMostX] = replacementColor;
      this.pixelsChecked[pixelIndex] = true;
      leftMostX -= 1;
      pixelIndex -= 1;
      if (!this.checkPoint(leftMostX, y)) {
        break;
      }
    }
    leftMostX += 1;

    let rightMostX = x;
    pixelIndex = y * width + x;
    while (true) {
      pixels[width * y + rightMostX] = replacementColor;
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
    if (!this.data) {
      return false;
    }

    const { height, width } = this.data;

    const pixelIndex = y * width + x;
    if (
      x >= 0 &&
      x < width &&
      y >= 0 &&
      y < height &&
      !this.pixelsChecked[pixelIndex] &&
      this.isPixelWithinColorTolerance(x, y)
    ) {
      return true;
    }
    return false;
  }

  private isPixelWithinColorTolerance(x: number, y: number): boolean {
    return this.data?.pixels[this.data?.width * y + x] === this.data?.targetColor;
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
