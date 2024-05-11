/* eslint-disable @typescript-eslint/no-unused-vars */
import Block from '@/client/editor/types/Block';
import BlockCategory from '@/client/editor/types/BlockCategory';
import Edit from '../../../services/update/Edit';
import BlockStore from '../../../stores/block/BlockStore';
import BlockEraser from './BlockEraser';

class PoleEraser extends BlockEraser {
  constructor(store: BlockStore) {
    super('poles');
    this.store = store;
  }

  eraseDependent(edit: Edit, poleBlock: Block, dependent: Block) {
    const pole = this.store.getDecoration(poleBlock.category as 'poles', poleBlock.id);

    const cable = this.store.getDecoration(dependent.category as 'cables', dependent.id);

    const cableEnd = cable.end1?.device === poleBlock.id ? cable.end1 : cable.end2;

    if (cableEnd) {
      edit.updateDecoration(
        'poles',
        pole.id,
        {
          pins: {
            [cableEnd.pin]: pole.pins[cableEnd.pin].filter((cableId) => cableId !== cable.id),
          },
        },
        { mergeArrays: false },
      );
    }
  }

  private store: BlockStore;
}

export default PoleEraser;
