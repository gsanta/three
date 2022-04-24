import Pixel from './types/Pixel';

class PixelStore {
  private pixels: Pixel[] = [];

  addPixel(pixel: Pixel) {
    this.pixels.push(pixel);
  }
}

export default PixelStore;
