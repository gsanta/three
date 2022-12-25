import { IconName } from '@/ui/components/icon/Icon';
import Editor from '../../../services/editor/Editor';
import Tool from './Tool';
import ToolName from './ToolName';
import ToolSelectionEvent from './ToolSelectionEvents';

class ExternalTool implements Tool {
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

  public getShortCut() {
    return this.toolSelectionEvent;
  }

  activate(): void {
    this.editorApi.addActiveTool(this.name);
  }

  deActivate(): void {
    this.editorApi.removeActiveTool(this.name);
  }
}

export default ExternalTool;
