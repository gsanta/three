import { Store } from '@/common/utils/store';
import Tool from '../../../services/tool/service/Tool';
import ToolName from '../../../services/tool/state/ToolName';
import { setSelectedMeshes, update } from '../../../services/scene/blocksSlice';
import Ungroup from './Ungroup';
import Group from './Group';

class GroupTool extends Tool {
  constructor(store: Store) {
    super(store, ToolName.Group);

    this.showOnToolbar = false;
  }

  group() {
    const { blocks } = this.store.getState().blockSettings.present;
    const {
      blocks: meshes,
      rootBlocksIds: roots,
      selectedBlockIds: selectedMeshIds,
    } = this.store.getState().blocks.present;

    const ungroup = new Ungroup(selectedMeshIds, roots, meshes);
    const { roots: ungroupedRoots, meshes: ungroupedMeshes, ungroupedIds } = ungroup.execute();

    const group = new Group(blocks, ungroupedIds, ungroupedRoots, ungroupedMeshes);
    const { roots: groupedRoots, meshes: groupedMeshes, newGroup } = group.execute();

    this.store.dispatch(
      update({
        rootBlocksIds: groupedRoots,
        blocks: groupedMeshes,
      }),
    );

    this.store.dispatch(setSelectedMeshes([newGroup.id]));
  }

  ungroup() {
    const {
      blocks: meshes,
      rootBlocksIds: roots,
      selectedBlockIds: selectedMeshIds,
    } = this.store.getState().blocks.present;

    const ungroup = new Ungroup(selectedMeshIds, roots, meshes);
    const { roots: ungroupedRoots, meshes: ungroupedMeshes } = ungroup.execute();

    this.store.dispatch(
      update({
        rootBlocksIds: ungroupedRoots,
        blocks: ungroupedMeshes,
      }),
    );
  }
}

export default GroupTool;
