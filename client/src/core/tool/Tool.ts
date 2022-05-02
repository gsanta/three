import PointerData from './PointerData';
import ToolType from './ToolType';

interface Tool {
  name: string;
  type: ToolType;
  click(pointer: PointerData): void;
  move(pointer: PointerData): void;
  drag(pointer: PointerData): void;
}

export default Tool;
