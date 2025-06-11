import { BlockCategoryName } from '../../models/block/BlockCategoryName';
import BlockData from '../../models/block/BlockData';
import Pole, { WireRole } from '../../models/block/categories/Pole';
import Num3 from '../../models/math/Num3';
import MeshWrapper from '../../models/MeshWrapper';
import { ConnectCable } from '../../services/CableConnector';
import FactoryService from '../../services/factory/FactoryService';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import SceneStore from '../../ui/scene/SceneStore';
import JoinPoles from '../block/JoinPoles';
import DrawOrUpdateCable from '../cable/DrawOrUpdateCable';

class ConnectMainWires implements ConnectCable {
  category = 'poles' as BlockCategoryName;

  constructor(
    from: BlockData,
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneStore: SceneStore,
    transactionService: TransactionService,
  ) {
    this.blockStore = blockStore;

    this.sceneStore = sceneStore;

    this.joinPoles = new JoinPoles(blockStore, sceneStore, factoryService, transactionService);

    const pole = new Pole(from, blockStore);
    this.from = pole;

    pole.getPoleDecorator().wires.forEach((wire) => {
      this.drawOrUpdateCables[wire] = new DrawOrUpdateCable(blockStore, factoryService, transactionService);
    });
  }

  canConnect(candidates: BlockData[]) {
    return candidates.some((candidate) => candidate.category === 'poles');
  }

  cancel() {
    this.lastPos = undefined;
    this.candidateId = undefined;
    Object.values(this.drawOrUpdateCables).forEach((drawOrUpdateCable) => drawOrUpdateCable.cancel());
  }

  finalize(): void {
    const candidateId = this.candidateId;
    this.cancel();

    if (candidateId) {
      this.joinPoles.join(
        new Pole(this.from.getBlock(), this.blockStore),
        new Pole(this.blockStore.getBlock(candidateId), this.blockStore),
      );
    }
  }

  isUsable(_candidates: BlockData[]) {
    return true;
  }

  meshRendered(): void {
    this.from.getPoleDecorator().wires.forEach((wire) => this.createOrUpdateCable(wire));
  }

  update(candidates: BlockData[], fallbackPos: Num3) {
    if (this.lastPos === fallbackPos) {
      return;
    }

    const pole = candidates.find((candidate) => candidate.category === 'poles');

    if (pole) {
      this.candidateId = pole.id;
    } else {
      this.candidateId = undefined;
    }

    this.lastPos = fallbackPos;

    this.from.getPoleDecorator().wires.forEach((wire) => this.createOrUpdateCable(wire));
  }

  private createOrUpdateCable(wire: WireRole) {
    let toPos = this.lastPos;

    if (this.candidateId) {
      const candidate = this.sceneStore.getObj3d(this.candidateId);
      if (candidate) {
        toPos = new MeshWrapper(candidate).findByName(wire).getWorldPosition().get();
      }
    }

    const fromPos = new MeshWrapper(this.sceneStore.getObj3d(this.from.getId()))
      .findByName(wire)
      .getWorldPosition()
      .get();

    if (toPos) {
      this.drawOrUpdateCables[wire]?.updateOrCreate(fromPos, toPos);
    }
  }

  private blockStore: BlockStore;

  private candidateId: string | undefined;

  private drawOrUpdateCables: Partial<Record<WireRole, DrawOrUpdateCable>> = {};

  private from: Pole;

  private joinPoles: JoinPoles;

  private lastPos: Num3 | undefined;

  private sceneStore: SceneStore;
}

export default ConnectMainWires;
