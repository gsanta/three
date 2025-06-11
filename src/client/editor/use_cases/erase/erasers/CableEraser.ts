/* eslint-disable @typescript-eslint/no-unused-vars */
import BlockData from '@/client/editor/models/block/BlockData';
import Edit from '../../../services/transaction/Edit';
import BlockStore from '../../../stores/block/BlockStore';
import BlockEraser from './BlockEraser';
import Cable, { CableEnd } from '@/client/editor/models/block/categories/Cable';
import Device from '@/client/editor/models/block/categories/Device';

class CableEraser extends BlockEraser {
  constructor(store: BlockStore) {
    super('cables');
    this.store = store;
  }

  erase(edit: Edit, block: BlockData) {
    const cable = this.store.getDecorator('cables', block.id) as Cable;

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
    const cable = this.store.getDecorator('cables', cableBlock.id) as Cable;
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
          [end.partName]: {
            wires: [cableId],
          },
        },
      },
      { arrayMergeStrategy: 'exclude' },
    );
  }

  eraseDependent(edit: Edit, poleBlock: BlockData, dependent: BlockData) {
    const pole = this.store.getDecorator('devices', poleBlock.id) as Device;

    const cable = this.store.getDecorator('cables', dependent.id) as Cable;

    const cableEnd = cable?.end1?.device === poleBlock.id ? cable.end1 : cable?.end2;

    if (pole && cable && cableEnd) {
      const origPin = pole.pins[cableEnd.partName];

      edit.updateDecoration(
        'devices',
        pole.id,
        {
          pins: {
            ...pole.pins,
            [cableEnd.partName]: {
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
