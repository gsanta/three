import ToolStore from '../../stores/tool/ToolStore';
import Tool, { ToolInfo } from '../../types/Tool';
import ToolName from '../../types/ToolName';
import BlockStore from '../../stores/block/BlockStore';
import UpdateService from '../../services/update/UpdateService';
import SceneStore from '../../components/scene/SceneStore';
import ApplyTemplateToSlot from '../../use_cases/block/ApplyTemplateToSlot';

class AddTool extends Tool {
  constructor(blockStore: BlockStore, sceneStore: SceneStore, toolStore: ToolStore, update: UpdateService) {
    super(blockStore, update, ToolName.Add, 'BiPlus');

    this.toolStore = toolStore;
    this.updateService = update;

    this.addTemplateToSlot = new ApplyTemplateToSlot(blockStore, sceneStore);
  }

  onPointerDown({ pos }: ToolInfo) {
    const { selectedBlockName } = this.store.getBlockSettings();

    if (!selectedBlockName) {
      return;
    }

    this.updateService
      .getUpdate()
      .create(selectedBlockName, { position: [pos.x, pos.y, pos.z] })
      .commit();
  }

  addToSlot() {
    const { templateName } = this.toolStore.getSelectOptions();

    const edit = this.updateService.getUpdate();
    this.addTemplateToSlot.perform(edit, templateName);
    edit.commit();
  }

  private updateService: UpdateService;

  private toolStore: ToolStore;

  private addTemplateToSlot: ApplyTemplateToSlot;
}

export default AddTool;
