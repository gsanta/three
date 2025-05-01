import { PartialDeep } from 'type-fest';
import BlockConstantData from './BlockConstantData';
import { MergeStrategy, mergeArrays } from '../utils/mergeDeep';
import { MeshStandardMaterialProps } from '@react-three/fiber';
import BlockPartLookupData from './BlockPartLookupData';

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

type BlockData = {
  childConnections: {
    childBlock: string;
    childPart?: string;
    parentPart?: string;
  }[];

  conduitConnections: {
    block: string;
    thisPart?: string;
  }[];

  id: string;

  hoveredPart?: string;

  isDirty: boolean;
  isHovered: boolean;
  isSelected: boolean;
  isVisible: boolean;

  materialProps: MeshStandardMaterialProps;

  multiParentConnections: {
    block: string;
  }[];

  neighbourConnections: NeigbourConnection[];

  notifyOnRender: boolean;

  parentConnection?: {
    block: string;
    part?: string;
  };

  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];

  selectedPart?: string;
} & BlockConstantData;

export type PartialMeshData = Partial<BlockData> & { id: string };

export const mergeBlocks = (
  block: BlockData,
  partial?: PartialDeep<BlockData>,
  mergeStrategy: MergeStrategy = 'replace',
): BlockData => {
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
  } as BlockData;

  if (partial.partDetails) {
    Object.keys(partial.partDetails).forEach((key) => {
      const newPartInfo = {
        ...newBlock.partDetails[key],
        ...partial.partDetails?.[key],
      } as BlockPartLookupData;

      newBlock.partDetails[key] = newPartInfo;
    });
  }

  return newBlock;
};

export default BlockData;
