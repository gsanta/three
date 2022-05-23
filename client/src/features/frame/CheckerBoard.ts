import Layer from '@/core/models/Layer';
import PDocument from '@/core/models/PDocument';
import ColorUtils from '@/core/utils/ColorUtils';
import LayerUtils from '@/core/utils/LayerUtils';

class CheckerBoard {
  static create(document: PDocument) {
    const layer = document.layers[Layer.BACKGROUND_LAYER];
    LayerUtils.iteratePixels(layer, (row, col, index) => {
      const isDarkRow = row % 2 === 0;
      const isDarkCol = isDarkRow ? col % 2 === 0 : col % 2 === 1;

      if (isDarkCol) {
        layer.pixels[index] = ColorUtils.colorToInt('rgb(140, 137, 137)');
      } else {
        layer.pixels[index] = ColorUtils.colorToInt('rgb(163, 159, 158)');
      }
    });
  }
}

export default CheckerBoard;
