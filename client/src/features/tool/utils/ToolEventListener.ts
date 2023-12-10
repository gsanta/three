import { receiveColor } from '@/features/settings/state/settingsSlice';
import Editor from '@/features/editor/Editor';
import EditorEvents from '@/features/editor/EditorEvents';
import ToolName from '../state/ToolName';
import { store } from '@/common/utils/store';

class ToolEventListener {
  private editorApi: Editor;

  constructor(editorApi: Editor) {
    this.editorApi = editorApi;

    this.onToolDataChanged = this.onToolDataChanged.bind(this);
  }

  listens = ['on_tool_data_changed', 'active_frame_changed'];

  onToolDataChanged({ tool }: { tool: ToolName }): void {
    const data = this.editorApi.getToolData(tool);

    store.dispatch(receiveColor(JSON.parse(data)));
  }

  listen(editorEvents: EditorEvents) {
    editorEvents.on('tool_data_changed', this.onToolDataChanged);
  }
}

export default ToolEventListener;
