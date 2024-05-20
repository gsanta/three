import Block from '../types/Block';
import BlockType, { ModelPart } from '../types/BlockType';
import MathUtils, { toDegree } from './mathUtils';

type RotatedPart = { part: ModelPart; rotation: number };

class BlockUtils {
  static iterateDescendents(blocks: Record<string, Block>, block: Block, doWork: (descendantId: Block) => void) {
    doWork(block);

    block.children.forEach((childId) => {
      doWork(blocks[childId]);

      BlockUtils.iterateDescendents(blocks, blocks[childId], doWork);
    });
  }

  static getBlock(blocks: BlockType[], blockName: string) {
    const block = blocks.find((b) => b.name === blockName);

    if (!block) {
      throw new Error('Block not found: ' + blockName);
    }

    return block;
  }

  static findMatchingSlot(sourceBlock: Block, sourcePartName: string, target: BlockType): RotatedPart | undefined {
    const sourcePart = sourceBlock.parts.find((part) => part.name === sourcePartName);
    const orientation = sourcePart?.orientation || 0;
    const rotation = toDegree(sourceBlock.rotation[1]);
    const realRotation = MathUtils.normalizeAngle(orientation - rotation);
    const bestMatch = MathUtils.normalizeAngle(realRotation + 180);

    const slots = target?.parts?.filter((part) => part.role === 'slot');

    const result = slots.reduce((rotatedPart: RotatedPart | undefined, slot) => {
      let targetRotation = 0;

      if (slot.orientation > bestMatch) {
        targetRotation = slot.orientation - bestMatch;
      } else {
        targetRotation = slot.orientation + (360 - bestMatch);
      }

      if (!rotatedPart || rotatedPart.rotation > targetRotation) {
        return { part: slot, rotation: targetRotation };
      }

      return rotatedPart;
    }, undefined);

    return result;
  }
}

export default BlockUtils;
