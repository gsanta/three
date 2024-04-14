import BlockType from '@/editor/types/BlockType';
import { toRadian } from '@/editor/utils/mathUtils';
import VectorUtils, { addVector, snapTo } from '@/editor/utils/vectorUtils';
import { v4 as uuidv4 } from 'uuid';
import Num3 from '@/editor/types/Num3';
import Block from '@/editor/types/Block';

class BlockCreator {
  static create(block: BlockType, settings: Partial<Block>): Block {
    // const { position: pos = [0, 0, 0], ...rest } = settings;
    const pos = settings.position || [0, 0, 0];

    const { rotation: rotationData, position: positionData } = block;
    const selectedSize = settings.scale;
    const selectedRotation = settings.rotation || [0, 0, 0];
    const scale = VectorUtils.multiplyVec3(block.scale, selectedSize || [1, 1, 1]);

    const x = snapTo(pos[0]);
    const z = snapTo(pos[2]);
    const y = pos[1] + positionData[1] + scale[1] / 2;
    const rotation = addVector(selectedRotation, rotationData).map((degree) => toRadian(degree));

    return {
      ...block,
      id: uuidv4(),
      position: [x, y, z],
      rotation: rotation as Num3,
      scale: scale,
      children: [],
    };
  }
}

export default BlockCreator;
