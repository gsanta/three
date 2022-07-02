import PointerData from '../tool/PointerData';
import WheelData from '../tool/WheelData';

interface MouseInputHandler {
  click(_pointer: PointerData): void;

  move(_pointer: PointerData): void;

  drag(_pointer: PointerData): void;

  wheel(_wheel: WheelData): void;
}

export default MouseInputHandler;
