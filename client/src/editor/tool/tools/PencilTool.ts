import EditorEventEmitter from '@/editor/core/event/EditorEventEmitter';
import PixelStore from '@/editor/pixel/PixelStore';
import Pixel from '@/editor/pixel/types/Pixel';
import Point from '@/editor/pixel/types/Point';
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

  onClick(e: MouseEvent): void {
    const pixel = new Pixel(new Point(e.clientX, e.clientY));
    this.pixelStore.addPixel(pixel);
    this.editorEventEmitter.emit('pixelAdded', pixel);
  }
}

export default PencilTool;
