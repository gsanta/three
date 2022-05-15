import ColorUtils from '@/core/utils/ColorUtils';
import Pixel from '../../core/primitives/Pixel';

class PixelStore {
  private pixels: Pixel[] = [];

  pixels2: Uint32Array = new Uint32Array();

  pixelSize = 5;

  canvasWidth = 0;

  canvasHeight = 0;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    const pixels = new Uint32Array(this.canvasWidth * this.canvasHeight);
    const transparentColorInt = ColorUtils.colorToInt('rgba(0, 0, 0, 0)');
    pixels.fill(transparentColorInt);
    this.pixels2 = pixels;
  }

  addPixel(pixel: Pixel) {
    this.pixels.push(pixel);
  }

  getPixels(): Pixel[] {
    return this.pixels;
  }
}

export default PixelStore;
