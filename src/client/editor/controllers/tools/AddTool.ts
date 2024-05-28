import ToolStore from '../../stores/tool/ToolStore';
import Tool, { ToolInfo } from '../../types/Tool';
import ToolName from '../../types/ToolName';
import BlockStore from '../../stores/block/BlockStore';
import TransactionService from '../../services/update/TransactionService';
import SceneStore from '../../components/scene/SceneStore';
import ApplyTemplateToSlot from '../../use_cases/block/ApplyTemplateToSlot';
import AddBlock from '../../use_cases/add/AddBlock';
import FactoryService from '../../services/factory/FactoryService';

class AddTool extends Tool {
  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneStore: SceneStore,
    toolStore: ToolStore,
    update: TransactionService,
  ) {
    super(blockStore, update, ToolName.Add, 'BiPlus');

    this.toolStore = toolStore;
    this.updateService = update;

    this.addTemplateToSlot = new ApplyTemplateToSlot(blockStore, factoryService, sceneStore);

    this.addBlock = new AddBlock(blockStore, factoryService, sceneStore, update);
  }

  onPointerDown({ pos }: ToolInfo) {
    this.addBlock.perform(pos);

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

    const edit = this.updateService.getUpdate();
    this.addTemplateToSlot.perform(edit, templateName);
    edit.commit();
  }

  private updateService: TransactionService;

  private toolStore: ToolStore;

  private addTemplateToSlot: ApplyTemplateToSlot;

  private addBlock: AddBlock;

  private executeAfterRender = false;
}

export default AddTool;
