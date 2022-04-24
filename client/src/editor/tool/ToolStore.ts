import Tool from './types/Tool';
import ToolType from './types/ToolType';

class ToolStore {
  private tools: Tool[] = [];

  addTool(tool: Tool): void {
    this.tools.push(tool);
  }

  getTool(type: ToolType): Tool | undefined {
    return this.tools.find((tool) => tool.type === type);
  }
}

export default ToolStore;
