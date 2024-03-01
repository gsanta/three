import { Store } from '../../../common/utils/store';
import Tool, { PointerInfo } from '../tool/state/Tool';
import { addMesh } from '../scene/sceneSlice';
import ToolName from '../tool/state/ToolName';
import { v4 as uuidv4 } from 'uuid';

class AddTool extends Tool {
  constructor(store: Store) {
    super(store, ToolName.Add, 'BiPlus');
  }

  onPointerDown({ pos }: PointerInfo) {
    const { selectedBlockName: selectedBlockType, blocks } = this.store.getState().builder;
    const selectedBlock = blocks.find((block) => block.name === selectedBlockType);
    this.store.dispatch(
      addMesh({
        id: uuidv4(),
        type: selectedBlockType,
        position: [pos.x, pos.y, pos.z],
        rotation: [0, 0, 0],
        scale: selectedBlock?.scale as [number, number, number],
      }),
    );
  }
}

export default AddTool;
