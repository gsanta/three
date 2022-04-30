import PixelStore from './pixel/PixelStore';
import ToolStore from './tool/ToolStore';
import PixelRenderer from './pixel/PixelRenderer';
import CanvasData from './pixel/CanvasData';
import PencilTool from './tool/tools/PencilTool';
import Point from './pixel/types/Point';
import EditorEvents from './core/event/EditorEvents';
import EditorEventEmitter from './core/event/EditorEventEmitter';
import EditorEventsCreator from './core/event/EditorEventsCreator';
import EventHandler from './core/event/EventHandler';
import PixelAdded from './event_handlers/PixelAdded';
import MouseHandler from './input_handlers/MouseHandler';
import PaletteData from './features/palette/PaletteData';
import dataProxyHandler from './core/dataProxyHandler';

class Editor {
  private canvasElement: HTMLCanvasElement;

  readonly canvas: CanvasData;

  private pixelStore: PixelStore;

  private pixelRenderer: PixelRenderer;

  readonly toolStore: ToolStore;

  readonly events: EditorEvents;

  readonly eventEmitter: EditorEventEmitter;

  readonly handlers: EventHandler[] = [];

  readonly mouseHandler: MouseHandler;

  readonly paletteData: PaletteData;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvasElement = canvas;
    const [editorEvents, editorEventEmitter] = EditorEventsCreator.create();
    this.events = editorEvents;
    this.eventEmitter = editorEventEmitter;

    this.paletteData = new Proxy(new PaletteData(), dataProxyHandler);

    this.pixelStore = new PixelStore();
    this.canvas = {
      size: new Point(400, 400),
    };
    this.pixelRenderer = new PixelRenderer(this.pixelStore, this.canvas, context);

    this.handlers.push(new PixelAdded(this.pixelRenderer, this.events));

    this.handlers.forEach((handler) => handler.register());

    this.toolStore = new ToolStore();
    this.toolStore.addTool(new PencilTool(this.pixelStore, this.eventEmitter));

    this.mouseHandler = new MouseHandler(this.canvasElement, this.toolStore);

    this.pixelRenderer.render();
  }
}

export default Editor;
