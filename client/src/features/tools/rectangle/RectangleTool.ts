import EditorEventEmitter from '@/core/event/EditorEventEmitter';
import Tool, { ToolIconName } from '@/core/tool/Tool';
import ToolType from '@/core/tool/ToolType';
import PixelStore from '@/features/canvas/Frame';
import PointerData from '../../../core/tool/PointerData';
import PaletteStore from '@/features/palette/PaletteStore';
import Pixel from '@/core/primitives/Pixel';
import RectangleSizeHandler from './RectangleSizeHandler';
import PixelUtils from '@/core/utils/PixelUtils';
import ColorUtils from '@/core/utils/ColorUtils';

class RectangleTool extends Tool {
  name = 'Rectangle';

  type = ToolType.Rectangle;

  icon = 'rectangle' as ToolIconName;

  size = 2;

  sizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  filled = true;

  private pixelStore: PixelStore;

  private editorEventEmitter: EditorEventEmitter;

  private paletteStore: PaletteStore;

  constructor(pixelStore: PixelStore, editorEventEmitter: EditorEventEmitter, paletteStore: PaletteStore) {
    super();
    this.pixelStore = pixelStore;
    this.editorEventEmitter = editorEventEmitter;
    this.paletteStore = paletteStore;
  }

  click(pointer: PointerData): void {
    const { x, y } = pointer;
    const { canvasWidth, pixelSize } = this.pixelStore;

    const topLeftIndex = PixelUtils.getPixelAtScreenPosition(x, y, pixelSize, canvasWidth);
    const topLeft = PixelUtils.getGridPosition(topLeftIndex, canvasWidth);
    const { x: gridX, y: gridY } = topLeft;

    const pixels = this.filled ? this.createFilled(gridX, gridY) : this.createOutline(gridX, gridY);

    this.editorEventEmitter.emit('pixelAdded', pixels);
  }

  private createFilled(x: number, y: number) {
    const pixels: Pixel[] = [];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const index = PixelUtils.getIndexAtGridPosition(x + i, y + j, this.pixelStore.canvasWidth);
        this.pixelStore.pixels2[index] = ColorUtils.colorToInt(this.paletteStore.selectedColor);
      }
    }

    return pixels;
  }

  private createOutline(x: number, y: number) {
    const pixels: Pixel[] = [];

    for (let i = 0; i < this.size; i++) {
      const nextTop = PixelUtils.getIndexAtGridPosition(x + i, y, this.pixelStore.canvasWidth);
      const nextBottom = PixelUtils.getIndexAtGridPosition(x + i, y + this.size - 1, this.pixelStore.canvasWidth);
      const nextLeft = PixelUtils.getIndexAtGridPosition(x, y + i, this.pixelStore.canvasWidth);
      const nextRight = PixelUtils.getIndexAtGridPosition(x + this.size - 1, y + i, this.pixelStore.canvasWidth);

      this.pixelStore.pixels2[nextTop] = ColorUtils.colorToInt(this.paletteStore.selectedColor);
      this.pixelStore.pixels2[nextBottom] = ColorUtils.colorToInt(this.paletteStore.selectedColor);
      this.pixelStore.pixels2[nextLeft] = ColorUtils.colorToInt(this.paletteStore.selectedColor);
      this.pixelStore.pixels2[nextRight] = ColorUtils.colorToInt(this.paletteStore.selectedColor);
    }

    return pixels;
  }

  options = [new RectangleSizeHandler()];
}

export default RectangleTool;
