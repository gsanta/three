import ToolName from '@/features/tool/state/ToolName';
import { EmsVector } from '@/types/EmscriptenTypes';

interface EditorApi {
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
}

export default EditorApi;
