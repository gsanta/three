import EditorEventEmitter from '@/core/event/EditorEventEmitter';
import Tool from '@/core/tool/Tool';
import ToolType from '@/core/tool/ToolType';
import PixelStore from '@/features/canvas/PixelStore';
import Pixel from '@/core/primitives/Pixel';
import Point from '@/core/primitives/Point';
import PointerData from '../../../core/tool/PointerData';

class PencilTool implements Tool {
  type = ToolType.Pencil;

  private pixelStore: PixelStore;

  private editorEventEmitter: EditorEventEmitter;

  constructor(pixelStore: PixelStore, editorEventEmitter: EditorEventEmitter) {
    this.pixelStore = pixelStore;
    this.editorEventEmitter = editorEventEmitter;
  }

  onClick(pointer: PointerData): void {
    const pixel = new Pixel(new Point(pointer.x, pointer.y));
    this.pixelStore.addPixel(pixel);
    this.editorEventEmitter.emit('pixelAdded', pixel);
  }

  onMove(pointer: PointerData): void {

  }
}

export default PencilTool;
