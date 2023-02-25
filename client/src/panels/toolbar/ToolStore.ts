import Tool from './model/Tool';
import { makeObservable, observable, action } from 'mobx';
import ToolName from './model/ToolName';

class ToolStore {
  tools: Tool[] = [];

  selectedTool?: Tool;

  getSelectedTool() {
    return this.selectedTool;
  }

  constructor() {
    makeObservable(this, {
      addTool: action,
      tools: observable,
      selectedTool: observable,
      setSelectedTool: action,
    });
  }

  addTool(tool: Tool) {
    this.tools.push(tool);
  }

  getTool(name: ToolName) {
    return this.tools.find((tool) => tool.name === name);
  }

  setSelectedTool(toolName: ToolName) {
    const selectedTool = this.tools.find((tool) => tool.name === toolName);
    if (selectedTool) {
      if (this.selectedTool) {
        this.selectedTool.deActivate();
      }
      this.selectedTool = selectedTool;
      this.selectedTool.activate();
    }
  }
}

export default ToolStore;
