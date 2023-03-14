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
  createLayer(name: string, id: string): void;
  enableLayer(id: string): void;
  setLayerIndex(id: string, index: number): void;
  removeLayer(id: string): void;
  disableLayer(id: string): void;
  setActiveLayer(id: string): void;

  setBrushSize(size: number): void;

  //io
  exportImage(): void;
  getImageData(): number;
  getImageSize(): number;

  exportDocument(): string;
  importDocument(document: string): void;
}

export default EditorApi;
