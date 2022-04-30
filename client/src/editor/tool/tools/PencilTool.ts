import EditorEventEmitter from '@/editor/core/event/EditorEventEmitter';
import PixelStore from '@/editor/pixel/PixelStore';
import Pixel from '@/editor/pixel/types/Pixel';
import Point from '@/editor/pixel/types/Point';
import PointerData from '../types/PointerData';
import Tool from '../types/Tool';
import ToolType from '../types/ToolType';

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
