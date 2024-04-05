import { defaultSnap } from '@/editor/utils/sceneUtils';
import Block, { BlockType } from '../../../types/Block';

const defaultSnaps = { x: defaultSnap, y: defaultSnap, z: defaultSnap };

const defaultBlockData: Partial<Block['data']> = {
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  scale: [1, 1, 1],
  movable: true,
};

const defaultBlockOptions: Partial<Block['options']> = {
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

const defaultBlockSelected: Partial<Block['selected']> = {
  rotation: [0, 0, 0],
};

const parseBlocks = (blocks: Record<string, Block>): Block[] =>
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
