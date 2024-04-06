import { Store } from '@/common/utils/store';
import { update } from '@/editor/services/scene/blocksSlice';
import Tool, { ToolInfo } from '@/editor/services/tool/service/Tool';
import ToolName from '@/editor/services/tool/state/ToolName';

class EraseTool extends Tool {
  constructor(store: Store) {
    super(store, ToolName.Erase);
  }

  onPointerDown({ eventObjectName }: ToolInfo) {
    const {
      rootBlocksIds: roots,
      blocks: meshes,
      selectedBlockIds: selectedMeshIds,
    } = this.store.getState().blocks.present;

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
        blocks: newMeshes,
        rootBlocksIds: newRoots,
        selectedBlockIds: newSelectedMeshIds,
      }),
    );
  }
}

export default EraseTool;
