import EditorApi from '@/services/editor/EditorApi';
import { EditorEventListener } from '@/services/editor/EditorEvents';
import ToolName from './model/ToolName';
import ToolStore from './ToolStore';

class ToolEventListener implements EditorEventListener<ToolName> {
  private toolStore: ToolStore;

  private editorApi: EditorApi;

  constructor(toolStore: ToolStore, editorApi: EditorApi) {
    this.toolStore = toolStore;
    this.editorApi = editorApi;
  }

  onChange(_eventType: string, toolName: ToolName): void {
    const data = this.editorApi.getToolData(toolName);

    this.toolStore.getTool(toolName)?.setData(JSON.parse(data));
  }
}

export default ToolEventListener;
