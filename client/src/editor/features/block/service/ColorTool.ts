import { Store } from '@/common/utils/store';
import { updateMesh } from '@/editor/services/scene/sceneSlice';
import Tool, { ToolInfo } from '@/editor/services/tool/service/Tool';
import ToolName from '@/editor/services/tool/state/ToolName';
import SceneService from '@/editor/services/scene/SceneService';
import { colorToArray } from '@/editor/services/tool/colorUtils';

class ColorTool extends Tool {
  constructor(store: Store, scene: SceneService) {
    super(store, ToolName.Color);

    this.scene = scene;
  }

  onPointerDown({ eventObjectName }: ToolInfo) {
    const { meshes } = this.store.getState().scene.present;
    const mesh = meshes[eventObjectName];

    if (!mesh) {
      return;
    }

    this.store.dispatch(
      updateMesh({
        ...mesh,
        color: colorToArray(this.store.getState().block.present.color),
      }),
    );
  }

  private scene: SceneService;
}

export default ColorTool;
