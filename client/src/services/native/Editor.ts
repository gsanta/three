import NativeApi from './NativeApi';
import NativeRuntime from './NativeRuntime';

type Editor = NativeRuntime & NativeApi;

// window.Module = new NativeRuntime() as Editor

// class Editor implements NativeSettings {
// getLayers(): ToolDescription[] {
//   if (!this.isRuntimeInitialized) {
//     return [];
//   }
//   const layersList = window.Module?.getLayers();
//   const layersString = new Array<string>(layersList.size()).fill('').map((_, id) => layersList.get(id));
//   return layersString.map<ToolDescription>((layerString) => JSON.parse(layerString));
// }
// }

export default Editor;
