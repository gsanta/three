import { Store } from '../../../common/utils/store';
import Tool, { ToolInfo } from '../tool/state/Tool';
import { addMesh } from '../scene/sceneSlice';
import ToolName from '../tool/state/ToolName';
import { v4 as uuidv4 } from 'uuid';
import { addVector, multiplyVector, snapTo } from '@/editor/utils/vectorUtils';
import { toRadian } from '@/editor/utils/mathUtils';
import Num3 from '@/editor/types/Num3';

class AddTool extends Tool {
  constructor(store: Store) {
    super(store, ToolName.Add, 'BiPlus');
  }

  onPointerDown({ pos }: ToolInfo) {
    const { selectedBlockName, blocks } = this.store.getState().builder.present;
    const selectedBlock = blocks.find((block) => block.data.name === selectedBlockName);

    if (!selectedBlock) {
      return;
    }

    const { rotation: rotationData, position: positionData } = selectedBlock.data;
    const { size: sizeOption } = selectedBlock.options;
    const { rotation: rotationOption } = selectedBlock.selected;
    const scale = multiplyVector(selectedBlock.data.scale, sizeOption.selected, sizeOption.direction);

    const x = snapTo(pos.x + scale[0] / 2) - scale[0] / 2;
    const z = snapTo(pos.z + scale[2] / 2) - scale[2] / 2;
    const y = pos.y + positionData[1] + selectedBlock.data.scale[1] / 2;
    const rotation = addVector(rotationOption, rotationData).map((degree) => toRadian(degree));

    this.store.dispatch(
      addMesh({
        ...selectedBlock.data,
        id: uuidv4(),
        name: selectedBlockName,
        position: [x, y, z],
        rotation: rotation as Num3,
        scale: scale,
        children: [],
      }),
    );
  }
}

export default AddTool;
