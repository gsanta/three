import EditorEventEmitter from '@/core/event/EditorEventEmitter';
import Tool, { ToolIconName } from '@/core/tool/Tool';
import ToolType from '@/core/tool/ToolType';
import PointerData from '../../../core/tool/PointerData';
import PaletteStore from '@/features/palette/PaletteStore';
import PixelUtils from '@/core/utils/PixelUtils';
import ColorUtils from '@/core/utils/ColorUtils';
import DocumentStore from '@/features/document/DocumentStore';

class PencilTool extends Tool {
  name = 'Pencil';

  type = ToolType.Pencil;

  icon = 'pencil' as ToolIconName;

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
    this.createPixel(x, y);
  }

  drag(pointer: PointerData): void {
    const { x, y } = pointer;
    this.createPixel(x, y);
  }

  private createPixel(x: number, y: number) {
    const { activeDocument } = this.documentStore;
    const { baseSize: pixelSize, canvasWidth } = activeDocument;
    const pixel = PixelUtils.getPixelAtScreenPosition(x, y, pixelSize, canvasWidth);
    activeDocument.activeLayer.pixels[pixel] = ColorUtils.colorToInt(this.paletteStore.selectedColor);
    this.editorEventEmitter.emit('pixelAdded');
  }
}

export default PencilTool;
