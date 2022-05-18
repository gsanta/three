import ColorUtils from '@/core/utils/ColorUtils';

class Frame {
  pixels: Uint32Array = new Uint32Array();

  pixelSize = 5;

  canvasWidth = 0;

  canvasHeight = 0;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    const pixels = new Uint32Array(this.canvasWidth * this.canvasHeight);
    const transparentColorInt = ColorUtils.colorToInt('rgba(0, 0, 0, 0)');
    pixels.fill(transparentColorInt);
    this.pixels = pixels;
  }
}

export default Frame;
