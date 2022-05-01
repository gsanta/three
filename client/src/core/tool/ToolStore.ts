import Tool from './Tool';
import ToolType from './ToolType';

class ToolStore {
  private tools: Tool[] = [];

  private activeTool: Tool | undefined;

  addTool(tool: Tool): void {
    this.tools.push(tool);

    if (!this.activeTool) {
      this.activeTool = tool;
    }
  }

  getActiveTool(): Tool | undefined {
    return this.activeTool;
  }

  getTool(type: ToolType): Tool | undefined {
    return this.tools.find((tool) => tool.type === type);
  }
}

export default ToolStore;
