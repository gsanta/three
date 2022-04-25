import PixelStore from './pixel/PixelStore';
import ToolStore from './tool/ToolStore';
import PixelRenderer from './pixel/PixelRenderer';
import Canvas from './pixel/Canvas';
import PencilTool from './tool/tools/PencilTool';
import Point from './pixel/types/Point';
import EditorEvents from './core/event/EditorEvents';
import EditorEventEmitter from './core/event/EditorEventEmitter';
import EditorEventsCreator from './core/event/EditorEventsCreator';
import Handler from './core/event/Handler';
import PixelAdded from './handlers/PixelAdded';

class Editor {
  private canvas: Canvas;

  private pixelStore: PixelStore;

  private pixelRenderer: PixelRenderer;

  readonly toolStore: ToolStore;

  readonly events: EditorEvents;

  readonly eventEmitter: EditorEventEmitter;

  readonly handlers: Handler[] = [];

  constructor(context: CanvasRenderingContext2D) {
    const [editorEvents, editorEventEmitter] = EditorEventsCreator.create();
    this.events = editorEvents;
    this.eventEmitter = editorEventEmitter;

    this.pixelStore = new PixelStore();
    this.canvas = {
      size: new Point(400, 400),
    };
    this.pixelRenderer = new PixelRenderer(this.pixelStore, this.canvas, context);

    this.handlers.push(new PixelAdded(this.pixelRenderer, this.events));

    this.handlers.forEach((handler) => handler.register());

    this.toolStore = new ToolStore();
    this.toolStore.addTool(new PencilTool(this.pixelStore, this.eventEmitter));

    this.pixelRenderer.render();
  }
}

export default Editor;
