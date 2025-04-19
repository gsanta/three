import { PartialDeep } from 'type-fest';
import BlockType, { ModelPartInfo, ShapeType } from './BlockType';
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

type Block<S extends ShapeType = ShapeType> = {
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

  conduitParentConnections: {
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
    neighbourConnections: mergeArrays(block.neighbourConnections, partial?.neighbourConnections, mergeStrategy),
    childConnections: mergeArrays(block.childConnections, partial?.childConnections, mergeStrategy),
    conduitConnections: mergeArrays(block.conduitConnections, partial?.conduitConnections, mergeStrategy),
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
