import { BlockCategoryName } from '../../models/block/BlockCategoryName';
import BlockData from '../../models/block/BlockData';
import Pole from '../../models/block/categories/Pole';
import Num3 from '../../models/math/Num3';
import Vector from '../../models/math/Vector';
import MeshWrapper from '../../models/MeshWrapper';
import { ConnectCable, ConnectCableFactory } from '../../services/CableConnector';
import FactoryService from '../../services/factory/FactoryService';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import SceneStore from '../../ui/scene/SceneStore';
import AddToAnchorAsChild from '../block/add/AddToAnchorAsChild';
import DrawOrUpdateCable from '../cable/DrawOrUpdateCable';
import EraseBlock from '../erase/EraseBlock';

class ConnectPole implements ConnectCable {
  category = 'poles' as BlockCategoryName;

  constructor(
    from: BlockData,
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneStore: SceneStore,
    transactionService: TransactionService,
  ) {
    this.blockStore = blockStore;
    this.eraseBlock = new EraseBlock(blockStore, transactionService);
    this.sceneStore = sceneStore;
    this.transactionService = transactionService;

    this.from = from;

    this.addChildToAnchor = new AddToAnchorAsChild(factoryService, sceneStore);

    this.drawOrUpdateCable = new DrawOrUpdateCable(blockStore, factoryService, transactionService);
  }

  cancel() {
    this.drawOrUpdateCable.cancel();

    if (this.tempWeatherHeadId) {
      this.eraseBlock.erase([this.tempWeatherHeadId]);
    }
  }

  finalize(): void {}

  meshRendered(): void {
    this.createOrUpdateCable();
  }

  preview(candidates: BlockData[], fallbackPos: Num3) {
    if (this.lastPos === fallbackPos) {
      return;
    }

    const candidate = candidates[0];

    if (this.tempWeatherHeadId && this.targetCandidateId !== candidate?.id) {
      this.eraseBlock.erase([this.tempWeatherHeadId]);
      this.tempWeatherHeadId = undefined;
    }

    this.lastPos = fallbackPos;

    this.createOrUpdateCable();

    if (!this.tempWeatherHeadId && candidate) {
      this.createWeatherHead(candidate);
    }
  }

  getConnectionPoint(): Vector {
    const weatherHead = this.blockStore.getBlock(this.tempWeatherHeadId);

    // const poleAnchorPos = new MeshWrapper(this.sceneStore.getObj3d(this.from.id))
    //   .findByName(Pole.WIRE_4)
    //   .getWorldPosition();

    // const weatherHeadAnchorPos = new MeshWrapper(this.sceneStore.getObj3d(building.id))
    //   .findByName('WeatherHeadAnchor1')
    //   .getWorldPosition();

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

  private drawOrUpdateCable: DrawOrUpdateCable;

  private from: BlockData;

  private eraseBlock: EraseBlock;

  private targetCandidateId: string | undefined;

  private tempWeatherHeadId: string | undefined;

  private tempCableId: string | undefined;

  private lastPos: Num3 | undefined;

  private addChildToAnchor: AddToAnchorAsChild;

  private blockStore: BlockStore;

  private sceneStore: SceneStore;

  private transactionService: TransactionService;
}

export class ConnectPoleFactory implements ConnectCableFactory {
  category: BlockCategoryName = 'poles';

  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneStore: SceneStore,
    transactionService: TransactionService,
  ) {
    this.blockStore = blockStore;
    this.factoryService = factoryService;
    this.sceneStore = sceneStore;
    this.transactionService = transactionService;
  }

  getConnector(from: BlockData): ConnectCable {
    return new ConnectPole(from, this.blockStore, this.factoryService, this.sceneStore, this.transactionService);
  }

  private blockStore: BlockStore;

  private factoryService: FactoryService;

  private sceneStore: SceneStore;

  private transactionService: TransactionService;
}

export default ConnectPole;
