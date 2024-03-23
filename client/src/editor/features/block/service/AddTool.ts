import { Store } from '../../../../common/utils/store';
import Tool, { ToolInfo } from '../../../services/tool/service/Tool';
import { addMesh } from '../../../services/scene/sceneSlice';
import ToolName from '../../../services/tool/state/ToolName';
import MeshCreator from './MeshCreator';

class AddTool extends Tool {
  constructor(store: Store) {
    super(store, ToolName.Add, 'BiPlus');
  }

  onPointerDown({ pos }: ToolInfo) {
    const { selectedBlockName, blocks } = this.store.getState().block.present;
    const selectedBlock = blocks.find((block) => block.data.name === selectedBlockName);

    if (!selectedBlock) {
      return;
    }

    this.store.dispatch(addMesh(MeshCreator.create(selectedBlock, { position: [pos.x, pos.y, pos.z] })));
  }
}

export default AddTool;
