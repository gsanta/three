import PixelStore from './pixel/PixelStore';
import ToolStore from './tool/ToolStore';
import PixelRenderer from './pixel/PixelRenderer';
import Canvas from './pixel/Canvas';
import PencilTool from './tool/tools/PencilTool';
import Point from './pixel/types/Point';

class Editor {
  private canvas: Canvas;

  private pixelStore: PixelStore;

  private pixelRenderer: PixelRenderer;

  readonly toolStore: ToolStore;

  constructor(context: CanvasRenderingContext2D) {
    this.pixelStore = new PixelStore();
    this.canvas = {
      size: new Point(400, 400),
    };
    this.pixelRenderer = new PixelRenderer(this.pixelStore, this.canvas, context);
    this.toolStore = new ToolStore();
    this.toolStore.addTool(new PencilTool(this.pixelStore));

    this.pixelRenderer.render();
  }
}

export default Editor;
