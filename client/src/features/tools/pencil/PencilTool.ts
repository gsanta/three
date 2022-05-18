import EditorEventEmitter from '@/core/event/EditorEventEmitter';
import Tool, { ToolIconName } from '@/core/tool/Tool';
import ToolType from '@/core/tool/ToolType';
import Frame from '@/core/models/Frame';
import PointerData from '../../../core/tool/PointerData';
import PaletteStore from '@/features/palette/PaletteStore';
import PixelUtils from '@/core/utils/PixelUtils';
import ColorUtils from '@/core/utils/ColorUtils';

class PencilTool extends Tool {
  name = 'Pencil';

  type = ToolType.Pencil;

  icon = 'pencil' as ToolIconName;

  private pixelStore: Frame;

  private editorEventEmitter: EditorEventEmitter;

  private paletteStore: PaletteStore;

  constructor(pixelStore: Frame, editorEventEmitter: EditorEventEmitter, paletteStore: PaletteStore) {
    super();
    this.pixelStore = pixelStore;
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
    const { pixelSize, canvasWidth } = this.pixelStore;
    const pixel = PixelUtils.getPixelAtScreenPosition(x, y, pixelSize, canvasWidth);
    this.pixelStore.pixels[pixel] = ColorUtils.colorToInt(this.paletteStore.selectedColor);
    this.editorEventEmitter.emit('pixelAdded');
  }
}

export default PencilTool;
