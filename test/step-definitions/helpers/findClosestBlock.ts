import BlockData from '@/client/editor/models/block/BlockData';
import Num3 from '@/client/editor/models/math/Num3';

export function calculateDistance(pos1: Num3, pos2: Num3): number {
  return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2) + Math.pow(pos1[2] - pos2[2], 2));
}

const findClosestBlock = (blocks: BlockData[], targetPosition: Num3): [BlockData, number] | undefined => {
  if (blocks.length === 0) {
    return undefined;
  }

  let closestObject = blocks[0];
  let closestDistance = calculateDistance(blocks[0].position, targetPosition);

  for (const obj of blocks) {
    const distance = calculateDistance(obj.position, targetPosition);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestObject = obj;
    }
  }

  return [closestObject, closestDistance];
};

export default findClosestBlock;
