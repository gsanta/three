/* eslint-disable @typescript-eslint/no-unused-vars */
import Handler from '../ui/Handler';
import PointerData from './PointerData';
import ToolType from './ToolType';

export type ToolIconName = 'pencil' | 'rectangle' | 'paint-bucket';

abstract class Tool {
  name?: string;

  icon?: ToolIconName;

  type?: ToolType;

  options?: Handler[];

  click(_pointer: PointerData): void {}

  move(_pointer: PointerData): void {}

  drag(_pointer: PointerData): void {}
}

export default Tool;
