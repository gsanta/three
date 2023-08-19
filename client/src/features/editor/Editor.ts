import ToolName from '@/features/tool/state/ToolName';
import EditorRuntime from './EditorRuntime';

type EmsVector<T> = {
  size(): number;
  get(index: number): T;
};

interface Editor {
  setWindowSize(width: number, height: number): void;

  isRuntimeInitialized: boolean;

  addActiveTool(name: string): void;

  removeActiveTool(name: string): void;

  setEngineData(data: string): void;

  getToolData(toolName: ToolName): string;

  setColor(color: number): void;

  getLayers(): EmsVector<string>;

  createLayer(name: string): number;

  enableLayer(index: number): void;

  setLayerIndex(oldIndex: number, newIndex: number): void;

  removeLayer(index: number): void;

  disableLayer(index: number): void;

  setActiveLayer(index: number): void;

  //frame
  getFrames(): EmsVector<string>;

  addFrame(): void;

  removeFrame(index: number): void;

  setActiveFrame(index: number): void;

  getActiveFrame(): string;

  activateFramePlayer(): void;

  deActivateFramePlayer(): void;

  setBrushSize(size: number): void;

  //io
  exportImage(): void;

  getImageData(): number;

  getImageSize(): number;

  exportDocument(): string;

  importDocument(document: string): void;

  //edit
  flipHorizontal(): void;

  undo(): void;

  redo(): void;

  //tool
  setCircleToolFilled(isFilled: boolean): void;

  isCircleToolFilled(): boolean;

  setRectangleToolFilled(isFilled: boolean): void;

  isRectangleToolFilled(): boolean;

  getCanvasSize(): string;

  setCanvasSize(width: number, height: number): string;

  setEraserSize(size: number): void;

  zoomIn(): void;

  zoomOut(): void;

  resetZoom(): void;
}

window.Module = new EditorRuntime();
export const editor = window.Module as unknown as Editor;

export default Editor;
