import EditorEventEmitter from '@/core/event/EditorEventEmitter';
import Layer from '@/core/models/Layer';
import PDocument from '@/core/models/PDocument';
import PointerData from '@/core/tool/PointerData';
import Tool from '@/core/tool/Tool';
import ToolType from '@/core/tool/ToolType';
import ColorUtils from '@/core/utils/ColorUtils';
import PixelUtils from '@/core/utils/PixelUtils';
import DocumentStore from '@/features/document/DocumentStore';

class EraseTool extends Tool {
  name = 'Erase';

  type = ToolType.Erase;

  icon = 'erase' as const;

  size = 2;

  sizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  private documentStore: DocumentStore;

  private editorEventEmitter: EditorEventEmitter;

  constructor(documentStore: DocumentStore, editorEventEmitter: EditorEventEmitter) {
    super();
    this.documentStore = documentStore;
    this.editorEventEmitter = editorEventEmitter;
  }

  click(pointer: PointerData): void {
    const { x, y } = pointer;
    this.erasePixel(x, y);
  }

  drag(pointer: PointerData): void {
    const { x, y } = pointer;
    this.erasePixel(x, y);
  }

  move(pointer: PointerData): void {
    const { x, y } = pointer;
    const { activeDocument } = this.documentStore;
    const { baseSize, canvasWidth, tempLayer } = activeDocument;
    const pixel = PixelUtils.getPixelAtScreenPosition(x, y, baseSize, canvasWidth);

    // if (tempLayer.pixels[pixel] !== 1) {
    tempLayer.clear();
    this.createFilled(x, y, tempLayer, 1, activeDocument);
    // tempLayer.pixels[pixel] = 1;
    this.editorEventEmitter.emit('pixelAdded');
    // }
  }

  private erasePixel(x: number, y: number) {
    const { activeDocument } = this.documentStore;
    const { baseSize: pixelSize, canvasWidth, activeLayer } = activeDocument;
    const pixel = PixelUtils.getPixelAtScreenPosition(x, y, pixelSize, canvasWidth);
    activeLayer.pixels[pixel] = ColorUtils.colorToInt('rgba(0, 0, 0, 0)');
    this.editorEventEmitter.emit('pixelAdded');
  }

  private createFilled(x: number, y: number, layer: Layer, color: number, document: PDocument) {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const index = PixelUtils.getIndexAtGridPosition(x + i, y + j, document.canvasWidth);
        layer.pixels[index] = color;
      }
    }
  }
}

export default EraseTool;
