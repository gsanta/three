import ToolName from '@/panels/toolbar/model/ToolName';

interface EditorApi {
  setWindowSize(width: number, height: number): void;

  isRuntimeInitialized: boolean;

  addActiveTool(name: string): void;
  removeActiveTool(name: string): void;

  setEngineData(data: string): void;

  getToolData(toolName: ToolName): string;

  setColor(color: number): void;

  getLayers(): any;
  createLayer(name: string): number;
  enableLayer(index: number): void;
  setLayerIndex(oldIndex: number, newIndex: number): void;
  removeLayer(index: number): void;
  disableLayer(index: number): void;
  setActiveLayer(index: number): void;

  setBrushSize(size: number): void;

  //io
  exportImage(): void;
  getImageData(): number;
  getImageSize(): number;

  exportDocument(): string;
  importDocument(document: string): void;
}

export default EditorApi;
