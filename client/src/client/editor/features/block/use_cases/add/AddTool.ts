import Tool, { ToolInfo } from '../../../tool/service/Tool';
import ToolName from '../../../tool/state/ToolName';
import BlockStore from '../../BlockStore';
import UpdateService from '../../services/update/UpdateService';

class AddTool extends Tool {
  constructor(store: BlockStore, update: UpdateService) {
    super(store, update, ToolName.Add, 'BiPlus');

    this.updateService = update;
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

  private updateService: UpdateService;
}

export default AddTool;
