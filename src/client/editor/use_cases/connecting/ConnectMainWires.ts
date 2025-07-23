import { BlockCategoryName } from '../../models/block/BlockCategoryName';
import BlockData from '../../models/block/BlockData';
import PoleModel from '../../models/block/categories/PoleModel';
import Num3 from '../../models/math/Num3';
import { ConnectCable } from '../../services/CableConnector';
import FactoryService from '../../services/factory/FactoryService';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import ElectricityService from '../../stores/electricity/ElectricityService';
import SceneStore from '../../ui/scene/SceneStore';
import JoinPoles from '../block/JoinPoles';

class ConnectMainWires implements ConnectCable {
  category = 'poles' as BlockCategoryName;

  constructor(
    blockStore: BlockStore,
    electricityService: ElectricityService,
    factoryService: FactoryService,
    sceneStore: SceneStore,
    transactionService: TransactionService,
  ) {
    this.blockStore = blockStore;

    this.joinPoles = new JoinPoles(blockStore, electricityService, sceneStore, factoryService, transactionService);
  }

  canConnect(candidates: BlockData[]) {
    return candidates.some((candidate) => candidate.category === 'poles' || candidate.category === 'transformers');
  }

  cancel() {
    this.lastPos = undefined;
    this.candidateId = undefined;

    this.joinPoles.undo();
  }

  finalize(): void {
    if (!this.from) {
      throw new Error('Cannot finalize: no starting pole defined.');
    }

    const candidateId = this.candidateId;
    this.cancel();

    if (candidateId) {
      this.joinPoles.join(this.from.getBlock(), this.blockStore.getBlock(candidateId), { isPreview: false });
    }

    this.from = undefined;
  }

  getCableIds() {
    return this.joinPoles.getCableIds().filter((cableId) => cableId !== undefined);
  }

  meshRendered(): void {}

  start(blockData: BlockData) {
    const pole = new PoleModel(blockData, this.blockStore);
    this.from = pole;
  }

  update(candidates: BlockData[], fallbackPos: Num3) {
    if (this.lastPos === fallbackPos) {
      return;
    }

    if (this.from === undefined) {
      return;
    }

    const pole = candidates.find((candidate) => candidate.category === 'poles');
    const transformer = candidates.find((candidate) => candidate.category === 'transformers');

    if (transformer) {
      this.candidateId = transformer.id;
    } else if (pole) {
      this.candidateId = pole.id;
    }

    this.lastPos = fallbackPos;

    this.joinPoles.join(this.from?.getBlock(), this.blockStore.getBlock(this.candidateId), {
      isPreview: true,
    });
  }

  private blockStore: BlockStore;

  private candidateId: string | undefined;

  private from: PoleModel | undefined;

  private joinPoles: JoinPoles;

  private lastPos: Num3 | undefined;
}

export default ConnectMainWires;
