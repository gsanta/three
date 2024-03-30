import { Store } from '@/common/utils/store';
import { update } from '@/editor/services/scene/sceneSlice';
import Tool, { ToolInfo } from '@/editor/services/tool/service/Tool';
import ToolName from '@/editor/services/tool/state/ToolName';

class EraseTool extends Tool {
  constructor(store: Store) {
    super(store, ToolName.Erase);
  }

  onPointerDown({ eventObjectName }: ToolInfo) {
    const { roots, meshes, selectedMeshIds } = this.store.getState().scene.present;

    const mesh = meshes[eventObjectName];

    const newMeshes = { ...meshes };
    let newRoots = [...roots];
    let newSelectedMeshIds = [...selectedMeshIds];

    if (mesh) {
      delete newMeshes[mesh.id];
      newRoots = newRoots.filter((root) => root !== mesh.id);
      newSelectedMeshIds = newSelectedMeshIds.filter((id) => id !== mesh.id);
    }

    this.store.dispatch(
      update({
        meshes: newMeshes,
        roots: newRoots,
        selectedMeshIds: newSelectedMeshIds,
      }),
    );
  }
}

export default EraseTool;
