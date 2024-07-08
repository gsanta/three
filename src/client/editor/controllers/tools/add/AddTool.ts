import { ToolInfo } from '../../../types/Tool';
import ToolName from '../../../types/ToolName';
import BlockStore from '../../../stores/block/BlockStore';
import TransactionService from '../../../services/transaction/TransactionService';
import SceneStore from '../../../components/scene/SceneStore';
import AddBlock from '../../../use_cases/add/AddBlock';
import FactoryService from '../../../services/factory/FactoryService';
import HoverTool from '../HoverTool';
import SceneService from '../../../components/scene/service/SceneService';
import AddBlockToSlot from '../../../use_cases/block/AddBlockToSlot';
import AddSlotToSlot from '../../../use_cases/block/AddSlotToSlot';
import AddBlockToPointerPos from '../../../use_cases/block/AddBlockToPointerPos';
import GetAddBlockStrategy from './GetAddBlockStrategy';

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

    this.addBlock = new AddBlock(blockStore, factoryService, sceneStore, update);

    this.addBlockToSlot = new AddBlockToSlot(blockStore, factoryService, sceneStore, update);
    this.addSlotToSlot = new AddSlotToSlot(blockStore, factoryService, sceneStore, update);
    this.addBlockToPointerPos = new AddBlockToPointerPos(blockStore, factoryService, sceneService, sceneStore, update);

    this.getAddBlockStrategy = new GetAddBlockStrategy();
  }

  onPointerUp({ clientX, clientY, pos }: ToolInfo) {
    const { selectedBlockName } = this.blockStore.getBlockSettings();
    const blockType = this.blockStore.getBlockType(selectedBlockName);

    if (!selectedBlockName || !blockType) {
      return;
    }

    const hovered = this.blockStore.getHovered();

    const applyPosition = this.getAddBlockStrategy.getStrategy({
      targetBlock: hovered?.block ? this.blockStore.getBlock(hovered?.block) : undefined,
      targetPartIndex: hovered?.partIndex,
      newBlockType: blockType,
    });

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

  private addBlock: AddBlock;

  private executeAfterRender = false;

  private addBlockToSlot: AddBlockToSlot;

  private addSlotToSlot: AddSlotToSlot;

  private addBlockToPointerPos: AddBlockToPointerPos;

  private getAddBlockStrategy: GetAddBlockStrategy;
}

export default AddTool;
