import EditorEventEmitter from '@/core/event/EditorEventEmitter';
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

  private erasePixel(x: number, y: number) {
    const { activeDocument } = this.documentStore;
    const { baseSize: pixelSize, canvasWidth, activeLayer } = activeDocument;
    const pixel = PixelUtils.getPixelAtScreenPosition(x, y, pixelSize, canvasWidth);
    activeLayer.pixels[pixel] = ColorUtils.colorToInt('rgba(0, 0, 0, 0)');
    this.editorEventEmitter.emit('pixelAdded');
  }
}

export default EraseTool;
