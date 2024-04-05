import { Store } from '../../../../common/utils/store';
import Tool, { ToolInfo } from '../../../services/tool/service/Tool';
import ToolName from '../../../services/tool/state/ToolName';
import BlockFactory from './factory/BlockFactory';

class AddTool extends Tool {
  constructor(store: Store, blockFactory: BlockFactory) {
    super(store, ToolName.Add, 'BiPlus');

    this.blockFactory = blockFactory;
  }

  onPointerDown({ pos }: ToolInfo) {
    const { selectedBlockName, blocks } = this.store.getState().block.present;
    const selectedBlock = blocks.find((block) => block.data.name === selectedBlockName);

    if (!selectedBlock) {
      return;
    }
    this.blockFactory.create(selectedBlock.data.name, pos);
    // this.store.dispatch(addMeshes([MeshCreator.create(selectedBlock, { position: [pos.x, pos.y, pos.z] })]));
  }

  private blockFactory: BlockFactory;
}

export default AddTool;
