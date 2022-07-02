import EraseTool from '@/features/tools/erase/EraseTool';
import RectangleTool from '@/features/tools/rectangle/RectangleTool';
import MouseInputHandler from '../input/MouseInputHandler';
import PointerData from './PointerData';
import Tool from './Tool';
import WheelData from './WheelData';

class ToolStore implements MouseInputHandler {
  tools: Tool[] = [];

  rectangle?: RectangleTool;

  erase?: EraseTool;

  selectedTool?: Tool;

  addTool(tool: Tool) {
    this.tools = [...this.tools, tool];
  }

  getTool(toolType: string): Tool {
    return this.tools.find((tool) => tool.type === toolType)!;
  }

  click(pointer: PointerData): void {
    this.selectedTool?.click(pointer);
  }

  move(pointer: PointerData): void {
    this.selectedTool?.move(pointer);
  }

  drag(pointer: PointerData): void {
    this.selectedTool?.drag(pointer);
  }

  wheel(wheel: WheelData): void {
    this.selectedTool?.wheel(wheel);
  }
}

export default ToolStore;
