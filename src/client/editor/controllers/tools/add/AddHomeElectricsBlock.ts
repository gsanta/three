import AddBlockType from './AddBlockType';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import AddBlockToPointerPos from '@/client/editor/use_cases/block/AddBlockToPointerPos';
import SceneService from '@/client/editor/components/scene/service/SceneService';

class AddHomeElectricsBlock extends AddBlockType {
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

    this.sourceCategories = ['home-electrics'];
    this.targetCategories = ['building-bases'];
  }

  perform({
    edit,
    clientX,
    clientY,
    targetBlock,
    targetPartIndex,
    newBlockType,
  }: Parameters<AddBlockType['perform']>[0]) {
    if (!targetPartIndex || !targetBlock) {
      return undefined;
    }

    const targetPartCategory = targetBlock.partDetails[targetPartIndex]?.category;

    if (targetPartCategory === 'floor-slot') {
      this.addBlockToPointerPos.perform(edit, targetBlock.id, targetPartIndex, newBlockType.type, clientX, clientY);
    }
  }

  private addBlockToPointerPos: AddBlockToPointerPos;

  private updateService: TransactionService;
}

export default AddHomeElectricsBlock;
