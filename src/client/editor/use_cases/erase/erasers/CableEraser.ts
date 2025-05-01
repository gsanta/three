/* eslint-disable @typescript-eslint/no-unused-vars */
import BlockData from '@/client/editor/data/BlockData';
import Edit from '../../../services/transaction/Edit';
import BlockStore from '../../../stores/block/BlockStore';
import BlockEraser from './BlockEraser';
import { CableEnd } from '@/client/editor/models/block/Cable';

class CableEraser extends BlockEraser {
  constructor(store: BlockStore) {
    super('cables');
    this.store = store;
  }

  erase(edit: Edit, block: BlockData) {
    const cable = this.store.getDecoration('cables', block.id);

    const end1 = cable.end1;
    const end2 = cable.end2;

    if (end1) {
      this.removePin(edit, cable.id, end1);
    }

    if (end2) {
      this.removePin(edit, cable.id, end2);
    }
  }

  associationErased(edit: Edit, cableBlock: BlockData, association: BlockData) {
    const cable = this.store.getDecoration('cables', cableBlock.id);
    const index = cable.points.findIndex((point) => point.blockId === association.id);

    const remainingPoints = cable.points.slice(0, index);

    if (index !== -1) {
      edit.updateDecoration(
        'cables',
        cable.id,
        {
          points: remainingPoints,
        },
        { arrayMergeStrategy: 'replace' },
      );
    }
  }

  private removePin(edit: Edit, cableId: string, end: CableEnd) {
    edit.updateDecoration(
      'devices',
      end.device,
      {
        pins: {
          [end.pin]: {
            wires: [cableId],
          },
        },
      },
      { arrayMergeStrategy: 'exclude' },
    );
  }

  eraseDependent(edit: Edit, poleBlock: BlockData, dependent: BlockData) {
    const pole = this.store.getDecoration('devices', poleBlock.id);

    const cable = this.store.getDecoration('cables', dependent.id);

    const cableEnd = cable?.end1?.device === poleBlock.id ? cable.end1 : cable?.end2;

    if (pole && cable && cableEnd) {
      const origPin = pole.pins[cableEnd.pin];

      edit.updateDecoration(
        'devices',
        pole.id,
        {
          pins: {
            ...pole.pins,
            [cableEnd.pin]: {
              ...origPin,
              wires: [cable.id],
            },
          },
        },
        { arrayMergeStrategy: 'exclude' },
      );
    }
  }

  private store: BlockStore;
}

export default CableEraser;
