import { Store } from '../../../common/utils/store';
import Tool, { PointerInfo } from '../tool/state/Tool';
import { addMesh } from '../scene/sceneSlice';
import ToolName from '../tool/state/ToolName';
import { v4 as uuidv4 } from 'uuid';

class AddTool extends Tool {
  constructor(store: Store) {
    super(store, ToolName.Add, 'BiPlus');
  }

  onPointerDown({ pos }: PointerInfo) {
    const { selectedGeometry } = this.store.getState().builder;
    this.store.dispatch(
      addMesh({ id: uuidv4(), type: selectedGeometry, position: [pos.x, pos.y, pos.z], scale: [1, 1, 1] }),
    );
  }
}

export default AddTool;
