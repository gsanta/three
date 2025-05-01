import BlockType from '../types/BlockType';
import BaseBlockType, { ModelPart } from '../models/BaseBlockType';
import MathUtils, { toDegree } from './mathUtils';

type RotatedPart = { part: ModelPart; rotation: number };

class BlockUtils {
  static getBlock(blocks: BaseBlockType[], blockName: string) {
    const block = blocks.find((b) => b.type === blockName);

    if (!block) {
      throw new Error('Block not found: ' + blockName);
    }

    return block;
  }

  static getPartIndexByName(block: BlockType, partName?: string) {
    return Object.keys(block.partDetails).find((partIndex) => block.partDetails[partIndex]?.name === partName);
  }

  static findMatchingSlot(
    targetBlock: BlockType,
    targetPartName: string,
    source: BaseBlockType,
    sourcePartCandidates: ModelPart[],
  ): RotatedPart | undefined {
    const targetPart = targetBlock.parts.find((part) => part.name === targetPartName);
    const targetPartOrientation = targetBlock.partDetails[targetPart?.name || '']?.orientation || 0;
    const targetBlockRotation = toDegree(targetBlock.rotation[1]);

    const realRotation = MathUtils.normalizeAngle(targetPartOrientation + targetBlockRotation);
    const bestMatch = MathUtils.normalizeAngle(realRotation + 180);

    const result = sourcePartCandidates.reduce((rotatedPart: RotatedPart | undefined, slot) => {
      let sourceRotation = 0;

      const sourcePartOrientation = source.partDetails[slot?.name || '']?.orientation || 0;

      if (sourcePartOrientation > bestMatch) {
        sourceRotation = -MathUtils.normalizeAngle(sourcePartOrientation - bestMatch);
      } else {
        sourceRotation = MathUtils.normalizeAngle(bestMatch - sourcePartOrientation);
      }

      if (!rotatedPart || Math.abs(rotatedPart.rotation) > Math.abs(sourceRotation)) {
        return { part: slot, rotation: sourceRotation };
      }

      return rotatedPart;
    }, undefined);

    return result;
  }
}

export default BlockUtils;
