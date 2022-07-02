import dataProxyHandler from './core/dataProxyHandler';
import EditorEventsCreator from './core/event/EditorEventsCreator';
import EventHandler from './core/event/EventHandler';
import PixelAdded from './core/event/handlers/PixelAdded';
import MouseInput from './core/input/MouseInput';
import ToolStore from './core/tool/ToolStore';
import Editor from './Editor';
import CanvasContext from './features/canvas/CanvasContext';
import HtmlCanvasContext from './features/canvas/html/HtmlCanvasContext';
import MockCanvasContext from './features/canvas/mock/MockCanvasContext';
import WebglCanvasContext from './features/canvas/webgl/WebglCanvasContext';
import DocumentStore from './features/document/DocumentStore';
import PaletteStore from './features/palette/PaletteStore';
import EraseTool from './features/tools/erase/EraseTool';
import PaintBucketTool from './features/tools/paint_bucket/PaintBucketTool';
import PencilTool from './features/tools/pencil/PencilTool';
import RectangleTool from './features/tools/rectangle/RectangleTool';
import ZoomTool from './features/tools/zoom/ZoomTool';
import UserStore from './global/user/UserStore';
import makeObjectObservable from './ui/state/utils/makeObjectObservable';

class EditorFactory {
  static createHtmlCanvasEditor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): Editor {
    const htmlCanvasContext = new HtmlCanvasContext(canvas, context);
    this.setCanvasDimensions(htmlCanvasContext);
    return this.createEditor(htmlCanvasContext);
  }

  static createWebglCanvasEditor(canvas: HTMLCanvasElement, webglContext: WebGL2RenderingContext): Editor {
    const webglCanvasContext = new WebglCanvasContext(canvas, webglContext);
    this.setCanvasDimensions(webglCanvasContext);
    return this.createEditor(webglCanvasContext);
  }

  static createMockCanvasEditor() {
    const mockCanvasContext = new MockCanvasContext();
    this.setCanvasDimensions(mockCanvasContext);
    return this.createEditor(mockCanvasContext);
  }

  private static createEditor(canvasContext: CanvasContext): Editor {
    const documentStore = new Proxy(new DocumentStore(), dataProxyHandler);
    const userStore = makeObjectObservable(new UserStore());
    const paletteStore = makeObjectObservable(new PaletteStore());
    const [events, eventEmitter] = EditorEventsCreator.create();

    const pencilTool = new PencilTool(documentStore, eventEmitter, paletteStore);
    const rectangleTool = makeObjectObservable(new RectangleTool(documentStore, eventEmitter, paletteStore));
    const paintBucketTool = makeObjectObservable(new PaintBucketTool(documentStore, paletteStore, eventEmitter));
    const eraseTool = makeObjectObservable(new EraseTool(documentStore, eventEmitter));
    const zoomTool = makeObjectObservable(new ZoomTool(canvasContext, eventEmitter));

    const toolStore = new ToolStore();
    toolStore.addTool(pencilTool);
    toolStore.addTool(rectangleTool);
    toolStore.addTool(paintBucketTool);
    toolStore.addTool(eraseTool);
    toolStore.addTool(zoomTool);
    toolStore.selectedTool = pencilTool;
    toolStore.rectangle = rectangleTool;
    toolStore.erase = eraseTool;

    const mouseInput = new MouseInput(toolStore, canvasContext.canvas);

    const handlers: EventHandler[] = [];

    handlers.push(new PixelAdded(canvasContext, events, documentStore));
    handlers.forEach((handler) => handler.register());

    return {
      canvasContext,
      documentStore,
      toolStore,
      events,
      eventEmitter,
      handlers,
      mouseInput,
      paletteStore,
      userStore,
    };
  }

  private static setCanvasDimensions(canvasContext: CanvasContext) {
    canvasContext.gridSizeX = 5;
    canvasContext.gridSizeY = 5;
    canvasContext.width = 400;
    canvasContext.height = 400;
  }
}

export default EditorFactory;
