import BlockType from '@/client/editor/types/BlockType';
import { toRadian } from '@/client/editor/utils/mathUtils';
import VectorUtils, { addVector } from '@/client/editor/utils/vectorUtils';
import { v4 as uuidv4 } from 'uuid';
import Num3 from '@/client/editor/types/Num3';
import Block from '@/client/editor/types/Block';

class BlockCreator {
  static create(block: BlockType, settings: Partial<Block>): Block {
    // const { position: pos = [0, 0, 0], ...rest } = settings;
    const pos = settings.position || [0, 0, 0];

    const { rotation: rotationData } = block;
    const selectedSize = settings.scale;
    const selectedRotation = settings.rotation || [0, 0, 0];
    const scale = VectorUtils.multiplyVec3(block.scale, selectedSize || [1, 1, 1]);

    const x = pos[0]; //snapTo(pos[0]);
    const z = pos[2]; //snapTo(pos[2]);
    const y = pos[1]; // + positionData[1] + scale[1] / 2;
    const rotation = addVector(selectedRotation, rotationData).map((degree) => toRadian(degree));

    return {
      ...block,
      children: settings.children || [],
      dependents: settings.dependents || [],
      dependsOn: settings.dependsOn || [],
      parent: settings.parent,
      slotSources: settings.slotSources || [],
      slotTarget: settings.slotTarget,
      id: uuidv4(),
      position: [x, y, z],
      rotation: rotation as Num3,
      scale: scale,
    };
  }
}

export default BlockCreator;
