import EditorApi from '@/services/editor/EditorApi';
import EditorEvents from '@/services/editor/EditorEvents';
import ToolName from './model/ToolName';
import ToolStore from './ToolStore';

class ToolEventListener {
  private toolStore: ToolStore;

  private editorApi: EditorApi;

  constructor(toolStore: ToolStore, editorApi: EditorApi) {
    this.toolStore = toolStore;
    this.editorApi = editorApi;

    this.onToolDataChanged = this.onToolDataChanged.bind(this);
  }

  listens = ['on_tool_data_changed'];

  onToolDataChanged({ tool }: { tool: ToolName }): void {
    const data = this.editorApi.getToolData(tool);
    this.toolStore.getTool(tool)?.setData(JSON.parse(data));
  }

  listen(editorEvents: EditorEvents) {
    editorEvents.on('tool_data_changed', this.onToolDataChanged);
  }
}

export default ToolEventListener;
