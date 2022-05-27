/* eslint-disable @typescript-eslint/no-unused-vars */
import Handler from '../ui/Handler';
import PointerData from './PointerData';
import ToolType from './ToolType';
import WheelData from './WheelData';

export type ToolIconName = 'pencil' | 'rectangle' | 'paint-bucket' | 'erase' | 'zoom';

abstract class Tool {
  name?: string;

  icon?: ToolIconName;

  type?: ToolType;

  options?: Handler[];

  click(_pointer: PointerData): void {}

  move(_pointer: PointerData): void {}

  drag(_pointer: PointerData): void {}

  wheel(_wheel: WheelData): void {}
}

export default Tool;
