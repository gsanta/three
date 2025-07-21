import PoleModel from '../../models/block/categories/PoleModel';
import Num3 from '../../models/math/Num3';
import Vector from '../../models/math/Vector';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import CableHelper from './CableHelper';

class AutoRotatePoles {
  constructor(blockStore: BlockStore, transactionService: TransactionService) {
    this.cableHelper = new CableHelper(blockStore);

    this.transactionService = transactionService;
  }

  execute(newPole: PoleModel, neighborPole: PoleModel, secondNeighborPole?: PoleModel) {
    this.neighborPoleId = neighborPole.getId();
    this.newPoleId = newPole.getId();

    const newPolePos = newPole.getBlock().position;
    const neighborPolePos = neighborPole.getBlock().position;
    const secondNeighborPolePos = secondNeighborPole?.getBlock().position;

    const yRotation = secondNeighborPolePos
      ? this.getYRotationFromThreePoints(newPolePos, neighborPolePos, secondNeighborPolePos)
      : this.getYRotationFromTwoPoints(newPolePos, neighborPolePos);

    const edit = this.transactionService.getOrCreateActiveTransaction();

    const neighborPoleNewRotation = [
      neighborPole.getBlock().rotation[0],
      neighborPole.getBlock().rotation[1] + yRotation,
      neighborPole.getBlock().rotation[2],
    ] as Num3;

    this.neighborPoleOrigRotation = neighborPole.getBlock().rotation;

    edit.updateBlock(neighborPole.getId(), {
      rotation: neighborPoleNewRotation,
    });

    neighborPole.getBlock().conduitConnections.forEach((conn) => {
      edit.updateBlock(conn.block, { isDirty: true });
    });

    this.newPoleOrigRotation = newPole.getBlock().rotation;

    const newPoleNewRotation = [
      newPole.getBlock().rotation[0],
      this.neighborPoleOrigRotation[1] + yRotation,
      newPole.getBlock().rotation[2],
    ] as Num3;

    edit.updateBlock(newPole.getId(), {
      rotation: newPoleNewRotation,
    });
  }

  undo() {
    if (!this.neighborPoleId || !this.newPoleId) {
      return;
    }

    const edit = this.transactionService.getOrCreateActiveTransaction();

    edit.updateBlock(this.neighborPoleId, {
      rotation: new Vector(this.neighborPoleOrigRotation).negateY().get(),
    });

    edit.updateBlock(this.newPoleId, {
      rotation: new Vector(this.newPoleOrigRotation).negateY().get(),
    });

    edit.commit();
  }

  private getYRotationFromThreePoints(point1: Num3, point2: Num3, point3: Num3) {
    const line1 = new Vector(point1).subXZ(new Vector(point2)).get();
    const line2 = new Vector(point2).subXZ(new Vector(point3)).get();
    const angle = -new Vector(line1).angle2(new Vector(line2));

    const halfAngle = angle / 2;

    return Vector.toRadian(halfAngle);
  }

  private getYRotationFromTwoPoints(point1: Num3, point2: Num3) {
    const line1 =
      point2[2] < point1[2]
        ? new Vector(point1).subXZ(new Vector(point2)).get()
        : new Vector(point2).subXZ(new Vector(point1)).get();
    const line2 = [0, 0, 1] as Num3;

    return this.getLine(line1, line2);
  }

  private getLine(line1: Num3, line2: Num3) {
    const angle = -new Vector(line1).angle2(new Vector(line2));

    const halfAngle = angle / 2;

    return Vector.toRadian(halfAngle);
  }

  private neighborPoleId: string | undefined;

  private newPoleId: string | undefined;

  private neighborPoleOrigRotation: Num3 | undefined;

  private newPoleOrigRotation: Num3 | undefined;

  private cableHelper: CableHelper;

  private transactionService: TransactionService;
}

export default AutoRotatePoles;
