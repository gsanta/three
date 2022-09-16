import Tool from './Tool';
import { makeObservable, observable, action } from 'mobx';
import ToolName from './ToolName';

class ToolStore {
  tools: Tool[];

  selectedTool?: Tool;

  getSelectedTool() {
    return this.selectedTool;
  }

  constructor(tools: Tool[]) {
    makeObservable(this, {
      tools: observable,
      selectedTool: observable,
      setSelectedTool: action,
    });

    this.tools = tools;
    this.setSelectedTool(tools[0].name);
  }

  setSelectedTool(toolName: ToolName) {
    const selectedTool = this.tools.find((tool) => tool.name === toolName);
    if (selectedTool) {
      this.selectedTool = selectedTool;
      this.selectedTool.activate();
    }
  }
}

export default ToolStore;
