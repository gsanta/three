import Block from '../types/Block';
import BlockType, { ModelPart } from '../types/BlockType';
import MathUtils, { toDegree } from './mathUtils';

type RotatedPart = { part: ModelPart; rotation: number };

class BlockUtils {
  static getBlock(blocks: BlockType[], blockName: string) {
    const block = blocks.find((b) => b.type === blockName);

    if (!block) {
      throw new Error('Block not found: ' + blockName);
    }

    return block;
  }

  static getPartIndexByName(block: Block, partName?: string) {
    return Object.keys(block.partDetails).find((partIndex) => block.partDetails[partIndex]?.name === partName);
  }

  static findMatchingSlot(sourceBlock: Block, sourcePartName: string, target: BlockType): RotatedPart | undefined {
    const sourcePart = sourceBlock.parts.find((part) => part.name === sourcePartName);
    const orientation = sourceBlock.partDetails[sourcePart?.name || '']?.orientation || 0;
    const rotation = toDegree(sourceBlock.rotation[1]);
    const realRotation = MathUtils.normalizeAngle(orientation - rotation);
    const bestMatch = MathUtils.normalizeAngle(realRotation + 180);

    const slots = target?.parts?.filter((part) => target.partDetails[part.name]?.role === 'slot');

    const result = slots.reduce((rotatedPart: RotatedPart | undefined, slot) => {
      let targetRotation = 0;

      const targetOrientation = target.partDetails[slot?.name || '']?.orientation || 0;

      if (targetOrientation > bestMatch) {
        targetRotation = targetOrientation - bestMatch;
      } else {
        targetRotation = targetOrientation + (360 - bestMatch);
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
