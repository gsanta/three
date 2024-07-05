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
  associations: string[];
  // the partIndex of it's parent if it is attached to a part
  connectedTo?: string;
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
    partDetails: {
      ...block.partDetails,
    },
  };

  if (partial.partDetails) {
    Object.keys(partial.partDetails).forEach(
      (key) =>
        (newBlock.partDetails[key] = {
          ...newBlock.partDetails[key],
          ...partial.partDetails?.[key],
        } as ModelPartInfo),
    );
  }

  return newBlock;
};

export default Block;
