import Layer from '../models/Layer';
import PDocument from '../models/PDocument';

class LayerUtils {
  static createLayer(document: PDocument, scale = 1) {
    const { canvasWidth, canvasHeight } = document;
    const pixels = new Uint32Array((canvasWidth * canvasHeight) / scale);

    const layer = new Layer(document);
    layer.colors = pixels;
    layer.scale = scale;

    return layer;
  }

  static iteratePixels(layer: Layer, callback: (row: number, col: number, index: number, val: number) => void) {
    const layerWidth = layer.width;
    layer.colors.forEach((currVal, index) => {
      const currCol = index % layerWidth;
      const currRow = Math.floor(index / layerWidth);

      callback(currRow, currCol, index, currVal);
    });
  }
}

export default LayerUtils;
