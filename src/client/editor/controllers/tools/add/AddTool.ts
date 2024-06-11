import { ToolInfo } from '../../../types/Tool';
import ToolName from '../../../types/ToolName';
import BlockStore from '../../../stores/block/BlockStore';
import TransactionService from '../../../services/transaction/TransactionService';
import SceneStore from '../../../components/scene/SceneStore';
import AddBlock from '../../../use_cases/add/AddBlock';
import FactoryService from '../../../services/factory/FactoryService';
import HoverTool from '../HoverTool';
import SceneService from '../../../components/scene/SceneService';
import AddBlockToSlot from '../../../use_cases/block/AddBlockToSlot';
import AddSlotToSlot from '../../../use_cases/block/AddSlotToSlot';
import AddBlockToPointerPos from '../../../use_cases/block/AddBlockToPointerPos';
import { AddStrategyType } from './AddStrategy';

class AddTool extends HoverTool {
  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneService: SceneService,
    sceneStore: SceneStore,
    update: TransactionService,
  ) {
    super(blockStore, sceneService, sceneStore, update, ToolName.Add, 'BiPlus');

    this.blockStore = blockStore;

    this.addBlock = new AddBlock(blockStore, factoryService, sceneStore, update);

    this.addBlockToSlot = new AddBlockToSlot(blockStore, factoryService, sceneStore, update);
    this.addSlotToSlot = new AddSlotToSlot(blockStore, factoryService, sceneStore, update);
    this.addBlockToPointerPos = new AddBlockToPointerPos(blockStore, factoryService, sceneService, sceneStore, update);
  }

  onPointerDown({ clientX, clientY, pos }: ToolInfo) {
    const { selectedBlockName } = this.store.getBlockSettings();

    if (!selectedBlockName) {
      return;
    }

    const blockType = this.store.getBlockType(selectedBlockName);

    const hovered = this.blockStore.getHovered();

    const applyPosition = this.determineApplyPosition(hovered?.block);

    switch (applyPosition) {
      case 'source-origin-target-plane':
        this.addBlock.perform(pos, selectedBlockName);
        break;
      case 'source-origin-target-pointer-pos':
        this.addBlockToPointerPos.perform(
          hovered?.block || '',
          hovered?.partIndex || '',
          blockType?.type || '',
          clientX,
          clientY,
        );
        break;
      case 'source-slot-target-slot':
        this.addSlotToSlot.perform(hovered?.block || '', hovered?.partIndex || '', selectedBlockName);
        break;
      case 'source-origin-target-slot':
        this.addBlockToSlot.perform(hovered?.block || '', hovered?.partIndex || '', selectedBlockName);
        break;
    }

    this.executeAfterRender = true;
  }

  onRendered() {
    try {
      this.addBlock.performAfterRender();
    } finally {
      this.executeAfterRender = false;
    }
  }

  private determineApplyPosition(targetBlockId?: string): AddStrategyType {
    if (!targetBlockId) {
      return 'source-origin-target-plane';
    }

    const block = this.blockStore.getBlock(targetBlockId);
    if (block.category === 'roads') {
      return 'source-slot-target-slot';
    } else if (block.category === 'roofs') {
      return 'source-origin-target-pointer-pos';
    }
    return 'source-origin-target-slot';
  }

  private blockStore: BlockStore;

  private addBlock: AddBlock;

  private executeAfterRender = false;

  private addBlockToSlot: AddBlockToSlot;

  private addSlotToSlot: AddSlotToSlot;

  private addBlockToPointerPos: AddBlockToPointerPos;
}

export default AddTool;
