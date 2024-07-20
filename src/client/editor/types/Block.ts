import { PartialDeep } from 'type-fest';
import BlockType, { ModelPartInfo, ShapeType } from './BlockType';
import { MergeStrategy, mergeArrays } from '../utils/mergeDeep';

export type BlockSlotSource = {
  slotName: string;
  blockId: string;
};

type Block<S extends ShapeType = ShapeType> = {
  id: string;
  children: string[];
  dependsOn: string[];
  dependents: string[];
  isHovered: boolean;
  isSelected: boolean;
  isVisible: boolean;
  associations: string[];

  neighbourTo: {
    blockId: string;
    otherPartIndex?: string;
    thisPartIndex?: string;
  }[];

  stationedOn?: {
    blockId: string;
    partIndex?: string;
  };

  stationFor: {
    blockId: string;
    thisPartIndex?: string;
  }[];

  parent?: string;
} & BlockType<S>;

export type PartialMeshData = Partial<Block> & { id: string };

export const mergeBlocks = (
  block: Block,
  partial?: PartialDeep<Block>,
  mergeStrategy: MergeStrategy = 'replace',
): Block => {
  if (!partial) {
    return block;
  }

  const newBlock = {
    ...block,
    ...partial,
    children: mergeArrays(block.children, partial?.children, mergeStrategy),
    dependsOn: mergeArrays(block.dependsOn, partial?.dependsOn, mergeStrategy),
    dependents: mergeArrays(block.dependents, partial?.dependents, mergeStrategy),
    neighbourTo: mergeArrays(block.neighbourTo, partial?.neighbourTo, mergeStrategy),
    stationFor: mergeArrays(block.stationFor, partial?.stationFor, mergeStrategy),
    partDetails: {
      ...block.partDetails,
    },
  } as Block;

  if (partial.partDetails) {
    Object.keys(partial.partDetails).forEach((key) => {
      const newPartInfo = {
        ...newBlock.partDetails[key],
        ...partial.partDetails?.[key],
      } as ModelPartInfo;

      newBlock.partDetails[key] = newPartInfo;
    });
  }

  return newBlock;
};

export default Block;
