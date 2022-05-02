import EditorEventEmitter from '@/core/event/EditorEventEmitter';
import Tool from '@/core/tool/Tool';
import ToolType from '@/core/tool/ToolType';
import PixelStore from '@/features/canvas/PixelStore';
import PointerData from '../../../core/tool/PointerData';
import PixelService from '@/features/canvas/PixelService';
import PaletteStore from '@/features/palette/PaletteStore';

class PencilTool implements Tool {
  name = 'Rectangle';

  type = ToolType.Rectangle;

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
    this.pixelStore = pixelStore;
    this.editorEventEmitter = editorEventEmitter;
    this.pixelService = pixelService;
    this.paletteStore = paletteStore;
  }

  click(pointer: PointerData): void {
    const { x, y } = pointer;
    this.createPixel(x, y);
  }

  move(pointer: PointerData): void {}

  drag(pointer: PointerData): void {
    const { x, y } = pointer;
    this.createPixel(x, y);
  }

  private createPixel(x: number, y: number) {
    const pixel = this.pixelService.getPixelAtScreenPosition(x, y);
    pixel.color = this.paletteStore.selectedColor;
    this.pixelStore.addPixel(pixel);
    this.editorEventEmitter.emit('pixelAdded', pixel);
  }
}

export default PencilTool;
