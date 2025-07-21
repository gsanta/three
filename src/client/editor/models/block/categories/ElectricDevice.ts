import BlockData from '../BlockData';
import { WireRole } from './PoleModel';

class ElectricDevice {
  constructor(block: BlockData) {
    this.block = block;
  }

  getFirstEmptyPin(partName: WireRole): number | undefined {
    const pinCount = Object.keys(this.block.partDetails[partName]?.isConnected || {}).length;

    for (let i = 0; i < pinCount; i++) {
      if (this.isPinEmpty(partName, i)) {
        return i;
      }
    }

    return undefined;
  }

  isPinEmpty(partName: WireRole, pinIndex: number): boolean {
    return this.block.partDetails[partName]?.isConnected[pinIndex] === false;
  }

  private block: BlockData;
}

export default ElectricDevice;
