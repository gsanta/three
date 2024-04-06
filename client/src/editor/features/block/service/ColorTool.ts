import { Store } from '@/common/utils/store';
import { updateMesh } from '@/editor/services/scene/blocksSlice';
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
    const { blocks: meshes } = this.store.getState().blocks.present;
    const mesh = meshes[eventObjectName];

    if (!mesh) {
      return;
    }

    this.store.dispatch(
      updateMesh({
        ...mesh,
        color: colorToArray(this.store.getState().addBlock.present.color),
      }),
    );
  }

  private scene: SceneService;
}

export default ColorTool;
