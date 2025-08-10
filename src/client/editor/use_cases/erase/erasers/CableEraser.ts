/* eslint-disable @typescript-eslint/no-unused-vars */
import BlockData from '@/client/editor/models/block/BlockData';
import Edit from '../../../services/transaction/Edit';
import BlockStore from '../../../stores/block/BlockStore';
import BlockEraser from './BlockEraser';
import CableDecorator, { CableEnd } from '@/client/editor/models/block/categories/CableDecorator';

class CableEraser extends BlockEraser {
  constructor(blockStore: BlockStore) {
    super('cables');
    this.blockStore = blockStore;
  }

  erase(edit: Edit, block: BlockData) {
    const cable = this.blockStore.getDecorator('cables', block.id) as CableDecorator;

    const end1 = cable.end1;
    const end2 = cable.end2;

    if (end1) {
      this.removeConnection(edit, end1);
    }

    if (end2) {
      this.removeConnection(edit, end2);
    }
  }

  private removeConnection(edit: Edit, end: CableEnd) {
    this.blockStore.getBlock(end.device);

    edit.updateBlock(end.device, {
      partDetails: {
        [end.partName]: {
          isConnected: {
            [end.pinIndex]: false,
          },
        },
      },
    });
  }

  private blockStore: BlockStore;
}

export default CableEraser;
