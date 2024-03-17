import { Store } from '@/common/utils/store';
import Tool from '../tool/state/Tool';
import ToolName from '../tool/state/ToolName';
import { groupMeshes, update } from '../scene/sceneSlice';
import { getBlock } from './utils/blockUtils';
import { v4 as uuidv4 } from 'uuid';
import { setSelectedMeshes } from './builderSlice';
import MeshInfo from '@/editor/types/MeshInfo';

class GroupTool extends Tool {
  constructor(store: Store) {
    super(store, ToolName.Join);
  }

  execute() {
    const { selectedMeshIds, blocks } = this.store.getState().builder.present;
    const { meshes, roots } = this.store.getState().scene.present;

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

    const newGroup: MeshInfo = {
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
