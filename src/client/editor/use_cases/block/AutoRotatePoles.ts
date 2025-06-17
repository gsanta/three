import Pole from '../../models/block/categories/Pole';
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

  execute(newPole: Pole, neighborPole: Pole) {
    const neighborNeighborPole = this.cableHelper.getSibling(neighborPole.getBlock(), 0);

    if (!neighborNeighborPole) {
      return;
    }

    this.neighborPoleId = neighborPole.getId();
    this.newPoleId = newPole.getId();

    const [pos1, pos2, pos3] = [
      neighborNeighborPole.position,
      neighborPole.getBlock().position,
      newPole.getBlock().position,
    ];

    const line1 = new Vector(pos1).subXZ(new Vector(pos2)).get();
    const line2 = new Vector(pos2).subXZ(new Vector(pos3)).get();
    const angle = -new Vector(line1).angle2(new Vector(line2));

    const halfAngle = angle / 2;

    const edit = this.transactionService.getOrCreateActiveTransaction();

    this.neighborPoleRotation = [
      neighborPole.getBlock().rotation[0],
      neighborPole.getBlock().rotation[1] + Vector.toRadian(halfAngle),
      neighborPole.getBlock().rotation[2],
    ] as Num3;

    edit.updateBlock(neighborPole.getId(), {
      rotation: this.neighborPoleRotation,
    });

    neighborPole.getBlock().conduitConnections.forEach((conn) => {
      edit.updateBlock(conn.block, { isDirty: true });
    });

    this.newPoleRotation = [
      newPole.getBlock().rotation[0],
      this.neighborPoleRotation[1] + Vector.toRadian(halfAngle),
      newPole.getBlock().rotation[2],
    ] as Num3;

    edit.updateBlock(newPole.getId(), {
      rotation: this.newPoleRotation,
    });
  }

  undo() {
    const edit = this.transactionService.getOrCreateActiveTransaction();

    if (!this.neighborPoleId || !this.newPoleId) {
      return;
    }

    edit.updateBlock(this.neighborPoleId, {
      rotation: new Vector(this.neighborPoleRotation).negateY().get(),
    });

    edit.updateBlock(this.newPoleId, {
      rotation: new Vector(this.newPoleRotation).negateY().get(),
    });

    edit.commit();
  }

  private neighborPoleId: string | undefined;

  private newPoleId: string | undefined;

  private neighborPoleRotation: Num3 | undefined;

  private newPoleRotation: Num3 | undefined;

  private cableHelper: CableHelper;

  private transactionService: TransactionService;
}

export default AutoRotatePoles;
