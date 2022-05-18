import Frame from './core/models/Frame';
import ToolStore from './core/tool/ToolStore';
import PixelRenderer from './core/renderer/PixelRenderer';
import CanvasStore from './features/canvas/CanvasStore';
import PencilTool from './features/tools/pencil/PencilTool';
import EditorEvents from './core/event/EditorEvents';
import EditorEventEmitter from './core/event/EditorEventEmitter';
import EditorEventsCreator from './core/event/EditorEventsCreator';
import EventHandler from './core/event/EventHandler';
import PixelAdded from './core/event/handlers/PixelAdded';
import MouseInput from './core/input/MouseInput';
import dataProxyHandler from './core/dataProxyHandler';
import PaletteStore from './features/palette/PaletteStore';
import RectangleTool from './features/tools/rectangle/RectangleTool';
import PaintBucketTool from './features/tools/paint_bucket/PaintBucketTool';

class Editor {
  private canvasElement: HTMLCanvasElement;

  readonly canvasStore: CanvasStore;

  private pixelStore: Frame;

  private pixelRenderer: PixelRenderer;

  readonly toolStore: ToolStore;

  readonly events: EditorEvents;

  readonly eventEmitter: EditorEventEmitter;

  readonly handlers: EventHandler[] = [];

  readonly mouseInput: MouseInput;

  readonly paletteStore: PaletteStore;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvasElement = canvas;
    const [editorEvents, editorEventEmitter] = EditorEventsCreator.create();
    this.events = editorEvents;
    this.eventEmitter = editorEventEmitter;

    this.paletteStore = new Proxy(new PaletteStore(), dataProxyHandler);

    this.canvasStore = {
      gridSizeX: 5,
      gridSizeY: 5,
      width: 400,
      height: 400,
    };
    this.pixelStore = new Frame(100, 100);
    this.pixelRenderer = new PixelRenderer(this.pixelStore, this.canvasStore, context);

    this.handlers.push(new PixelAdded(this.pixelRenderer, this.events));

    this.handlers.forEach((handler) => handler.register());

    const pencilTool = new PencilTool(this.pixelStore, this.eventEmitter, this.paletteStore);
    const rectangleTool = new Proxy(
      new RectangleTool(this.pixelStore, this.eventEmitter, this.paletteStore),
      dataProxyHandler,
    );
    const paintBucketTool = new Proxy(
      new PaintBucketTool(this.pixelStore, this.paletteStore, this.eventEmitter),
      dataProxyHandler,
    );

    const toolStore = new ToolStore();
    toolStore.addTool(pencilTool);
    toolStore.addTool(rectangleTool);
    toolStore.addTool(paintBucketTool);
    toolStore.selectedTool = pencilTool;
    toolStore.rectangle = rectangleTool;

    this.toolStore = new Proxy(toolStore, dataProxyHandler);

    this.mouseInput = new MouseInput(this.canvasElement, this.toolStore);

    this.pixelRenderer.render();
  }
}

export default Editor;
