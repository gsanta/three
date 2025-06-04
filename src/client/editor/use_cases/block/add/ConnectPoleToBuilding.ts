import BlockData from '@/client/editor/models/block/BlockData';
import Pole from '@/client/editor/models/block/categories/Pole';
import MeshWrapper from '@/client/editor/models/MeshWrapper';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import SceneStore from '@/client/editor/ui/scene/SceneStore';
import AddToAnchorAsChild from './AddToAnchorAsChild';
import SceneService from '@/client/editor/ui/scene/service/SceneService';
import Vector from '@/client/editor/models/math/Vector';
import EraseBlock from '../../erase/EraseBlock';

class ConnectPoleToBuilding {
  constructor(
    blockStore: BlockStore,
    factory: FactoryService,
    sceneStore: SceneStore,
    sceneService: SceneService,
    transactionService: TransactionService,
  ) {
    this.blockStore = blockStore;
    this.factory = factory;
    this.sceneStore = sceneStore;
    this.transactionService = transactionService;

    this.addChildToAnchor = new AddToAnchorAsChild(factory, sceneStore);

    this.onMeshRendered = this.onMeshRendered.bind(this);

    sceneService.subscribeMeshRendered(this.onMeshRendered);

    this.eraseBlock = new EraseBlock(blockStore, transactionService);
  }

  cancel() {
    if (this.weatherHeadId) {
      this.eraseBlock.erase([this.weatherHeadId]);
      this.weatherHeadId = undefined;
    }
  }

  execute(building: BlockData, pole: BlockData) {
    if (building.category !== 'houses') {
      throw new Error(`Category 'houses' expected, but got '${building.category}'`);
    }

    if (pole.category !== 'poles') {
      throw new Error(`Category 'poles' expected, but got '${pole.category}'`);
    }

    this.pole = pole;

    const edit = this.transactionService.getOrCreateActiveTransaction();

    const nearestAnchor = this.findNearestWeatherHeadAnchor(building);

    this.weatherHeadId = this.addChildToAnchor.execute({
      edit,
      newBlockAnchorName: 'BuildingAnchor',
      newBlockType: this.blockStore.getBlockType('weather-head-1'),
      to: {
        block: building,
        anchorPartName: nearestAnchor.partName,
      },
    })?.id;

    edit.commit();
  }

  finalize() {
    this.weatherHeadId = undefined;
    this.pole = undefined;
  }

  isExecuted() {
    return !!this.weatherHeadId;
  }

  private onMeshRendered(blockId: string) {
    if (!this.pole) {
      return;
    }

    if (blockId === this.weatherHeadId) {
      const edit = this.transactionService.createTransaction();

      const weatherHead = this.blockStore.getBlock(blockId);

      const poleAnchorPos = new MeshWrapper(this.sceneStore.getObj3d(this.pole.id))
        .findByName(Pole.WIRE_4)
        .getWorldPosition();

      const weatherHeadAnchorPos = new MeshWrapper(this.sceneStore.getObj3d(weatherHead.id)).getWorldPosition();

      const cable = this.factory.create(edit, 'cable-1', {
        block: {
          multiParentConnections: [{ block: this.pole.id || '' }, { block: weatherHead.id }],
          isDirty: true,
        },
        decorations: {
          cables: {
            end1: { partName: Pole.WIRE_4, device: this.pole.id, pinIndex: 0 },
            end2: { partName: 'CableAnchor', device: weatherHead.id, pinIndex: 0 },
            points: [
              { position: poleAnchorPos.get(), blockId: this.pole.id },
              { position: weatherHeadAnchorPos.get(), blockId: weatherHead.id },
            ],
          },
        },
      });

      edit.updateBlock(this.weatherHeadId, {
        conduitConnections: [{ block: cable.id, pinIndex: 0, thisPart: 'CableAnchor' }],
      });

      edit.commit();
    }
  }

  private findNearestWeatherHeadAnchor(building: BlockData) {
    const polePos = this.pole?.position;

    return Object.entries(building.partDetails)
      .filter(([_name, part]) => part?.roles?.includes('weather-head-anchor'))
      .reduce(
        (nearest, [name]) => {
          const partPos = new MeshWrapper(this.sceneStore.getObj3d(building.id)).findByName(name).getWorldPosition();
          const newDistance = new Vector(polePos).distance(partPos);
          if (nearest.distance > newDistance) {
            return { distance: newDistance, partName: name };
          }

          return nearest;
        },
        { distance: Number.MAX_SAFE_INTEGER, partName: '' },
      );
  }

  private eraseBlock: EraseBlock;

  private weatherHeadId?: string;

  private pole?: BlockData;

  private addChildToAnchor: AddToAnchorAsChild;

  private blockStore: BlockStore;

  private sceneStore: SceneStore;

  private factory: FactoryService;

  private transactionService: TransactionService;
}

export default ConnectPoleToBuilding;
