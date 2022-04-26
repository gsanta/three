import PixelStore from './pixel/PixelStore';
import ToolStore from './tool/ToolStore';
import PixelRenderer from './pixel/PixelRenderer';
import Canvas from './pixel/Canvas';
import PencilTool from './tool/tools/PencilTool';
import Point from './pixel/types/Point';
import EditorEvents from './core/event/EditorEvents';
import EditorEventEmitter from './core/event/EditorEventEmitter';
import EditorEventsCreator from './core/event/EditorEventsCreator';
import EventHandler from './core/event/EventHandler';
import PixelAdded from './event_handlers/PixelAdded';
import MouseHandler from './input_handlers/MouseHandler';

class Editor {
  private canvas: HTMLCanvasElement;

  private canvasData: Canvas;

  private pixelStore: PixelStore;

  private pixelRenderer: PixelRenderer;

  readonly toolStore: ToolStore;

  readonly events: EditorEvents;

  readonly eventEmitter: EditorEventEmitter;

  readonly handlers: EventHandler[] = [];

  readonly mouseHandler: MouseHandler;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    const [editorEvents, editorEventEmitter] = EditorEventsCreator.create();
    this.events = editorEvents;
    this.eventEmitter = editorEventEmitter;

    this.pixelStore = new PixelStore();
    this.canvasData = {
      size: new Point(400, 400),
    };
    this.pixelRenderer = new PixelRenderer(this.pixelStore, this.canvasData, context);

    this.handlers.push(new PixelAdded(this.pixelRenderer, this.events));

    this.handlers.forEach((handler) => handler.register());

    this.toolStore = new ToolStore();
    this.toolStore.addTool(new PencilTool(this.pixelStore, this.eventEmitter));

    this.mouseHandler = new MouseHandler(this.canvas, this.toolStore);

    this.pixelRenderer.render();
  }
}

export default Editor;
