import AddBlockToPlain from './AddBlockToPlain';
import AddBlock from './AddBlock';
import AddContext from './AddContext';
import AddFurnitureBlock from './AddFurnitureBlock';
import AddHomeElectricsBlock from './AddHomeElectricsBlock';
import AddPoles from './AddPoles';
import AddRoadBlock from './AddRoadBlock';
import AddRoofBlock from './AddRoofBlock';
import AddRoomBlock from './AddRoomBlock';
import AddSocketBlock from './AddSocketBlock';
import AddWallBlock from './AddWallBlock';
import AddWeatherHeadBlock from './AddWeatherHeadBlock';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import SceneService from '@/client/editor/components/scene/service/SceneService';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import BlockStore from '@/client/editor/stores/block/BlockStore';

class AddService {
  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneService: SceneService,
    sceneStore: SceneStore,
    update: TransactionService,
  ) {
    this.blockStore = blockStore;
    this.addBlock = [
      new AddBlockToPlain(factoryService, update),
      new AddFurnitureBlock(factoryService),
      new AddHomeElectricsBlock(blockStore, factoryService, sceneService, sceneStore, update),
      new AddPoles(blockStore, factoryService, sceneStore, update),
      new AddRoadBlock(blockStore, factoryService, sceneStore, update),
      new AddRoofBlock(blockStore, factoryService, sceneStore, update),
      new AddRoomBlock(factoryService),
      new AddSocketBlock(blockStore, factoryService, sceneService, sceneStore, update),
      new AddWallBlock(blockStore, factoryService, sceneStore, update),
      new AddWeatherHeadBlock(blockStore, factoryService, sceneService, sceneStore, update),
    ];
  }

  execute(props: Parameters<AddBlock['perform']>[0]) {
    props.newBlockType.this.blockStore.getBlockType(props.newBlockType.type);
    return this.addBlock.find(
      (addBlock) =>
        addBlock.sourceCategories.includes(newBlockCategory) && addBlock.targetCategories.includes(targetBlockCategory),
    );
  }

  private addBlock: AddBlock[] = [];

  private addContext: AddContext = {};

  private blockStore: BlockStore;
}

export default AddService;
