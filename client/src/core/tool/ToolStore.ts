import RectangleTool from '@/features/tools/rectangle/RectangleTool';
import Tool from './Tool';

class ToolStore {
  tools: Tool[] = [];

  rectangle?: RectangleTool;

  selectedTool?: Tool;

  addTool(tool: Tool) {
    this.tools = [...this.tools, tool];
  }

  getTool(toolType: string): Tool {
    return this.tools.find((tool) => tool.type === toolType)!;
  }
}

export default ToolStore;
