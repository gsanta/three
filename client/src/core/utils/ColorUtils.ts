import tinycolor from 'tinycolor2';

class ColorUtils {
  private static colorCache: Record<string, number> = {};

  private static colorCacheReverse: Record<number, string> = {};

  static COLOR_WHITE = 'rgba(0, 0, 0, 1)';

  static COLOR_BLACK = 'rgba(255, 255, 255, 1)';

  static colorToInt(color: number | string): number {
    if (typeof color === 'number') {
      return color;
    }

    if (this.colorCache[color] !== undefined) {
      return this.colorCache[color];
    }

    const tc = tinycolor(color);
    if (tc && tc.isValid()) {
      const rgb = tc.toRgb();
      const a = Math.round(rgb.a * 255);
      let intValue = ((a << 24) >>> 0) + (rgb.b << 16) + (rgb.g << 8) + rgb.r;
      if (a === 0) {
        // assign all 'transparent' colors to 0, theoretically mapped to rgba(0,0,0,0) only
        intValue = 0;
      }
      this.colorCache[color] = intValue;
      this.colorCacheReverse[intValue] = color;
      return intValue;
    } else {
      // If tinycolor failed, determine color by using the browser
      const d = document.createElement('div');
      d.style.color = color;
      document.body.appendChild(d);

      // Color in RGB
      color = window.getComputedStyle(d).color;
      document.body.removeChild(d);

      return this.colorToInt(color);
    }
  }

  static intToColor(intValue: number | string) {
    if (typeof intValue === 'string') {
      return intValue;
    }

    if (this.colorCacheReverse[intValue] !== undefined) {
      return this.colorCacheReverse[intValue];
    }

    const r = intValue & 0xff;
    const g = (intValue >> 8) & 0xff;
    const b = (intValue >> 16) & 0xff;
    const a = (((intValue >> 24) >>> 0) & 0xff) / 255;
    const color = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';

    this.colorCache[color] = intValue;
    this.colorCacheReverse[intValue] = color;
    return color;
  }
}

export default ColorUtils;
