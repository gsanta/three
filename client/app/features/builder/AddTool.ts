import { Store } from '@/common/utils/store';
import Tool, { PointerInfo } from '../tool/state/Tool';
import { addMesh } from '../scene/sceneSlice';
import ToolName from '../tool/state/ToolName';

class AddTool extends Tool {
  constructor(store: Store) {
    super(store, ToolName.Add, 'BiPlus');
  }

  onClick(info: PointerInfo) {
    const { selectedGeometry } = this.store.getState().builder;
    this.store.dispatch(addMesh({ name: selectedGeometry, position: [info.x, info.y, info.z] }));
  }
}

export default AddTool;
