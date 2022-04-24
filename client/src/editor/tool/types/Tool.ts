import ToolType from './ToolType';

interface Tool {
  type: ToolType;
  onClick(e: MouseEvent): void;
}

export default Tool;
