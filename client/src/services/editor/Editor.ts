import EditorApi from './EditorApi';
import EditorRuntime from './EditorRuntime';

type Editor = EditorRuntime & EditorApi;

export const editor = new EditorRuntime() as Editor;
window.Module = editor;

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
