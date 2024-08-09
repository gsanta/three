import { ToolInfo } from '../../../types/Tool';
import ToolName from '../../../types/ToolName';
import BlockStore from '../../../stores/block/BlockStore';
import TransactionService from '../../../services/transaction/TransactionService';
import SceneStore from '../../../components/scene/SceneStore';
import FactoryService from '../../../services/factory/FactoryService';
import HoverTool from '../HoverTool';
import SceneService from '../../../components/scene/service/SceneService';
import AddBlock from './AddBlock';
import AddHouse from '@/client/editor/use_cases/add/AddHouse';
import { store } from '@/client/common/utils/store';

class AddTool extends HoverTool {
  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneService: SceneService,
    sceneStore: SceneStore,
    update: TransactionService,
  ) {
    super(blockStore, sceneService, update, ToolName.Add, 'BiPlus');

    this.blockStore = blockStore;

    // this.addBlockToPlain = new AddBlockToPlain(blockStore, factoryService, sceneStore, update);

    this.addBlock = new AddBlock(blockStore, factoryService, sceneService, sceneStore, update);

    this.addHouse = new AddHouse(this.blockStore, factoryService, this.update, this.addBlock);
  }

  onPointerUp({ clientX, clientY, gridIndex, pos }: ToolInfo) {
    const { selectedBlockName } = this.blockStore.getBlockSettings();

    const activeGridIndexes = store.getState().editor.activeGridIndexes;

    if (gridIndex && !activeGridIndexes.includes(gridIndex)) {
      return;
    }

    if (!selectedBlockName) {
      return;
    }

    const hovered = this.blockStore.getHovered();
    const targetBlockId = hovered?.block;
    const targetPartIndex = hovered?.partIndex;

    const targetBlock = targetBlockId ? this.blockStore.getBlock(targetBlockId) : undefined;

    if (selectedBlockName === 'house') {
      const newBlockType = this.blockStore.getBlockType('building-base-1');

      this.addHouse.add({
        clientX,
        clientY,
        targetBlock,
        targetPartIndex,
        newBlockType,
        position: pos.toArray(),
      });
      this.newBlockCategory = newBlockType.category;
      this.current = this.addHouse;
    } else {
      const newBlockType = this.blockStore.getBlockType(selectedBlockName);

      const selectedAddBlock = this.addBlock.getAddBlock(newBlockType.category, targetBlock?.category || 'plain');

      const edit = this.update.createTransaction();

      selectedAddBlock?.perform({
        edit,
        clientX,
        clientY,
        targetBlock,
        targetPartIndex,
        newBlockType,
        position: pos.toArray(),
      });

      edit.commit();
      this.newBlockCategory = newBlockType.category;
    }

    this.targetBlockCategory = targetBlock?.category || 'plain';

    // if (!targetBlockId || !this.addToBlock[this.blockStore.getBlock(targetBlockId).category]) {
    //   const applyPosition = this.getAddBlockStrategy.getStrategy({
    //     targetBlock: hovered?.block ? this.blockStore.getBlock(hovered?.block) : undefined,
    //     targetPartIndex: hovered?.partIndex,
    //     newBlockType: blockType,
    //   });

    //   const edit = this.update.getTransaction();

    //   switch (applyPosition) {
    //     case 'source-origin-target-plane':
    //       this.addBlockToPlain.perform(edit, pos, selectedBlockName);
    //       break;
    //     case 'source-origin-target-pointer-pos':
    //       this.addBlockToPointerPos.perform(
    //         edit,
    //         hovered?.block || '',
    //         hovered?.partIndex || '',
    //         blockType?.type || '',
    //         clientX,
    //         clientY,
    //       );
    //       break;
    //     case 'source-slot-target-slot':
    //       this.addSlotToSlot.perform(hovered?.block || '', hovered?.partIndex || '', selectedBlockName);
    //       break;
    //     case 'source-origin-target-slot':
    //       this.addBlockToSlot.perform(edit, hovered?.block || '', hovered?.partIndex || '', selectedBlockName);
    //       break;
    //   }

    //   edit.commit();
    // } else {
    //   const targetBlock = this.blockStore.getBlock(targetBlockId);
    //   this.addToBlock[targetBlock.category].perform(targetBlock, hovered?.partIndex, blockType, clientX, clientY);
    // }
  }

  onRendered() {
    try {
      // if (this.current) {
      //   const stay = this.current.performAfterRender(id);

      //   if (!stay) {
      //     this.current = undefined;
      //   }
      // }

      if (this.newBlockCategory && this.targetBlockCategory) {
        if (this.newBlockCategory === 'building-bases') {
          this.addHouse.performAfterRender();
        } else {
          // const selectedAddBlock = this.addBlock.getAddBlock(this.newBlockCategory, this.targetBlockCategory);
          // selectedAddBlock?.performAfterRender();
        }
      }
    } finally {
      this.newBlockCategory = undefined;
      this.targetBlockCategory = undefined;
    }
  }

  private current?: { performAfterRender(id: string): boolean };

  private newBlockCategory: string | undefined;

  private targetBlockCategory: string | undefined;

  private addHouse: AddHouse;

  private addBlock: AddBlock;
}

export default AddTool;
