import PixelStore from '@/editor/pixel/PixelStore';
import Pixel from '@/editor/pixel/types/Pixel';
import Point from '@/editor/pixel/types/Point';
import Tool from '../types/Tool';
import ToolType from '../types/ToolType';

class PencilTool implements Tool {
  type = ToolType.Pencil;

  private pixelStore: PixelStore;

  constructor(pixelStore: PixelStore) {
    this.pixelStore = pixelStore;
  }

  onClick(e: MouseEvent): void {
    this.pixelStore.addPixel(new Pixel(new Point(e.clientX, e.clientY)));
  }
}

export default PencilTool;
