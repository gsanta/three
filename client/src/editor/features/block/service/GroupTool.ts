import { Store } from '@/common/utils/store';
import Tool from '../../../services/tool/service/Tool';
import ToolName from '../../../services/tool/state/ToolName';
import { setSelectedMeshes, update } from '../../../services/scene/sceneSlice';
import { getBlock } from '../utils/blockUtils';
import { v4 as uuidv4 } from 'uuid';
import MeshData from '@/editor/types/MeshData';

class GroupTool extends Tool {
  constructor(store: Store) {
    super(store, ToolName.Join);
  }

  execute() {
    const { blocks } = this.store.getState().block.present;
    const { meshes, roots, selectedMeshIds } = this.store.getState().scene.present;

    const finalMeshIds: string[] = [];
    const groupsToRemove: string[] = [];

    selectedMeshIds.forEach((meshId) => {
      if (meshes[meshId].name === 'group') {
        finalMeshIds.push(...meshes[meshId].children);
        groupsToRemove.push(meshId);
      } else {
        finalMeshIds.push(meshId);
      }
    });

    const groupBlock = getBlock(blocks, 'group');

    const groupId = uuidv4();

    const newRoots = roots.filter((root) => !groupsToRemove.includes(root));
    const newMeshes = { ...meshes };
    groupsToRemove.map((group) => delete newMeshes[group]);

    const newGroup: MeshData = {
      ...groupBlock.data,
      id: groupId,
      position: [0, 0, 0],
      children: finalMeshIds,
    };

    newMeshes[newGroup.id] = newGroup;
    newRoots.push(newGroup.id);

    this.store.dispatch(
      update({
        roots: newRoots,
        meshes: newMeshes,
      }),
    );

    this.store.dispatch(setSelectedMeshes([groupId]));
  }
}

export default GroupTool;
