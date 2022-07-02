import ToolStore from './core/tool/ToolStore';
import EditorEvents from './core/event/EditorEvents';
import EditorEventEmitter from './core/event/EditorEventEmitter';
import EventHandler from './core/event/EventHandler';
import MouseInput from './core/input/MouseInput';
import PaletteStore from './features/palette/PaletteStore';
import DocumentStore from './features/document/DocumentStore';
import UserStore from './global/user/UserStore';
import CanvasContextProvider from './features/canvas/CanvasContextProvider';

interface Editor {
  readonly canvasContextProvider: CanvasContextProvider;

  readonly documentStore: DocumentStore;

  readonly toolStore: ToolStore;

  readonly events: EditorEvents;

  readonly eventEmitter: EditorEventEmitter;

  readonly handlers: EventHandler[];

  readonly mouseInput: MouseInput;

  readonly paletteStore: PaletteStore;

  readonly userStore: UserStore;

  // constructor(context: CanvasRenderingContext2D, webglContext: WebGL2RenderingContext) {
  //   this.webglContext = webglContext;
  //   this.program = new Program(webglContext, simpleVertexShader, simpleFragmentShader);
  //   const [editorEvents, editorEventEmitter] = EditorEventsCreator.create();
  //   this.events = editorEvents;
  //   this.eventEmitter = editorEventEmitter;

  //   this.userStore = makeObjectObservable(new UserStore());
  //   this.paletteStore = makeObjectObservable(new PaletteStore());

  //   this.documentStore = new Proxy(new DocumentStore(), dataProxyHandler);

  //   this.canvasStore = {
  //     gridSizeX: 5,
  //     gridSizeY: 5,
  //     width: 400,
  //     height: 400,
  //   };
  //   this.pixelRenderer = new HtmlCanvasRenderer(this.documentStore, this.program, this.canvasStore, context);
  //   this.webGLRenderer = new WebGLRenderer(this.documentStore, this.program);

  //   this.handlers.push(new PixelAdded(this.pixelRenderer, this.webGLRenderer, this.events));

  //   this.handlers.forEach((handler) => handler.register());

  //   const pencilTool = new PencilTool(this.documentStore, this.eventEmitter, this.paletteStore);
  //   const rectangleTool = new Proxy(
  //     new RectangleTool(this.documentStore, this.eventEmitter, this.paletteStore),
  //     dataProxyHandler,
  //   );
  //   const paintBucketTool = new Proxy(
  //     new PaintBucketTool(this.documentStore, this.paletteStore, this.eventEmitter),
  //     dataProxyHandler,
  //   );
  //   const eraseTool = new Proxy(new EraseTool(this.documentStore, this.eventEmitter), dataProxyHandler);
  //   const zoomTool = new Proxy(new ZoomTool(context, this.eventEmitter), dataProxyHandler);

  //   const toolStore = new ToolStore();
  //   toolStore.addTool(pencilTool);
  //   toolStore.addTool(rectangleTool);
  //   toolStore.addTool(paintBucketTool);
  //   toolStore.addTool(eraseTool);
  //   toolStore.addTool(zoomTool);
  //   toolStore.selectedTool = pencilTool;
  //   toolStore.rectangle = rectangleTool;
  //   toolStore.erase = eraseTool;

  //   this.toolStore = makeObjectObservable(new Proxy(toolStore, dataProxyHandler));

  //   this.mouseInput = new MouseInput(this.canvasElement, this.toolStore);

  //   this.pixelRenderer.render();
  // }
}

export default Editor;
