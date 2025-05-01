import BlockType from '../../types/BlockType';
import MathUtils, { toDegree } from '../../utils/mathUtils';
import BaseBlockType, { ModelPart, BlockPartRole } from '../BaseBlockType';
import Num3 from '../Num3';
import Block from './Block';

type PartWithRotation = [ModelPart, Num3];

class BlockPart {
  constructor(block: BlockType, partOrPartName: string | ModelPart) {
    const part =
      typeof partOrPartName === 'string'
        ? block.parts.find((currentPart) => currentPart.name === partOrPartName)
        : partOrPartName;

    if (!part) {
      throw new Error(`Part with name '${part}' does not exist in block '${block.type}`);
    }

    this.part = part;
    this.block = block;
  }

  findBestMatchingPartToConnectTo(
    newBlockType: BaseBlockType,
    matchingRole: BlockPartRole,
  ): PartWithRotation | undefined {
    const sourcePartCandidates = newBlockType?.parts?.filter((part) =>
      newBlockType.partDetails[part.name]?.roles?.includes(matchingRole),
    );

    const thisPartOrientation = this.block.partDetails[this.part?.name || '']?.orientation || 0;
    const thisBlockRotation = toDegree(this.block.rotation[1]);

    const thisPartRotation = MathUtils.normalizeAngle(thisPartOrientation + thisBlockRotation);
    const oppositeRotation = MathUtils.normalizeAngle(thisPartRotation + 180);

    const result = sourcePartCandidates.reduce<{ part: ModelPart; rotation: number } | undefined>(
      (rotatedPart, nextPart) => {
        let sourceRotation = 0;

        const sourcePartOrientation = newBlockType.partDetails[nextPart?.name || '']?.orientation || 0;

        if (sourcePartOrientation > oppositeRotation) {
          sourceRotation = -MathUtils.normalizeAngle(sourcePartOrientation - oppositeRotation);
        } else {
          sourceRotation = MathUtils.normalizeAngle(oppositeRotation - sourcePartOrientation);
        }

        if (!rotatedPart || Math.abs(rotatedPart.rotation) > Math.abs(sourceRotation)) {
          return { part: nextPart, rotation: sourceRotation };
        }

        return rotatedPart;
      },
      undefined,
    );

    return result && [result?.part, [0, result?.rotation, 0]];
  }

  getBlock(): Block {
    return new Block(this.block);
  }

  getPart(): ModelPart {
    return this.part;
  }

  private block: BlockType;

  private part: ModelPart;
}

export default BlockPart;
