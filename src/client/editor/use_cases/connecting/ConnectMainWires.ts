import { BlockCategoryName } from '../../models/block/BlockCategoryName';
import BlockData from '../../models/block/BlockData';
import Pole, { WireRole, wireRoleNames } from '../../models/block/categories/Pole';
import Num3 from '../../models/math/Num3';
import MeshWrapper from '../../models/MeshWrapper';
import { ConnectCable } from '../../services/CableConnector';
import FactoryService from '../../services/factory/FactoryService';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import SceneStore from '../../ui/scene/SceneStore';
import JoinPoles from '../block/JoinPoles';
import DrawCable from '../cable/DrawCable';

class ConnectMainWires implements ConnectCable {
  category = 'poles' as BlockCategoryName;

  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneStore: SceneStore,
    transactionService: TransactionService,
  ) {
    this.blockStore = blockStore;

    this.sceneStore = sceneStore;

    this.joinPoles = new JoinPoles(blockStore, sceneStore, factoryService, transactionService);

    wireRoleNames.forEach((wireRole) => {
      this.drawCables[wireRole] = new DrawCable(blockStore, factoryService, transactionService);
    });
  }

  canConnect(candidates: BlockData[]) {
    return candidates.some((candidate) => candidate.category === 'poles' || candidate.category === 'transformers');
  }

  cancel() {
    this.lastPos = undefined;
    this.candidateId = undefined;

    this.from?.getPoleDecorator().wires.forEach((wire) => this.drawCables[wire]?.cancel());
  }

  finalize(): void {
    if (!this.from) {
      throw new Error('Cannot finalize: no starting pole defined.');
    }

    const candidateId = this.candidateId;
    this.cancel();

    if (candidateId) {
      this.joinPoles.join(this.from.getBlock(), this.blockStore.getBlock(candidateId));
    }

    this.from = undefined;
  }

  isUsable(_candidates: BlockData[]) {
    return true;
  }

  meshRendered(): void {
    this.from?.getPoleDecorator().wires.forEach((wire) => this.createOrUpdateCable(wire));
  }

  start(blockData: BlockData) {
    const pole = new Pole(blockData, this.blockStore);
    this.from = pole;

    this.from?.getPoleDecorator().wires.forEach((wire) => this.drawCables[wire]?.updateConfig({ isPreview: true }));
  }

  update(candidates: BlockData[], fallbackPos: Num3) {
    if (this.lastPos === fallbackPos) {
      return;
    }

    const pole = candidates.find((candidate) => candidate.category === 'poles');
    const transformer = candidates.find((candidate) => candidate.category === 'transformers');

    if (transformer) {
      this.candidateId = transformer.id;
    } else if (pole) {
      this.candidateId = pole.id;
    } else {
      this.candidateId = undefined;
    }

    this.lastPos = fallbackPos;

    this.from?.getPoleDecorator().wires.forEach((wire) => this.createOrUpdateCable(wire));
  }

  private createOrUpdateCable(wire: WireRole) {
    if (!this.from) {
      throw new Error('Cannot finalize: no starting pole defined.');
    }

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

    console.log(`Connecting ${this.from.getId()} wire ${wire} to ${toPos ? 'position' : 'undefined'}`, fromPos, toPos);

    if (toPos) {
      this.drawCables[wire]?.draw(fromPos, toPos);
    }
  }

  private blockStore: BlockStore;

  private candidateId: string | undefined;

  private drawCables: Partial<Record<WireRole, DrawCable>> = {};

  private from: Pole | undefined;

  private joinPoles: JoinPoles;

  private lastPos: Num3 | undefined;

  private sceneStore: SceneStore;
}

export default ConnectMainWires;
