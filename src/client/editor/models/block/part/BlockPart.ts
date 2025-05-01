import BlockData from '../BlockData';
import BlockConstantData from '../BlockConstantData';
import Num3 from '../../math/Num3';
import Block from '../Block';
import BlockPartGeometryData from './BlockPartGeometryData';
import { BlockPartRole } from './BlockPartLookupData';
import Vector from '../../math/Vector';

type PartWithRotation = [BlockPartGeometryData, Num3];

class BlockPart {
  constructor(block: BlockData, partOrPartName: string | BlockPartGeometryData) {
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
    newBlockType: BlockConstantData,
    matchingRole: BlockPartRole,
  ): PartWithRotation | undefined {
    const sourcePartCandidates = newBlockType?.parts?.filter((part) =>
      newBlockType.partDetails[part.name]?.roles?.includes(matchingRole),
    );

    const thisPartOrientation = this.block.partDetails[this.part?.name || '']?.orientation || 0;
    const thisBlockRotation = Vector.toDegree(this.block.rotation[1]);

    const thisPartRotation = Vector.normalizeAngle(thisPartOrientation + thisBlockRotation);
    const oppositeRotation = Vector.normalizeAngle(thisPartRotation + 180);

    const result = sourcePartCandidates.reduce<{ part: BlockPartGeometryData; rotation: number } | undefined>(
      (rotatedPart, nextPart) => {
        let sourceRotation = 0;

        const sourcePartOrientation = newBlockType.partDetails[nextPart?.name || '']?.orientation || 0;

        if (sourcePartOrientation > oppositeRotation) {
          sourceRotation = -Vector.normalizeAngle(sourcePartOrientation - oppositeRotation);
        } else {
          sourceRotation = Vector.normalizeAngle(oppositeRotation - sourcePartOrientation);
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

  getPart(): BlockPartGeometryData {
    return this.part;
  }

  private block: BlockData;

  private part: BlockPartGeometryData;
}

export default BlockPart;
