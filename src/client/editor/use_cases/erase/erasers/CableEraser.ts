/* eslint-disable @typescript-eslint/no-unused-vars */
import BlockData from '@/client/editor/models/block/BlockData';
import Edit from '../../../services/transaction/Edit';
import BlockStore from '../../../stores/block/BlockStore';
import BlockEraser from './BlockEraser';
import CableDecorator, { CableEnd } from '@/client/editor/models/block/categories/CableDecorator';

class CableEraser extends BlockEraser {
  constructor(store: BlockStore) {
    super('cables');
    this.store = store;
  }

  erase(edit: Edit, block: BlockData) {
    const cable = this.store.getDecorator('cables', block.id) as CableDecorator;

    const end1 = cable.end1;
    const end2 = cable.end2;

    if (end1) {
      // this.removePin(edit, cable.id, end1);
    }

    if (end2) {
      // this.removePin(edit, cable.id, end2);
    }
  }

  private removePin(edit: Edit, cableId: string, end: CableEnd) {
    edit.updateDecoration(
      'devices',
      end.device,
      {
        pins: {
          [end.partName]: {
            wires: [cableId],
          },
        },
      },
      { arrayMergeStrategy: 'exclude' },
    );
  }

  private store: BlockStore;
}

export default CableEraser;
