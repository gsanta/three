import AddBlock from './AddBlock';
import Block from '@/client/editor/types/Block';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import AddBlockToSlot from '@/client/editor/use_cases/block/AddBlockToSlot';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import BlockStore from '@/client/editor/stores/block/BlockStore';

class AddWallBlock extends AddBlock {
  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneStore: SceneStore,
    updateService: TransactionService,
  ) {
    super();

    this.addBlockToSlot = new AddBlockToSlot(blockStore, factoryService, sceneStore);

    this.updateService = updateService;

    this.sourceCategories = ['walls'];
    this.targetCategories = ['building-bases'];
  }

  perform({ targetBlock, targetPartIndex, newBlockType }: Parameters<AddBlock['perform']>[0]) {
    if (!targetPartIndex || !targetBlock) {
      return undefined;
    }

    const targetPartCategory = targetBlock.partDetails[targetPartIndex]?.category;

    if (targetPartCategory !== 'wall-slot') {
      return;
    }

    const edit = this.updateService.getTransaction();

    const targetPart = targetBlock.partDetails[targetPartIndex];
    const wallBlock = this.addBlockToSlot.perform(edit, targetBlock.id, targetPartIndex, newBlockType.type);

    const wallNeighbours: Block['neighbourTo'] = [];
    const buildingNeighbours: Block['neighbourTo'] = [];

    targetPart?.joins?.forEach((join) => {
      wallNeighbours.push({
        blockId: targetBlock.id,
        otherPartIndex: join,
      });

      buildingNeighbours.push({
        blockId: wallBlock.id,
        thisPartIndex: join,
      });
    });

    edit.updateBlock(wallBlock.id, { neighbourTo: wallNeighbours }, { arrayMergeStrategy: 'merge' });
    edit.updateBlock(targetBlock.id, { neighbourTo: buildingNeighbours }, { arrayMergeStrategy: 'merge' });

    // if (targetPartCategory === 'ceil-slot' && newBlockType.category === 'roofs') {
    //   this.addBlockToSlot.perform(edit, targetBlock.id, targetPartIndex, newBlockType.type);
    // }

    // if (targetPartCategory === 'floor-slot' && newBlockType.category === 'home-electrics') {
    //   this.addBlockToPointerPos.perform(edit, targetBlock.id, targetPartIndex, newBlockType.type, clientX, clientY);
    // }

    edit.commit();

    return undefined;
  }

  private addBlockToSlot: AddBlockToSlot;

  private updateService: TransactionService;
}

export default AddWallBlock;
