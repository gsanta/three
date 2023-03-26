import { activeFrameChanged } from '@/features/frame/state/frameSlice';
import { receiveColor } from '@/features/settings/state/settingsSlice';
import EditorApi from '@/services/editor/EditorApi';
import EditorEvents from '@/services/editor/EditorEvents';
import { store } from '@/store';
import ToolName from '../../features/tool/state/ToolName';

class ToolEventListener {
  private editorApi: EditorApi;

  constructor(editorApi: EditorApi) {
    this.editorApi = editorApi;

    this.onToolDataChanged = this.onToolDataChanged.bind(this);
    this.onActiveFrameChanged = this.onActiveFrameChanged.bind(this);
  }

  listens = ['on_tool_data_changed', 'active_frame_changed'];

  onToolDataChanged({ tool }: { tool: ToolName }): void {
    const data = this.editorApi.getToolData(tool);

    store.dispatch(receiveColor(JSON.parse(data)));
  }

  onActiveFrameChanged(): void {
    store.dispatch(activeFrameChanged());
  }

  listen(editorEvents: EditorEvents) {
    editorEvents.on('tool_data_changed', this.onToolDataChanged);
    editorEvents.on('active_frame_changed', this.onActiveFrameChanged);
  }
}

export default ToolEventListener;
