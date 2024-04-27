import Tool, { ToolInfo } from '../../../services/tool/service/Tool';
import ToolName from '../../../services/tool/state/ToolName';
import BlockStore from './BlockStore';
import UpdateService from './UpdateService';

class AddTool extends Tool {
  constructor(store: BlockStore, updateService: UpdateService) {
    super(store, ToolName.Add, 'BiPlus');

    this.updateService = updateService;
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
