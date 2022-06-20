import EditorEventEmitter from '@/core/event/EditorEventEmitter';
import Tool, { ToolIconName } from '@/core/tool/Tool';
import ToolType from '@/core/tool/ToolType';
import PDocument from '@/core/models/PDocument';
import PointerData from '../../../core/tool/PointerData';
import PaletteStore from '@/features/palette/PaletteStore';
import RectangleSizeHandler from './RectangleSizeHandler';
import PixelUtils from '@/core/utils/PixelUtils';
import ColorUtils from '@/core/utils/ColorUtils';
import DocumentStore from '@/features/document/DocumentStore';

class RectangleTool extends Tool {
  name = 'Rectangle';

  type = ToolType.Rectangle;

  icon = 'rectangle' as ToolIconName;

  size = 2;

  sizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  filled = true;

  private documentStore: DocumentStore;

  private editorEventEmitter: EditorEventEmitter;

  private paletteStore: PaletteStore;

  constructor(documentStore: DocumentStore, editorEventEmitter: EditorEventEmitter, paletteStore: PaletteStore) {
    super();
    this.documentStore = documentStore;
    this.editorEventEmitter = editorEventEmitter;
    this.paletteStore = paletteStore;
  }

  click(pointer: PointerData): void {
    const { x, y } = pointer;
    const { activeDocument } = this.documentStore;
    const { canvasWidth, baseSize: pixelSize } = activeDocument;

    const topLeftIndex = PixelUtils.getPixelAtScreenPosition(x, y, pixelSize, canvasWidth);
    const topLeft = PixelUtils.getGridPosition(topLeftIndex, activeDocument.activeLayer);
    const { x: gridX, y: gridY } = topLeft;

    if (this.filled) {
      this.createFilled(gridX, gridY, activeDocument);
    } else {
      this.createOutline(gridX, gridY, activeDocument);
    }
    this.editorEventEmitter.emit('pixelAdded');
  }

  private createFilled(x: number, y: number, document: PDocument) {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const index = PixelUtils.getIndexAtGridPosition(x + i, y + j, document.canvasWidth);
        document.activeLayer.colors[index] = ColorUtils.colorToInt(this.paletteStore.selectedColor);
      }
    }
  }

  private createOutline(x: number, y: number, document: PDocument) {
    for (let i = 0; i < this.size; i++) {
      const nextTop = PixelUtils.getIndexAtGridPosition(x + i, y, document.canvasWidth);
      const nextBottom = PixelUtils.getIndexAtGridPosition(x + i, y + this.size - 1, document.canvasWidth);
      const nextLeft = PixelUtils.getIndexAtGridPosition(x, y + i, document.canvasWidth);
      const nextRight = PixelUtils.getIndexAtGridPosition(x + this.size - 1, y + i, document.canvasWidth);

      document.activeLayer.colors[nextTop] = ColorUtils.colorToInt(this.paletteStore.selectedColor);
      document.activeLayer.colors[nextBottom] = ColorUtils.colorToInt(this.paletteStore.selectedColor);
      document.activeLayer.colors[nextLeft] = ColorUtils.colorToInt(this.paletteStore.selectedColor);
      document.activeLayer.colors[nextRight] = ColorUtils.colorToInt(this.paletteStore.selectedColor);
    }
  }

  options = [new RectangleSizeHandler()];
}

export default RectangleTool;
