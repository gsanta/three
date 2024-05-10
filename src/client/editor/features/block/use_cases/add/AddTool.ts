import ToolStore from '../../../tool/ToolStore';
import Tool, { ToolInfo } from '../../../tool/service/Tool';
import ToolName from '../../../tool/state/ToolName';
import BlockStore from '../../BlockStore';
import UpdateService from '../../services/update/UpdateService';
import SceneStore from '../../../scene/SceneStore';
import AddTemplateToSlot from './AddToSlot';

class AddTool extends Tool {
  constructor(blockStore: BlockStore, sceneStore: SceneStore, toolStore: ToolStore, update: UpdateService) {
    super(blockStore, update, ToolName.Add, 'BiPlus');

    this.toolStore = toolStore;
    this.updateService = update;

    this.addTemplateToSlot = new AddTemplateToSlot(blockStore, sceneStore);
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

  private addTemplateToSlot: AddTemplateToSlot;
}

export default AddTool;
