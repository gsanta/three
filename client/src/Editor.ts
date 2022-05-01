import PixelStore from './features/canvas/PixelStore';
import ToolStore from './core/tool/ToolStore';
import PixelRenderer from './core/renderer/PixelRenderer';
import CanvasData from './features/canvas/CanvasData';
import PencilTool from './features/tools/pencil/PencilTool';
import Point from './core/primitives/Point';
import EditorEvents from './core/event/EditorEvents';
import EditorEventEmitter from './core/event/EditorEventEmitter';
import EditorEventsCreator from './core/event/EditorEventsCreator';
import EventHandler from './core/event/EventHandler';
import PixelAdded from './core/event/handlers/PixelAdded';
import MouseInput from './core/input/MouseInput';
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

  readonly mouseInput: MouseInput;

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

    this.mouseInput = new MouseInput(this.canvasElement, this.toolStore);

    this.pixelRenderer.render();
  }
}

export default Editor;
