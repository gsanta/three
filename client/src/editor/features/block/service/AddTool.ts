import { Store } from '../../../../common/utils/store';
import Tool, { ToolInfo } from '../../../services/tool/service/Tool';
import ToolName from '../../../services/tool/state/ToolName';
import BlockService from './BlockService';

class AddTool extends Tool {
  constructor(store: Store, blockFactory: BlockService) {
    super(store, ToolName.Add, 'BiPlus');

    this.blockFactory = blockFactory;
  }

  onPointerDown({ pos }: ToolInfo) {
    const { selectedBlockName } = this.store.getState().blockSettings.present;

    if (!selectedBlockName) {
      return;
    }

    this.blockFactory.create(selectedBlockName, { position: [pos.x, pos.y, pos.z] });
  }

  private blockFactory: BlockService;
}

export default AddTool;
