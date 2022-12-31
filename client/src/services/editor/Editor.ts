import EditorApi from './EditorApi';
import EditorRuntime from './EditorRuntime';

type Editor = EditorRuntime & EditorApi;

export const editor = new EditorRuntime() as Editor;
window.Module = editor;

export default Editor;
