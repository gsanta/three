import { Store } from '@/common/utils/store';
import Tool from '../tool/state/Tool';
import ToolName from '../tool/state/ToolName';
import { groupMeshes } from '../scene/sceneSlice';
import { getBlock } from './utils/blockUtils';
import { v4 as uuidv4 } from 'uuid';
import { setSelectedMeshes } from './builderSlice';

class GroupTool extends Tool {
  constructor(store: Store) {
    super(store, ToolName.Join);
  }

  execute() {
    const { selectedMeshIds } = this.store.getState().builder.present;
    const { blocks } = this.store.getState().builder.present;

    const groupBlock = getBlock(blocks, 'group');

    const groupId = uuidv4();

    this.store.dispatch(
      groupMeshes({
        children: selectedMeshIds || [],
        parent: {
          ...groupBlock.data,
          id: groupId,
          position: [0, 0, 0],
          children: selectedMeshIds || [],
        },
      }),
    );

    this.store.dispatch(setSelectedMeshes([groupId]));
  }
}

export default GroupTool;
