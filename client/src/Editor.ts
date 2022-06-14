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
import DocumentStore from './features/document/DocumentStore';
import EraseTool from './features/tools/erase/EraseTool';
import ZoomTool from './features/tools/zoom/ZoomTool';
import UserStore from './global/user/UserStore';
import makeObjectObservable from './ui/state/utils/makeObjectObservable';

class Editor {
  private canvasElement: HTMLCanvasElement;

  readonly canvasStore: CanvasStore;

  private documentStore: DocumentStore;

  private pixelRenderer: PixelRenderer;

  readonly toolStore: ToolStore;

  readonly events: EditorEvents;

  readonly eventEmitter: EditorEventEmitter;

  readonly handlers: EventHandler[] = [];

  readonly mouseInput: MouseInput;

  readonly paletteStore: PaletteStore;

  readonly userStore: UserStore;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvasElement = canvas;
    const [editorEvents, editorEventEmitter] = EditorEventsCreator.create();
    this.events = editorEvents;
    this.eventEmitter = editorEventEmitter;

    this.userStore = makeObjectObservable(new UserStore());
    this.paletteStore = makeObjectObservable(new PaletteStore());

    this.documentStore = new Proxy(new DocumentStore(), dataProxyHandler);

    this.canvasStore = {
      gridSizeX: 5,
      gridSizeY: 5,
      width: 400,
      height: 400,
    };
    this.pixelRenderer = new PixelRenderer(this.documentStore, this.canvasStore, context);

    this.handlers.push(new PixelAdded(this.pixelRenderer, this.events));

    this.handlers.forEach((handler) => handler.register());

    const pencilTool = new PencilTool(this.documentStore, this.eventEmitter, this.paletteStore);
    const rectangleTool = new Proxy(
      new RectangleTool(this.documentStore, this.eventEmitter, this.paletteStore),
      dataProxyHandler,
    );
    const paintBucketTool = new Proxy(
      new PaintBucketTool(this.documentStore, this.paletteStore, this.eventEmitter),
      dataProxyHandler,
    );
    const eraseTool = new Proxy(new EraseTool(this.documentStore, this.eventEmitter), dataProxyHandler);
    const zoomTool = new Proxy(new ZoomTool(context, this.eventEmitter), dataProxyHandler);

    const toolStore = new ToolStore();
    toolStore.addTool(pencilTool);
    toolStore.addTool(rectangleTool);
    toolStore.addTool(paintBucketTool);
    toolStore.addTool(eraseTool);
    toolStore.addTool(zoomTool);
    toolStore.selectedTool = pencilTool;
    toolStore.rectangle = rectangleTool;

    this.toolStore = makeObjectObservable(new Proxy(toolStore, dataProxyHandler));

    this.mouseInput = new MouseInput(this.canvasElement, this.toolStore);

    this.pixelRenderer.render();
  }
}

export default Editor;
