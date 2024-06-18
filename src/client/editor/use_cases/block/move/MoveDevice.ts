import Edit from '@/client/editor/services/update/Edit';
import MoveDecoration from './MoveDecoration';
import Num3 from '@/client/editor/types/Num3';
import { addVector } from '@/client/editor/utils/vectorUtils';

class MoveDevice extends MoveDecoration {
  move(edit: Edit, blockId: string, dragDelta: Num3) {
    const device = this.blockStore.getDecoration('devices', blockId);

    if (!device) {
      throw new Error(`Device not found for block ${blockId}`);
    }

    Object.keys(device.pins).forEach((key) => {
      const cables = device.pins[key];
      cables?.wires.forEach((cable) => {
        this.moveCable(edit, cable, blockId, dragDelta);
      });
    });
  }

  private moveCable(edit: Edit, cableId: string, blockId: string, dragDelta: Num3) {
    const cable = this.blockStore.getDecoration('cables', cableId);

    const endName = cable.end1?.device === blockId ? 'end1' : 'end2';
    const end = cable[endName];

    if (!end) {
      return;
    }

    edit.updateDecoration(
      'cables',
      cableId,
      {
        [endName]: {
          point: addVector(end.point, dragDelta),
        },
      },
      { arrayMergeStrategy: 'replace' },
    );
  }
}

export default MoveDevice;
