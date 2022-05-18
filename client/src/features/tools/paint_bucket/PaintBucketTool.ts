import EditorEventEmitter from '@/core/event/EditorEventEmitter';
import Frame from '@/core/models/Frame';
import PointerData from '@/core/tool/PointerData';
import Tool from '@/core/tool/Tool';
import ToolType from '@/core/tool/ToolType';
import ColorUtils from '@/core/utils/ColorUtils';
import PixelUtils from '@/core/utils/PixelUtils';
import PaletteStore from '@/features/palette/PaletteStore';
import QueueLinearFloodFiller from './QueueLinearFloodFiller';

class PaintBucketTool extends Tool {
  name = 'PaintBucket';

  type = ToolType.PaintBucket;

  icon = 'paint-bucket' as const;

  private floodFiller = new QueueLinearFloodFiller();

  private frame: Frame;

  private editorEventEmitter: EditorEventEmitter;

  private paletteStore: PaletteStore;

  constructor(frame: Frame, paletteStore: PaletteStore, editorEventEmitter: EditorEventEmitter) {
    super();
    this.frame = frame;
    this.paletteStore = paletteStore;
    this.editorEventEmitter = editorEventEmitter;
  }

  click(pointer: PointerData): void {
    const { x, y } = pointer;

    const { canvasWidth, pixelSize } = this.frame;

    const pixelIndex = PixelUtils.getPixelAtScreenPosition(x, y, pixelSize, canvasWidth);

    this.floodFiller.floodFill({
      pixels: this.frame.pixels,
      width: this.frame.canvasWidth,
      height: this.frame.canvasHeight,
      targetColor: this.frame.pixels[pixelIndex],
      replacementColor: ColorUtils.colorToInt(this.paletteStore.selectedColor),
      pixel: pixelIndex,
    });

    this.editorEventEmitter.emit('pixelAdded');
  }
}

export default PaintBucketTool;
