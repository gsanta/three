import { ToolInfo } from '../../../models/Tool';
import ToolName from '../../../models/ToolName';
import TransactionService from '../../../services/transaction/TransactionService';
import HoverTool from '../HoverTool';
import SceneService from '../../../components/scene/service/SceneService';
import AddService from './AddService';
import { store } from '@/client/common/utils/store';
import BlockData from '@/client/editor/data/BlockData';
import BlockConstantData from '@/client/editor/data/BlockConstantData';
import Num3 from '@/client/editor/models/Num3';
import ExecuteAddParams from './ExecuteAddParams';
import BlockStore from '@/client/editor/stores/block/BlockStore';

class AddTool extends HoverTool {
  constructor(addService: AddService, block: BlockStore, sceneService: SceneService, update: TransactionService) {
    super(block, sceneService, update, ToolName.Add, 'BiPlus');

    // this.addBlockToPlain = new AddBlockToPlain(blockStore, factoryService, sceneStore, update);

    this.addService = addService;
  }

  onPointerUp({ clientX, clientY, gridIndex, pos }: ToolInfo) {
    const { selectedBlockName } = this.blockStore.getBlockSettings();

    const activeGridIndexes = store.getState().editor.activeGridIndexes;

    // if (gridIndex && !activeGridIndexes.includes(gridIndex)) {
    //   return;
    // }

    if (!selectedBlockName) {
      return;
    }

    const hovered = this.blockStore.getHovered();
    const targetBlockId = hovered?.block;
    const targetPartIndex = hovered?.partIndex;

    const targetBlock = targetBlockId ? this.blockStore.getBlock(targetBlockId) : undefined;

    const newBlockType = this.blockStore.getBlockType(selectedBlockName);

    this.clientX = clientX;
    this.clientY = clientY;
    this.targetBlock = targetBlock;
    this.targetPartIndex = targetPartIndex;
    this.newBlockType = newBlockType;
    this.position = pos.toArray();

    // edit.commit();
    this.newBlockCategory = newBlockType.category;

    this.executeAdd('render');

    this.runAfterRender = true;

    // if (selectedBlockName === 'house') {
    //   const newBlockType = this.blockStore.getBlockType('building-base-1');

    //   this.addHouse.add({
    //     clientX,
    //     clientY,
    //     targetBlock,
    //     targetPartIndex,
    //     newBlockType,
    //     position: pos.toArray(),
    //   });
    //   this.newBlockCategory = newBlockType.category;
    //   this.current = this.addHouse;
    // } else {
    // }

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

      if (this.runAfterRender) {
        this.executeAdd('afterRender');
      }
    } finally {
      this.newBlockCategory = undefined;
      this.targetBlockCategory = undefined;

      this.runAfterRender = false;
    }
  }

  private executeAdd(phase: ExecuteAddParams['executionPhase']) {
    if (this.newBlockType && this.position) {
      this.addService.execute({
        executionPhase: phase,
        clientX: this.clientX,
        clientY: this.clientY,
        targetBlock: this.targetBlock,
        targetPartIndex: this.targetPartIndex,
        newBlockType: this.newBlockType,
        position: this.position,
      });
    }
  }

  private runAfterRender = false;

  private clientX = 0;

  private clientY = 0;

  private targetBlock?: BlockData;

  private targetPartIndex?: string;

  private newBlockType?: BlockConstantData;

  private position?: Num3;

  private current?: { performAfterRender(id: string): boolean };

  private newBlockCategory: string | undefined;

  private targetBlockCategory: string | undefined;

  private addService: AddService;
}

export default AddTool;
