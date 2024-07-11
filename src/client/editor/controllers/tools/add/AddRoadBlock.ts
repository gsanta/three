import AddBlock from './AddBlock';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import AddSlotToSlot from '@/client/editor/use_cases/block/AddSlotToSlot';

class AddRoadBlock extends AddBlock {
  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneStore: SceneStore,
    updateService: TransactionService,
  ) {
    super();

    this.addSlotToSlot = new AddSlotToSlot(blockStore, factoryService, sceneStore, updateService);

    this.updateService = updateService;

    this.sourceCategories = ['roads'];
    this.targetCategories = ['roads'];
  }

  perform({ targetBlock, targetPartIndex, newBlockType }: Parameters<AddBlock['perform']>[0]) {
    if (!targetPartIndex || !targetBlock) {
      return undefined;
    }

    const edit = this.updateService.getTransaction();

    const targetPartCategory = targetBlock.partDetails[targetPartIndex]?.category;

    if (targetPartCategory === 'road-slot') {
      this.addSlotToSlot.perform(edit, targetBlock.id, targetPartIndex, newBlockType.type);
    }

    edit.commit();

    return undefined;
  }

  private addSlotToSlot: AddSlotToSlot;

  private updateService: TransactionService;
}

export default AddRoadBlock;
