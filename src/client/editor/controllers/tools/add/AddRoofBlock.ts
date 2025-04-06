import AddBlock from './AddBlock';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import AddBlockToSlot from '@/client/editor/use_cases/block/AddBlockToSlot';

class AddRoofBlock extends AddBlock {
  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneStore: SceneStore,
    updateService: TransactionService,
  ) {
    super();

    this.addBlockToSlot = new AddBlockToSlot(blockStore, factoryService, sceneStore);

    this.updateService = updateService;

    this.sourceCategories = ['roofs'];
    this.targetCategories = ['building-bases'];
  }

  perform({ edit, targetBlock, targetPartIndex, newBlockType }: Parameters<AddBlock['perform']>[0]) {
    if (!targetPartIndex || !targetBlock) {
      return undefined;
    }

    const targetPartCategory = targetBlock.partDetails[targetPartIndex]?.roles;

    if (targetPartCategory === 'ceil-slot') {
      this.addBlockToSlot.perform(edit, targetBlock.id, targetPartIndex, newBlockType.type);
    }
  }

  private addBlockToSlot: AddBlockToSlot;

  private updateService: TransactionService;
}

export default AddRoofBlock;
