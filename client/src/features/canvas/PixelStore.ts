import Pixel from '../../core/primitives/Pixel';

class PixelStore {
  private pixels: Pixel[] = [];

  addPixel(pixel: Pixel) {
    this.pixels.push(pixel);
  }

  getPixels(): Pixel[] {
    return this.pixels;
  }
}

export default PixelStore;
