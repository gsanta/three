import { Store } from '../../../common/utils/store';
import Tool, { PointerInfo } from '../tool/state/Tool';
import { addMesh } from '../scene/sceneSlice';
import ToolName from '../tool/state/ToolName';
import { v4 as uuidv4 } from 'uuid';
import { multiplyVector, snapTo } from '@/editor/utils/vectorUtils';
import { toRadian } from '@/editor/utils/mathUtils';
import Num3 from '@/editor/types/Num3';

class AddTool extends Tool {
  constructor(store: Store) {
    super(store, ToolName.Add, 'BiPlus');
  }

  onPointerDown({ pos }: PointerInfo) {
    const { selectedBlockName: selectedBlockType, blocks } = this.store.getState().builder.present;
    const selectedBlock = blocks.find((block) => block.data.name === selectedBlockType);

    if (!selectedBlock) {
      return;
    }

    const sizeOption = selectedBlock.options.size;
    const scale = multiplyVector(selectedBlock.data.scale, sizeOption.selected, sizeOption.direction);

    const x = snapTo(pos.x);
    const z = snapTo(pos.z);
    const rotation = selectedBlock.options.rotation.selected.map((degree) => toRadian(degree));

    this.store.dispatch(
      addMesh({
        ...selectedBlock.data,
        id: uuidv4(),
        name: selectedBlockType,
        position: [x, pos.y + selectedBlock.data.scale[1] / 2, z],
        rotation: rotation as Num3,
        scale: scale,
      }),
    );
  }
}

export default AddTool;
