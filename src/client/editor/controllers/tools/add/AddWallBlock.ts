import AddBlock from './AddBlock';
import Block from '@/client/editor/types/Block';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import AddBlockToSlot from '@/client/editor/use_cases/block/AddBlockToSlot';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import { v4 as uuidv4 } from 'uuid';

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

  perform({ edit, targetBlock, targetPartIndex, newBlockType }: Parameters<AddBlock['perform']>[0]) {
    if (!targetPartIndex || !targetBlock) {
      return undefined;
    }

    const targetPartCategory = targetBlock.partDetails[targetPartIndex]?.roles;

    if (targetPartCategory !== 'wall-slot') {
      return;
    }

    const targetPart = targetBlock.partDetails[targetPartIndex];
    const wallBlock = this.addBlockToSlot.perform(edit, targetBlock.id, targetPartIndex, newBlockType.type);

    const wallNeighbours: Block['neighbourConnections'] = [];
    const buildingNeighbours: Block['neighbourConnections'] = [];

    const connectionId = uuidv4();

    targetPart?.joins?.forEach((join) => {
      wallNeighbours.push({
        id: connectionId,
        neighbourBlock: targetBlock.id,
        neighbourPart: join,
      });

      buildingNeighbours.push({
        id: connectionId,
        part: join,
        neighbourBlock: wallBlock.id,
      });
    });

    edit.updateBlock(wallBlock.id, { neighbourConnections: wallNeighbours }, { arrayMergeStrategy: 'merge' });
    edit.updateBlock(targetBlock.id, { neighbourConnections: buildingNeighbours }, { arrayMergeStrategy: 'merge' });

    // if (targetPartCategory === 'ceil-slot' && newBlockType.category === 'roofs') {
    //   this.addBlockToSlot.perform(edit, targetBlock.id, targetPartIndex, newBlockType.type);
    // }

    // if (targetPartCategory === 'floor-slot' && newBlockType.category === 'home-electrics') {
    //   this.addBlockToPointerPos.perform(edit, targetBlock.id, targetPartIndex, newBlockType.type, clientX, clientY);
    // }
  }

  private addBlockToSlot: AddBlockToSlot;

  private updateService: TransactionService;
}

export default AddWallBlock;
