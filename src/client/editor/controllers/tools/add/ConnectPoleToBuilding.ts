import BlockData from '@/client/editor/models/block/BlockData';
import Pole from '@/client/editor/models/block/categories/Pole';
import BlockPart from '@/client/editor/models/block/part/BlockPart';
import Vector from '@/client/editor/models/math/Vector';
import MeshWrapper from '@/client/editor/models/MeshWrapper';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import SceneStore from '@/client/editor/ui/scene/SceneStore';
import FindNearestBlock from '@/client/editor/use_cases/scene/FindNearestBlock';
import AddChildToAnchor from './AddChildToAnchor';

class ConnectPoleToBuilding {
  constructor(
    blockStore: BlockStore,
    factory: FactoryService,
    sceneStore: SceneStore,
    transactionService: TransactionService,
  ) {
    this.blockStore = blockStore;
    this.findNearestBlock = new FindNearestBlock(blockStore);
    this.factory = factory;
    this.sceneStore = sceneStore;
    this.transactionService = transactionService;

    this.addChildToAnchor = new AddChildToAnchor(factory, sceneStore);
  }

  execute(building: BlockData) {
    if (building.category !== 'houses') {
      throw new Error(`Category 'houses' expected, but got '${building.category}'`);
    }

    const nearestPole = this.findNearestBlock.find(new Vector(building.position), { category: 'poles' });

    if (!nearestPole) {
      throw new Error(`No suitable Pole found to connect to building.`);
    }

    const edit = this.transactionService.getOrCreateActiveTransaction();

    const poleAnchorPos = new MeshWrapper(this.sceneStore.getObj3d(nearestPole.id))
      .findByName(Pole.WIRE_4)
      .getWorldPosition();

    // const weatherHeadAnchorPos = new MeshWrapper(this.sceneStore.getObj3d(building.id))
    //   .findByName('WeatherHeadAnchor1')
    //   .getWorldPosition();

    const weatherHeadAnchorPos = new BlockPart(building, 'WeatherHeadAnchor1').getPart().position;

    // const weatherHead = this.factory.create(edit, 'weather-head-1', {
    //   block: {
    //     parentConnection: { block: building.id, part: 'WeatherHeadAnchor1' },
    //     // multiParentConnections: [{ block: nearestPole.id }, { block: building.id }],
    //     isDirty: true,
    //     position: weatherHeadAnchorPos,
    //   },
    //   // decorations: {
    //   //   cables: {
    //   //     end1: { pin: Pole.WIRE_4, device: nearestPole.id },
    //   //     end2: { pin: 'WeatherHeadAnchor1', device: building.id },
    //   //     points: [
    //   //       { position: poleAnchorPos.get(), blockId: nearestPole.id },
    //   //       { position: weatherHeadAnchorPos.get(), blockId: building.id },
    //   //     ],
    //   //   },
    //   // },
    // });

    // edit.updateBlock(building.id, {
    //   childConnections: [
    //     {
    //       childBlock: weatherHead.id,
    //     },
    //   ],
    // });

    this.addChildToAnchor.perform({
      edit,
      newBlockAnchorName: 'BuildingAnchor',
      newBlockType: this.blockStore.getBlockType('weather-head-1'),
      to: {
        block: building,
        anchorPartName: 'WeatherHeadAnchor1',
      },
      // addMethod: {
      //   name: 'add-slot-to-slot',
      //   connectionType: 'parent-child',
      //   sourcePartRole: 'weather-head-anchor',
      // },
      // edit,
      // newBlockType: this.blockStore.getBlockType('weather-head-1'),
      // targetBlock: building,
      // targetPartIndex: 'WeatherHeadAnchor1',
    });

    // this.factory.create(edit, 'cable-1', {
    //   block: {
    //     multiParentConnections: [{ block: nearestPole.id }, { block: building.id }],
    //     isDirty: true,
    //   },
    //   decorations: {
    //     cables: {
    //       end1: { pin: Pole.WIRE_4, device: nearestPole.id },
    //       end2: { pin: 'WeatherHeadAnchor1', device: building.id },
    //       points: [
    //         { position: poleAnchorPos.get(), blockId: nearestPole.id },
    //         { position: weatherHeadAnchorPos.get(), blockId: building.id },
    //       ],
    //     },
    //   },
    // });

    edit.commit();
  }

  private addChildToAnchor: AddChildToAnchor;

  private blockStore: BlockStore;

  private sceneStore: SceneStore;

  private findNearestBlock: FindNearestBlock;

  private factory: FactoryService;

  private transactionService: TransactionService;
}

export default ConnectPoleToBuilding;
