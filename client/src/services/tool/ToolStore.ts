import Tool from './Tool';
import { makeObservable, observable, action } from 'mobx';
import ToolName from './ToolName';

class ToolStore {
  tools: Tool[];

  private _selectedTool: Tool;

  get selectedTool() {
    return this._selectedTool;
  }

  constructor(tools: Tool[]) {
    makeObservable(this, {
      tools: observable,
      selectedTool: observable,
      setSelectedTool: action,
    });

    this.tools = tools;
    this._selectedTool = tools[0];
  }

  setSelectedTool(toolName: ToolName) {
    const selectedTool = this.tools.find((tool) => tool.name === toolName);
    if (selectedTool) {
      this._selectedTool = selectedTool;
    }
  }
}

export default ToolStore;
