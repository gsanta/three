import NativeSettings from '../NativeSettings';
import ToolName from '../tool/ToolName';
import ToolDescription from './ToolDescription';

class Editor implements NativeSettings {
  private _canvasNode: HTMLElement | undefined;

  setWindowSize(width: number, height: number) {
    if (!this.isRuntimeInitialized) {
      return;
    }
    window.Module?.setWindowSize(width, height);
  }

  addActiveTool(name: ToolName) {
    if (!this.isRuntimeInitialized) {
      return;
    }

    window.Module?.addActiveTool(name);
  }

  removeActiveTool(name: ToolName) {
    if (!this.isRuntimeInitialized) {
      return;
    }

    window.Module?.removeActiveTool(name);
  }

  getEngineData(): string {
    return window.Module?.getEngineData();
  }

  setEngineData(data: string) {
    window.Module?.setEngineData(data);
  }

  setColor(color: number) {
    window.Module?.setColor(color);
  }

  getLayers(): ToolDescription[] {
    if (!this.isRuntimeInitialized) {
      return [];
    }

    const layersList = window.Module?.getLayers();

    const layersString = new Array<string>(layersList.size()).fill('').map((_, id) => layersList.get(id));
    return layersString.map<ToolDescription>((layerString) => JSON.parse(layerString));
  }

  createLayer(name: string, id: string) {
    window.Module?.createLayer(name, id);
  }

  enableLayer(id: string) {
    window.Module?.enableLayer(id);
  }

  disableLayer(id: string) {
    window.Module?.disableLayer(id);
  }

  setActiveLayer(id: string) {
    window.Module?.setActiveLayer(id);
  }

  setBrushSize(size: number) {
    window.Module?.setBrushSize(size);
  }

  set canvasNode(canvas: HTMLElement | undefined) {
    this._canvasNode = canvas;
  }

  get canvasNode(): HTMLElement | undefined {
    return this._canvasNode;
  }

  get isRuntimeInitialized(): boolean {
    return !!window.Module?.isRuntimeInitialized;
  }
}

export default Editor;
