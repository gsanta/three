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
    const { selectedBlockName, blocks } = this.store.getState().blockSettings.present;
    const selectedBlock = blocks.find((block) => block.name === selectedBlockName);

    if (!selectedBlock) {
      return;
    }

    this.blockFactory.create(selectedBlock, { position: [pos.x, pos.y, pos.z] });
    // this.store.dispatch(addMeshes([MeshCreator.create(selectedBlock, { position: [pos.x, pos.y, pos.z] })]));
  }

  private blockFactory: BlockService;
}

export default AddTool;
