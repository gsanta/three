import BlockData from '@/client/editor/models/block/BlockData';
import Pole from '@/client/editor/models/block/categories/Pole';
import Vector from '@/client/editor/models/math/Vector';
import MeshWrapper from '@/client/editor/models/MeshWrapper';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import SceneStore from '@/client/editor/ui/scene/SceneStore';
import FindNearestBlock from '@/client/editor/use_cases/scene/FindNearestBlock';
import AddToAnchorAsChild from './AddToAnchorAsChild';
import SceneService from '@/client/editor/ui/scene/service/SceneService';

class ConnectPoleToBuilding {
  constructor(
    blockStore: BlockStore,
    factory: FactoryService,
    sceneStore: SceneStore,
    sceneService: SceneService,
    transactionService: TransactionService,
  ) {
    this.blockStore = blockStore;
    this.findNearestBlock = new FindNearestBlock(blockStore);
    this.factory = factory;
    this.sceneStore = sceneStore;
    this.transactionService = transactionService;

    this.addChildToAnchor = new AddToAnchorAsChild(factory, sceneStore);

    this.onMeshRendered = this.onMeshRendered.bind(this);

    sceneService.subscribeMeshRendered(this.onMeshRendered);
  }

  execute(building: BlockData) {
    if (building.category !== 'houses') {
      throw new Error(`Category 'houses' expected, but got '${building.category}'`);
    }

    this.nearestPole = this.findNearestBlock.find(new Vector(building.position), { category: 'poles' });

    if (!this.nearestPole) {
      throw new Error(`No suitable Pole found to connect to building.`);
    }

    const edit = this.transactionService.getOrCreateActiveTransaction();

    this.tmpBlockId = this.addChildToAnchor.execute({
      edit,
      newBlockAnchorName: 'BuildingAnchor',
      newBlockType: this.blockStore.getBlockType('weather-head-1'),
      to: {
        block: building,
        anchorPartName: 'WeatherHeadAnchor1',
      },
    })?.id;

    edit.commit();
  }

  private onMeshRendered(blockId: string) {
    if (!this.nearestPole) {
      return;
    }

    if (blockId === this.tmpBlockId) {
      const edit = this.transactionService.createTransaction();

      const weatherHead = this.blockStore.getBlock(blockId);

      const poleAnchorPos = new MeshWrapper(this.sceneStore.getObj3d(this.nearestPole.id))
        .findByName(Pole.WIRE_4)
        .getWorldPosition();

      // const weatherHeadAnchorPos = new MeshWrapper(this.sceneStore.getObj3d(building.id))
      //   .findByName('WeatherHeadAnchor1')
      //   .getWorldPosition();

      const weatherHeadAnchorPos = new MeshWrapper(this.sceneStore.getObj3d(weatherHead.id)).getWorldPosition();

      this.factory.create(edit, 'cable-1', {
        block: {
          multiParentConnections: [{ block: this.nearestPole.id || '' }, { block: weatherHead.id }],
          isDirty: true,
        },
        decorations: {
          cables: {
            end1: { pin: Pole.WIRE_4, device: this.nearestPole.id },
            end2: { pin: 'CableAnchor', device: weatherHead.id },
            points: [
              { position: poleAnchorPos.get(), blockId: this.nearestPole.id },
              { position: weatherHeadAnchorPos.get(), blockId: weatherHead.id },
            ],
          },
        },
      });

      edit.commit();
    }
  }

  private tmpBlockId?: string;

  private nearestPole?: BlockData;

  private addChildToAnchor: AddToAnchorAsChild;

  private blockStore: BlockStore;

  private sceneStore: SceneStore;

  private findNearestBlock: FindNearestBlock;

  private factory: FactoryService;

  private transactionService: TransactionService;
}

export default ConnectPoleToBuilding;
