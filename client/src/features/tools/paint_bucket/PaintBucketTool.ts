import EditorEventEmitter from '@/core/event/EditorEventEmitter';
import PointerData from '@/core/tool/PointerData';
import Tool from '@/core/tool/Tool';
import ToolType from '@/core/tool/ToolType';
import ColorUtils from '@/core/utils/ColorUtils';
import PixelUtils from '@/core/utils/PixelUtils';
import DocumentStore from '@/features/document/DocumentStore';
import PaletteStore from '@/features/palette/PaletteStore';
import QueueLinearFloodFiller from './QueueLinearFloodFiller';

class PaintBucketTool extends Tool {
  name = 'PaintBucket';

  type = ToolType.PaintBucket;

  icon = 'paint-bucket' as const;

  private floodFiller = new QueueLinearFloodFiller();

  private documentStore: DocumentStore;

  private editorEventEmitter: EditorEventEmitter;

  private paletteStore: PaletteStore;

  constructor(frame: DocumentStore, paletteStore: PaletteStore, editorEventEmitter: EditorEventEmitter) {
    super();
    this.documentStore = frame;
    this.paletteStore = paletteStore;
    this.editorEventEmitter = editorEventEmitter;
  }

  click(pointer: PointerData): void {
    const { x, y } = pointer;

    const { activeDocument } = this.documentStore;
    const { canvasWidth, baseSize: pixelSize } = activeDocument;

    const pixelIndex = PixelUtils.getPixelAtScreenPosition(x, y, pixelSize, canvasWidth);

    const newColor = ColorUtils.colorToInt(this.paletteStore.selectedColor);
    this.floodFiller.floodFill(pixelIndex, newColor, activeDocument.activeLayer);

    this.editorEventEmitter.emit('pixelAdded');
  }
}

export default PaintBucketTool;
