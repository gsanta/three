import { defaultSnap } from '@/editor/utils/sceneUtils';
import BlockData, { BlockType } from '../../../types/BlockData';

const defaultSnaps = { x: defaultSnap, y: defaultSnap, z: defaultSnap };

const defaultBlockData: Partial<BlockData['data']> = {
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  scale: [1, 1, 1],
  movable: true,
};

const defaultBlockOptions: Partial<BlockData['options']> = {
  rotation: {
    x: [0],
    y: [0, 90, 180, -90],
    z: [0],
  },
  size: {
    scales: [1],
    direction: 'x',
    selected: 1,
  },
};

const defaultBlockSelected: Partial<BlockData['selected']> = {
  rotation: [0, 0, 0],
};

const parseBlocks = (blocks: Record<string, BlockData>): BlockData[] =>
  Object.keys(blocks).map((key) => {
    const block = blocks[key as BlockType];
    return {
      data: {
        ...defaultBlockData,
        ...block.data,
        name: key as BlockType,
      },
      snap: { ...defaultSnaps, ...(block?.snap || {}) },
      options: {
        ...defaultBlockOptions,
        ...block.options,
      },
      selected: {
        ...defaultBlockSelected,
        ...block.selected,
      },
    };
  });

export default parseBlocks;
