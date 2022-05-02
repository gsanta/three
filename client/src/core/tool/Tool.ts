/* eslint-disable @typescript-eslint/no-unused-vars */
import PointerData from './PointerData';
import ToolType from './ToolType';

export type ToolIconName = 'pencil' | 'rectangle';

abstract class Tool {
  name?: string;

  icon?: ToolIconName;

  type?: ToolType;

  click(pointer: PointerData): void {}

  move(pointer: PointerData): void {}

  drag(pointer: PointerData): void {}
}

export default Tool;
