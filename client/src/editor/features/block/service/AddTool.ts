import { Store } from '../../../../common/utils/store';
import Tool, { ToolInfo } from '../../../services/tool/service/Tool';
import ToolName from '../../../services/tool/state/ToolName';
import UpdateService from './UpdateService';

class AddTool extends Tool {
  constructor(store: Store, updateService: UpdateService) {
    super(store, ToolName.Add, 'BiPlus');

    this.updateService = updateService;
  }

  onPointerDown({ pos }: ToolInfo) {
    const { selectedBlockName } = this.store.getState().blockSettings.present;

    if (!selectedBlockName) {
      return;
    }

    this.updateService
      .getUpdate()
      .create(selectedBlockName, { position: [pos.x, pos.y, pos.z] })
      .execute();
  }

  private updateService: UpdateService;
}

export default AddTool;
