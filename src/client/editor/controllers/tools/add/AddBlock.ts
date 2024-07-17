import AddBlockToPlain from './AddBlockToPlain';
import AddBlockType from './AddBlockType';
import AddHomeElectricsBlock from './AddHomeElectricsBlock';
import AddPoleBlock from './AddPoleBlock';
import AddRoadBlock from './AddRoadBlock';
import AddRoofBlock from './AddRoofBlock';
import AddSocketBlock from './AddSocketBlock';
import AddWallBlock from './AddWallBlock';
import AddWeatherHeadBlock from './AddWeatherHeadBlock';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import SceneService from '@/client/editor/components/scene/service/SceneService';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import BlockStore from '@/client/editor/stores/block/BlockStore';

class AddBlock {
  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneService: SceneService,
    sceneStore: SceneStore,
    update: TransactionService,
  ) {
    this.addBlock = [
      new AddBlockToPlain(factoryService, update),
      new AddHomeElectricsBlock(blockStore, factoryService, sceneService, sceneStore, update),
      new AddPoleBlock(blockStore, factoryService, sceneStore, update),
      new AddRoadBlock(blockStore, factoryService, sceneStore, update),
      new AddRoofBlock(blockStore, factoryService, sceneStore, update),
      new AddSocketBlock(blockStore, factoryService, sceneService, sceneStore, update),
      new AddWallBlock(blockStore, factoryService, sceneStore, update),
      new AddWeatherHeadBlock(blockStore, factoryService, sceneService, sceneStore, update),
    ];
  }

  getAddBlock(newBlockCategory: string, targetBlockCategory: string) {
    return this.addBlock.find(
      (addBlock) =>
        addBlock.sourceCategories.includes(newBlockCategory) && addBlock.targetCategories.includes(targetBlockCategory),
    );
  }

  private addBlock: AddBlockType[] = [];
}

export default AddBlock;
