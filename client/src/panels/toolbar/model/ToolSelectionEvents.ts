import KeyCode from '../../../services/keyboard/KeyCode';
import KeyEvent from '../../../services/keyboard/KeyEvent';
import ToolName from './ToolName';
import ToolStore from '../ToolStore';

class ToolSelectionEvent extends KeyEvent {
  private toolStore: ToolStore;

  private toolName: ToolName;

  constructor(toolStore: ToolStore, toolName: ToolName, key: KeyCode) {
    super(key);

    this.toolStore = toolStore;
    this.toolName = toolName;
  }

  execute() {
    this.toolStore.setSelectedTool(this.toolName);
  }
}

export default ToolSelectionEvent;
