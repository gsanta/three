import EditorEventEmitter from '@/core/event/EditorEventEmitter';
import Tool from '@/core/tool/Tool';
import ToolType from '@/core/tool/ToolType';
import WheelData from '@/core/tool/WheelData';
import CanvasContext from '@/features/canvas/CanvasContext';

class ZoomTool extends Tool {
  name = 'Zoom';

  type = ToolType.Erase;

  icon = 'zoom' as const;

  private cameraZoom = 1;

  private MAX_ZOOM = 5;

  private MIN_ZOOM = 0.1;

  private SCROLL_SENSITIVITY = 0.0001;

  private context: CanvasContext;

  private editorEventEmitter: EditorEventEmitter;

  constructor(context: CanvasContext, editorEventEmitter: EditorEventEmitter) {
    super();
    this.context = context;
    this.editorEventEmitter = editorEventEmitter;
  }

  wheel(wheel: WheelData): void {
    console.log(wheel.deltaY);
    this.cameraZoom += wheel.deltaY * this.SCROLL_SENSITIVITY;
    this.cameraZoom = Math.min(this.cameraZoom, this.MAX_ZOOM);
    this.cameraZoom = Math.max(this.cameraZoom, this.MIN_ZOOM);

    this.context.transform.scale(this.cameraZoom);
    this.editorEventEmitter.emit('pixelAdded');
  }
}

export default ZoomTool;
