import { PartialDeep } from 'type-fest';
import BaseBlockType, { ModelPartInfo, ShapeType } from './BaseBlockType';
import { MergeStrategy, mergeArrays } from '../utils/mergeDeep';
import { MeshStandardMaterialProps } from '@react-three/fiber';

export type BlockSlotSource = {
  slotName: string;
  blockId: string;
};

export type NeigbourConnection = {
  id: string;
  neighbourBlock: string;
  neighbourPart?: string;
  part?: string;
};

type BlockType<S extends ShapeType = ShapeType> = {
  id: string;
  isHovered: boolean;
  hoveredPart?: string;
  isDirty: boolean;
  isSelected: boolean;
  selectedPart?: string;
  isVisible: boolean;

  materialProps: MeshStandardMaterialProps;

  neighbourConnections: NeigbourConnection[];

  notifyOnRender: boolean;

  conduitConnections: {
    block: string;
    thisPart?: string;
  }[];

  multiParentConnections: {
    block: string;
  }[];

  childConnections: {
    childBlock: string;
    childPart?: string;
    parentPart?: string;
  }[];

  parentConnection?: {
    block: string;
    part?: string;
  };
} & BaseBlockType<S>;

export type PartialMeshData = Partial<BlockType> & { id: string };

export const mergeBlocks = (
  block: BlockType,
  partial?: PartialDeep<BlockType>,
  mergeStrategy: MergeStrategy = 'replace',
): BlockType => {
  if (!partial) {
    return block;
  }

  const newBlock = {
    ...block,
    ...partial,
    neighbourConnections: mergeArrays(block.neighbourConnections, partial?.neighbourConnections, mergeStrategy),
    childConnections: mergeArrays(block.childConnections, partial?.childConnections, mergeStrategy),
    conduitConnections: mergeArrays(block.conduitConnections, partial?.conduitConnections, mergeStrategy),
    partDetails: {
      ...block.partDetails,
    },
  } as BlockType;

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

export default BlockType;
