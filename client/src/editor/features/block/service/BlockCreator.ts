import BlockData from '@/editor/types/BlockData';
import { toRadian } from '@/editor/utils/mathUtils';
import { addVector, multiplyVector, snapTo } from '@/editor/utils/vectorUtils';
import { v4 as uuidv4 } from 'uuid';
import Num3 from '@/editor/types/Num3';
import Block from '@/editor/types/Block';

class BlockCreator {
  static create(block: BlockData, options: Partial<Block> = {}): Block {
    const { position: pos = [0, 0, 0], ...rest } = options;

    const { rotation: rotationData, position: positionData } = block.data;
    const { size: sizeOption } = block.options;
    const { rotation: rotationOption } = block.selected;
    const scale = multiplyVector(block.data.scale, sizeOption.selected, sizeOption.direction);

    const x = snapTo(pos[0]);
    const z = snapTo(pos[2]);
    const y = pos[1] + positionData[1] + block.data.scale[1] / 2;
    const rotation = addVector(rotationOption, rotationData).map((degree) => toRadian(degree));

    return {
      ...block.data,
      id: uuidv4(),
      name: block.data.name,
      position: [x, y, z],
      rotation: rotation as Num3,
      scale: scale,
      children: [],
      ...rest,
    };
  }
}

export default BlockCreator;
