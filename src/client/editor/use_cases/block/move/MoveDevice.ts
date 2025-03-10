import Edit from '@/client/editor/services/transaction/Edit';
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

    const index = cable.end1?.device === blockId ? 0 : cable.points.length - 1;
    const newPoints = [...cable.points];

    const newPoint = { position: addVector(newPoints[index].position, dragDelta) };

    newPoints.splice(index, 1, newPoint);

    edit.updateDecoration(
      'cables',
      cableId,
      {
        points: newPoints,
      },
      { arrayMergeStrategy: 'replace' },
    );
  }
}

export default MoveDevice;
