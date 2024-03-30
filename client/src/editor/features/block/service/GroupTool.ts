import { Store } from '@/common/utils/store';
import Tool from '../../../services/tool/service/Tool';
import ToolName from '../../../services/tool/state/ToolName';
import { setSelectedMeshes, update } from '../../../services/scene/sceneSlice';
import Ungroup from './Ungroup';
import Group from './Group';

class GroupTool extends Tool {
  constructor(store: Store) {
    super(store, ToolName.Group);

    this.showOnToolbar = false;
  }

  group() {
    const { blocks } = this.store.getState().block.present;
    const { meshes, roots, selectedMeshIds } = this.store.getState().scene.present;

    const ungroup = new Ungroup(selectedMeshIds, roots, meshes);
    const { roots: ungroupedRoots, meshes: ungroupedMeshes, ungroupedIds } = ungroup.execute();

    const group = new Group(blocks, ungroupedIds, ungroupedRoots, ungroupedMeshes);
    const { roots: groupedRoots, meshes: groupedMeshes, newGroup } = group.execute();

    this.store.dispatch(
      update({
        roots: groupedRoots,
        meshes: groupedMeshes,
      }),
    );

    this.store.dispatch(setSelectedMeshes([newGroup.id]));
  }

  ungroup() {
    const { meshes, roots, selectedMeshIds } = this.store.getState().scene.present;

    const ungroup = new Ungroup(selectedMeshIds, roots, meshes);
    const { roots: ungroupedRoots, meshes: ungroupedMeshes } = ungroup.execute();

    this.store.dispatch(
      update({
        roots: ungroupedRoots,
        meshes: ungroupedMeshes,
      }),
    );
  }
}

export default GroupTool;
