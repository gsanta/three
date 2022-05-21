import PDocument from '@/core/models/PDocument';
import ColorUtils from '@/core/utils/ColorUtils';
import PixelUtils from '@/core/utils/PixelUtils';

class CheckerBoard {
  static create(document: PDocument) {
    const frame = document.layers[0];
    const { checkerSize } = document;
    const checkerSizeDouble = checkerSize * 2;
    PixelUtils.iteratePixels(document, (row, col, index) => {
      const isDarkRow = row % checkerSizeDouble < checkerSize;
      const isDarkCol = isDarkRow ? col % checkerSizeDouble >= checkerSize : col % checkerSizeDouble < checkerSize;
      // const isDarkCol = col % 2 === darkOffset;

      if (isDarkCol) {
        frame.pixels[index] = ColorUtils.colorToInt('rgb(140, 137, 137)');
      } else {
        frame.pixels[index] = ColorUtils.colorToInt('rgb(163, 159, 158)');
      }
    });
  }
}

export default CheckerBoard;
