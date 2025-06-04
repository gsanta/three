import { BlockCategoryName } from '../../models/block/BlockCategoryName';
import BlockData from '../../models/block/BlockData';
import Pole from '../../models/block/categories/Pole';
import Num3 from '../../models/math/Num3';
import Vector from '../../models/math/Vector';
import MeshWrapper from '../../models/MeshWrapper';
import { ConnectCable } from '../../services/CableConnector';
import FactoryService from '../../services/factory/FactoryService';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import SceneStore from '../../ui/scene/SceneStore';
import SceneService from '../../ui/scene/service/SceneService';
import AddToAnchorAsChild from '../block/add/AddToAnchorAsChild';
import ConnectPoleToBuilding from '../block/add/ConnectPoleToBuilding';
import DrawOrUpdateCable from '../cable/DrawOrUpdateCable';
import EraseBlock from '../erase/EraseBlock';

class ConnectLowWires implements ConnectCable {
  category = 'poles' as BlockCategoryName;

  constructor(
    from: BlockData,
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneService: SceneService,
    sceneStore: SceneStore,
    transactionService: TransactionService,
  ) {
    this.blockStore = blockStore;
    this.eraseBlock = new EraseBlock(blockStore, transactionService);
    this.sceneStore = sceneStore;
    this.transactionService = transactionService;

    this.from = from;

    this.addChildToAnchor = new AddToAnchorAsChild(factoryService, sceneStore);

    this.connectPoleToBuilding = new ConnectPoleToBuilding(
      blockStore,
      factoryService,
      sceneStore,
      sceneService,
      transactionService,
    );

    this.drawOrUpdateCable = new DrawOrUpdateCable(blockStore, factoryService, transactionService);
  }

  canConnect(candidates: BlockData[]) {
    return candidates.some((candidate) => candidate.category === 'houses');
  }

  cancel() {
    // this.drawOrUpdateCable.cancel();
    this.connectPoleToBuilding.cancel();

    this.lastPos = undefined;

    // if (this.tempWeatherHeadId) {
    //   this.eraseBlock.erase([this.tempWeatherHeadId]);
    //   this.tempWeatherHeadId = undefined;
    // }
  }

  finalize(): void {
    this.connectPoleToBuilding.finalize();
  }

  isUsable(candidates: BlockData[]) {
    return candidates.find((candidate) => candidate.category === 'houses');
  }

  meshRendered(): void {
    // this.createOrUpdateCable();
  }

  update(candidates: BlockData[], fallbackPos: Num3) {
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

    // this.createOrUpdateCable();

    // if (!this.tempWeatherHeadId && candidate) {
    //   this.createWeatherHead(candidate);
    // }
  }

  getConnectionPoint(): Vector {
    const weatherHead = this.blockStore.getBlock(this.tempWeatherHeadId);

    return new MeshWrapper(this.sceneStore.getObj3d(weatherHead.id)).getWorldPosition();
  }

  private createWeatherHead(block: BlockData) {
    const edit = this.transactionService.getOrCreateActiveTransaction();

    this.tempWeatherHeadId = this.addChildToAnchor.execute({
      edit,
      newBlockAnchorName: 'BuildingAnchor',
      newBlockType: this.blockStore.getBlockType('weather-head-1'),
      to: {
        block: block,
        anchorPartName: 'WeatherHeadAnchor1',
      },
    })?.id;

    this.targetCandidateId = block.id;

    edit.commit();
  }

  private createOrUpdateCable() {
    let updatedPos = this.lastPos;

    if (this.tempWeatherHeadId) {
      const weatherHead = this.blockStore.getBlock(this.tempWeatherHeadId);

      updatedPos = new MeshWrapper(this.sceneStore.getObj3d(weatherHead.id)).getWorldPosition().get();
    }

    const fromPos = new MeshWrapper(this.sceneStore.getObj3d(this.from.id))
      .findByName(Pole.WIRE_4)
      .getWorldPosition()
      .get();

    if (updatedPos) {
      this.drawOrUpdateCable.updateOrCreate(fromPos, updatedPos);
    }
  }

  private connectPoleToBuilding: ConnectPoleToBuilding;

  private drawOrUpdateCable: DrawOrUpdateCable;

  private from: BlockData;

  private eraseBlock: EraseBlock;

  private targetCandidateId: string | undefined;

  private tempWeatherHeadId: string | undefined;

  private lastPos: Num3 | undefined;

  private addChildToAnchor: AddToAnchorAsChild;

  private blockStore: BlockStore;

  private sceneStore: SceneStore;

  private transactionService: TransactionService;
}

export default ConnectLowWires;
