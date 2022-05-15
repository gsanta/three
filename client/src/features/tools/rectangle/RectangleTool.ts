import EditorEventEmitter from '@/core/event/EditorEventEmitter';
import Tool, { ToolIconName } from '@/core/tool/Tool';
import ToolType from '@/core/tool/ToolType';
import PixelStore from '@/features/canvas/PixelStore';
import PointerData from '../../../core/tool/PointerData';
import PixelService from '@/features/canvas/PixelService';
import PaletteStore from '@/features/palette/PaletteStore';
import Pixel from '@/core/primitives/Pixel';
import RectangleSizeHandler from './RectangleSizeHandler';

class RectangleTool extends Tool {
  name = 'Rectangle';

  type = ToolType.Rectangle;

  icon = 'rectangle' as ToolIconName;

  size = 2;

  sizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  filled = true;

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

    const pixels = this.filled ? this.createFilled(gridX, gridY) : this.createOutline(gridX, gridY);

    this.editorEventEmitter.emit('pixelAdded', pixels);
  }

  private createFilled(gridX: number, gridY: number) {
    const pixels: Pixel[] = [];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        pixels.push(this.pixelService.getPixelAtGridPosition(gridX + i, gridY + j));
      }
    }

    pixels.forEach((pixel) => {
      pixel.color = this.paletteStore.selectedColor;
      this.pixelStore.addPixel(pixel);
    });

    return pixels;
  }

  private createOutline(gridX: number, gridY: number) {
    const pixels: Pixel[] = [];

    for (let i = 0; i < this.size; i++) {
      pixels.push(this.pixelService.getPixelAtGridPosition(gridX + i, gridY));
      pixels.push(this.pixelService.getPixelAtGridPosition(gridX + i, gridY + this.size - 1));
      pixels.push(this.pixelService.getPixelAtGridPosition(gridX, gridY + i));
      pixels.push(this.pixelService.getPixelAtGridPosition(gridX + this.size - 1, gridY + i));
    }

    pixels.forEach((pixel) => {
      pixel.color = this.paletteStore.selectedColor;
      this.pixelStore.addPixel(pixel);
    });

    return pixels;
  }

  options = [new RectangleSizeHandler()];
}

export default RectangleTool;
