import { Store } from '../../common/utils/store';
import { setSelectedMesh } from '../scene/sceneSlice';
import Tool, { PointerInfo } from '../tool/state/Tool';
import ToolName from '../tool/state/ToolName';

class SelectTool extends Tool {
  constructor(store: Store) {
    super(store, ToolName.Select, 'BiRectangle');
  }

  onPointerDown(info: PointerInfo) {
    const { meshes } = this.store.getState().scene;

    const mesh = meshes.find((m) => m.id === info.eventObjectName);

    if (mesh) {
      this.store.dispatch(setSelectedMesh(mesh));
    }
  }
}

export default SelectTool;
