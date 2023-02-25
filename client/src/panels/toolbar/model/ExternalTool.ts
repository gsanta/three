import { IconName } from '@/ui/components/icon/Icon';
import Editor from '../../../services/editor/Editor';
import Tool from './Tool';
import ToolName from './ToolName';
import ToolSelectionEvent from './ToolSelectionEvents';

class ExternalTool<D = unknown> implements Tool {
  name: ToolName;

  iconName: IconName;

  private editorApi: Editor;

  private toolSelectionEvent?: ToolSelectionEvent;

  constructor(name: ToolName, iconName: IconName, editorApi: Editor, toolSelectionEvent?: ToolSelectionEvent) {
    this.name = name;
    this.iconName = iconName;
    this.editorApi = editorApi;
    this.toolSelectionEvent = toolSelectionEvent;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setData(_data: D): void {
    throw new Error('Method not implemented.');
  }

  getShortCut() {
    return this.toolSelectionEvent;
  }

  activate(): void {
    this.editorApi.addActiveTool(this.name);
  }

  deActivate(): void {
    this.editorApi.removeActiveTool(this.name);
  }

  onChange(changes: Record<string, any>) {
    console.log(changes);
  }
}

export default ExternalTool;
