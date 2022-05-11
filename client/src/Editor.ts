import PixelStore from './features/canvas/PixelStore';
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
import PixelService from './features/canvas/PixelService';
import PaletteStore from './features/palette/PaletteStore';
import RectangleTool from './features/tools/rectangle/RectangleTool';

class Editor {
  private canvasElement: HTMLCanvasElement;

  readonly canvasStore: CanvasStore;

  readonly pixelService: PixelService;

  private pixelStore: PixelStore;

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
    this.pixelService = new PixelService(this.canvasStore);
    this.pixelStore = new PixelStore();
    this.pixelRenderer = new PixelRenderer(this.pixelStore, this.canvasStore, context);

    this.handlers.push(new PixelAdded(this.pixelRenderer, this.events));

    this.handlers.forEach((handler) => handler.register());

    const pencilTool = new PencilTool(this.pixelStore, this.eventEmitter, this.pixelService, this.paletteStore);
    const rectangleTool = new Proxy(
      new RectangleTool(this.pixelStore, this.eventEmitter, this.pixelService, this.paletteStore),
      dataProxyHandler,
    );

    const toolStore = new ToolStore();
    toolStore.addTool(pencilTool);
    toolStore.addTool(rectangleTool);
    toolStore.selectedTool = pencilTool;
    toolStore.rectangle = rectangleTool;

    this.toolStore = new Proxy(toolStore, dataProxyHandler);

    this.mouseInput = new MouseInput(this.canvasElement, this.toolStore);

    this.pixelRenderer.render();
  }
}

export default Editor;
