import { Store } from '../../../common/utils/store';
import Tool, { PointerInfo } from '../tool/state/Tool';
import { addMesh } from '../scene/sceneSlice';
import ToolName from '../tool/state/ToolName';
import { v4 as uuidv4 } from 'uuid';
import { multiplyVector, snapTo } from '@/editor/utils/vectorUtils';
import { toRadian } from '@/editor/utils/mathUtils';

class AddTool extends Tool {
  constructor(store: Store) {
    super(store, ToolName.Add, 'BiPlus');
  }

  onPointerDown({ pos }: PointerInfo) {
    const { selectedBlockName: selectedBlockType, blocks } = this.store.getState().builder;
    const selectedBlock = blocks.find((block) => block.name === selectedBlockType);

    if (!selectedBlock) {
      return;
    }

    const sizeOption = selectedBlock.options.size;
    const scale = multiplyVector(selectedBlock.scale, sizeOption.selected, sizeOption.direction);

    const x = snapTo(pos.x);
    const z = snapTo(pos.z);
    const rotation = selectedBlock.options.rotation.selected.map((degree) => toRadian(degree));

    this.store.dispatch(
      addMesh({
        id: uuidv4(),
        type: selectedBlockType,
        position: [x, pos.y + selectedBlock.scale[1] / 2, z],
        rotation: rotation,
        scale: scale,
      }),
    );
  }
}

export default AddTool;
