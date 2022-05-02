import EditorEventEmitter from '@/core/event/EditorEventEmitter';
import Tool from '@/core/tool/Tool';
import ToolType from '@/core/tool/ToolType';
import PixelStore from '@/features/canvas/PixelStore';
import PointerData from '../../../core/tool/PointerData';
import PixelService from '@/features/canvas/PixelService';
import PaletteStore from '@/features/palette/PaletteStore';
import Pixel from '@/core/primitives/Pixel';

class RectangleTool extends Tool {
  name = 'Rectangle';

  type = ToolType.Rectangle;

  size = 2;

  private pixelStore: PixelStore;

  private editorEventEmitter: EditorEventEmitter;

  private pixelService: PixelService;

  private paletteStore: PaletteStore;

  constructor(
    pixelStore: PixelStore,
    editorEventEmitter: EditorEventEmitter,
    pixelService: PixelService,
    paletteStore: PaletteStore,
  ) {
    super();
    this.pixelStore = pixelStore;
    this.editorEventEmitter = editorEventEmitter;
    this.pixelService = pixelService;
    this.paletteStore = paletteStore;
  }

  click(pointer: PointerData): void {
    const { x, y } = pointer;

    const topLeft = this.pixelService.getPixelAtScreenPosition(x, y);
    const { gridX, gridY } = topLeft;
    const pixels: Pixel[] = [topLeft];

    for (let i = 1; i < this.size; i++) {
      for (let j = 1; j < this.size; j++) {
        pixels.push(this.pixelService.getPixelAtGridPosition(gridX + i, gridY + j));
      }
    }

    pixels.forEach((pixel) => {
      pixel.color = this.paletteStore.selectedColor;
      this.pixelStore.addPixel(pixel);
    });

    this.editorEventEmitter.emit('pixelAdded', pixels);
  }
}

export default RectangleTool;
