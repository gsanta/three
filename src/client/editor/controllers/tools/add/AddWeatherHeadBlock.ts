import AddBlock from './AddBlock';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import AddBlockToPointerPos from '@/client/editor/use_cases/block/AddBlockToPointerPos';
import SceneService from '@/client/editor/components/scene/service/SceneService';

class AddWeatherHeadBlock extends AddBlock {
  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneService: SceneService,
    sceneStore: SceneStore,
    updateService: TransactionService,
  ) {
    super();

    this.addBlockToPointerPos = new AddBlockToPointerPos(blockStore, factoryService, sceneService, sceneStore);

    this.updateService = updateService;

    this.sourceCategories = ['weather-heads'];
    this.targetCategories = ['roofs'];
  }

  perform({ clientX, clientY, targetBlock, targetPartIndex, newBlockType }: Parameters<AddBlock['perform']>[0]) {
    if (!targetPartIndex || !targetBlock) {
      return undefined;
    }

    const edit = this.updateService.getTransaction();

    this.addBlockToPointerPos.perform(edit, targetBlock.id, targetPartIndex, newBlockType.type, clientX, clientY);

    edit.commit();

    return undefined;
  }

  private addBlockToPointerPos: AddBlockToPointerPos;

  private updateService: TransactionService;
}

export default AddWeatherHeadBlock;
