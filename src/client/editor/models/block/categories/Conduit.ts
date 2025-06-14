import BlockStore from '@/client/editor/stores/block/BlockStore';
import Block from '../Block';
import BlockData from '../BlockData';
import PoleDecorator from './PoleDecorator';
import { WireRole } from './Pole';

class Conduit extends Block {
  static GROUND_CONNECTION_PART_NAME = 'GroundConnection';

  constructor(block: BlockData, blockStore: BlockStore) {
    super(block);
    this.checkCategory('conduits');

    this.block = block;
    this.blockStore = blockStore;
  }

  getPoleDecorator(): PoleDecorator {
    return this.blockStore.getDecorator('poles', this.block.id) as PoleDecorator;
  }

  getFirstEmptyPin(partName: WireRole): number | undefined {
    if (this.isPinEmpty(partName, 0)) {
      return 0;
    }

    return undefined;
  }

  isPinEmpty(partName: WireRole, pinIndex: number): boolean {
    return this.block.partDetails[partName]?.isConnected[pinIndex] === false;
  }

  private blockStore: BlockStore;
}

export default Conduit;
