import ToolStore from '../../stores/tool/ToolStore';
import { ToolInfo } from '../../types/Tool';
import ToolName from '../../types/ToolName';
import BlockStore from '../../stores/block/BlockStore';
import TransactionService from '../../services/transaction/TransactionService';
import SceneStore from '../../components/scene/SceneStore';
import AddBlock from '../../use_cases/add/AddBlock';
import FactoryService from '../../services/factory/FactoryService';
import HoverTool from './HoverTool';
import SceneService from '../../components/scene/SceneService';
import AddBlockToSlot from '../../use_cases/block/AddBlockToSlot';
import AddSlotToSlot from '../../use_cases/block/AddSlotToSlot';
import AddBlockToPointerPos from '../../use_cases/block/AddBlockToPointerPos';

type ApplyPosition =
  | 'source-origin-target-slot'
  | 'source-origin-target-pointer-pos'
  | 'source-slot-target-slot'
  | 'source-origin-target-plane';

class AddTool extends HoverTool {
  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneService: SceneService,
    sceneStore: SceneStore,
    toolStore: ToolStore,
    update: TransactionService,
  ) {
    super(blockStore, sceneService, sceneStore, update, ToolName.Add, 'BiPlus');

    this.blockStore = blockStore;

    this.toolStore = toolStore;
    this.updateService = update;

    this.addTemplateToSlot = new ApplyTemplateToSlot(blockStore, factoryService, sceneStore);

    this.addBlock = new AddBlock(blockStore, factoryService, sceneStore, update);

    this.addBlockToSlot = new AddBlockToSlot(blockStore, factoryService, sceneStore);
    this.addSlotToSlot = new AddSlotToSlot(blockStore, factoryService, sceneStore);
    this.addBlockToPointerPos = new AddBlockToPointerPos(blockStore, factoryService, sceneService, sceneStore);
  }

  onPointerDown({ clientX, clientY, pos }: ToolInfo) {
    const { selectedBlockName } = this.store.getBlockSettings();

    if (!selectedBlockName) {
      return;
    }

    const template = this.store.getTemplateByName(selectedBlockName);

    const hovered = this.blockStore.getHovered();

    const applyPosition = this.determineApplyPosition(hovered?.block);

    if (applyPosition === 'source-origin-target-pointer-pos') {
      const edit = this.update.getTransaction();
      this.addBlockToPointerPos.perform(
        edit,
        hovered?.block || '',
        hovered?.partIndex || '',
        template?.name || '',
        clientX,
        clientY,
      );
      edit.commit();
    } else if (applyPosition === 'source-origin-target-plane') {
      this.addBlock.perform(pos);
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

  addToSlot() {
    const { templateName } = this.toolStore.getSelectOptions();

    const partIndexes = this.blockStore.getSelectedPartIndexes();

    const blockId = Object.keys(partIndexes)[0];
    const partIndex = partIndexes[blockId][0];

    const edit = this.updateService.getTransaction();
    const applyPosition = this.determineApplyPosition(blockId);

    if (applyPosition === 'source-slot-target-slot') {
      this.addSlotToSlot.perform(edit, blockId, partIndex, templateName);
    } else if (applyPosition === 'source-origin-target-pointer-pos') {
    } else {
      this.addBlockToSlot.perform(edit, blockId, partIndex, templateName);
    }

    edit.commit();
  }

  private determineApplyPosition(targetBlockId?: string): ApplyPosition {
    if (!targetBlockId) {
      return 'source-origin-target-plane';
    }

    const block = this.blockStore.getBlock(targetBlockId);
    if (block.type === 'roads') {
      return 'source-slot-target-slot';
    } else if (block.type === 'roofs') {
      return 'source-origin-target-pointer-pos';
    }
    return 'source-origin-target-slot';
  }

  private blockStore: BlockStore;

  private updateService: TransactionService;

  private toolStore: ToolStore;

  private addBlock: AddBlock;

  private executeAfterRender = false;

  private addBlockToSlot: AddBlockToSlot;

  private addSlotToSlot: AddSlotToSlot;

  private addBlockToPointerPos: AddBlockToPointerPos;
}

export default AddTool;
