import { BlockCategoryName } from '../../models/block/BlockCategoryName';
import BlockData from '../../models/block/BlockData';
import Num3 from '../../models/math/Num3';
import Vector from '../../models/math/Vector';
import MeshWrapper from '../../models/MeshWrapper';
import { ConnectCable } from '../../services/CableConnector';
import FactoryService from '../../services/factory/FactoryService';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import SceneStore from '../../ui/scene/SceneStore';
import SceneService from '../../ui/scene/service/SceneService';
import ConnectPoleToBuilding from '../block/add/ConnectPoleToBuilding';

class ConnectLowWires implements ConnectCable {
  category = 'poles' as BlockCategoryName;

  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneService: SceneService,
    sceneStore: SceneStore,
    transactionService: TransactionService,
  ) {
    this.blockStore = blockStore;
    this.sceneStore = sceneStore;

    this.connectPoleToBuilding = new ConnectPoleToBuilding(
      blockStore,
      factoryService,
      sceneStore,
      sceneService,
      transactionService,
    );
  }

  canConnect(candidates: BlockData[]) {
    return candidates.some((candidate) => candidate.category === 'houses');
  }

  cancel() {
    this.connectPoleToBuilding.cancel();

    this.lastPos = undefined;
  }

  finalize(): void {
    this.connectPoleToBuilding.finalize();
  }

  isUsable(candidates: BlockData[]) {
    return candidates.find((candidate) => candidate.category === 'houses');
  }

  meshRendered(): void {}

  start(blockData: BlockData) {
    this.from = blockData;
  }

  update(candidates: BlockData[], fallbackPos: Num3) {
    if (!this.from) {
      throw new Error('No starting block defined for connecting low wires');
    }

    if (this.lastPos === fallbackPos) {
      return;
    }

    const candidate = candidates.find((c) => c.category === 'houses');

    if (!candidate) {
      throw new Error('No candidate found for connecting low wires');
    }

    if (this.connectPoleToBuilding.isExecuted() && this.targetCandidateId !== candidate?.id) {
      this.connectPoleToBuilding.cancel();
    }

    this.connectPoleToBuilding.execute(candidate, this.from);

    this.lastPos = fallbackPos;
  }

  getConnectionPoint(): Vector {
    const weatherHead = this.blockStore.getBlock(this.tempWeatherHeadId);

    return new MeshWrapper(this.sceneStore.getObj3d(weatherHead.id)).getWorldPosition();
  }

  private connectPoleToBuilding: ConnectPoleToBuilding;

  private from: BlockData | undefined;

  private targetCandidateId: string | undefined;

  private tempWeatherHeadId: string | undefined;

  private lastPos: Num3 | undefined;

  private blockStore: BlockStore;

  private sceneStore: SceneStore;
}

export default ConnectLowWires;
