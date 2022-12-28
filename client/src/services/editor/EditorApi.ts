interface EditorApi {
  setWindowSize(width: number, height: number): void;

  isRuntimeInitialized: boolean;

  addActiveTool(name: string): void;
  removeActiveTool(name: string): void;

  getEngineData(): void;
  setEngineData(data: string): void;

  setColor(color: number): void;

  getLayers(): any;
  createLayer(name: string, id: string): void;
  enableLayer(id: string): void;
  disableLayer(id: string): void;
  setActiveLayer(id: string): void;

  setBrushSize(size: number): void;

  //image export
  exportImage(): void;
  getImageData(): any;
  getImageSize(): number;
}

export default EditorApi;
