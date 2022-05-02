/* eslint-disable @typescript-eslint/no-unused-vars */
import PointerData from './PointerData';
import ToolType from './ToolType';

abstract class Tool {
  name: string | undefined;

  type: ToolType | undefined;

  click(pointer: PointerData): void {}

  move(pointer: PointerData): void {}

  drag(pointer: PointerData): void {}
}

export default Tool;
