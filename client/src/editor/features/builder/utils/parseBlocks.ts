import { defaultSnap } from '@/editor/utils/sceneUtils';
import Block, { BlockType } from '../../../types/Block';

const defaultSnaps = { x: defaultSnap, y: defaultSnap, z: defaultSnap };

const defaultBlockOptions: Partial<Block['options']> = {
  rotation: {
    x: [0],
    y: [0],
    z: [0],
    selected: [0, 0, 0],
  },
  size: {
    scales: [1],
    direction: 'x',
    selected: 1,
  },
};

const parseBlocks = (blocks: Record<string, Block>): Block[] =>
  Object.keys(blocks).map((key) => {
    const block = blocks[key as BlockType];
    return {
      data: {
        ...block.data,
        name: key as BlockType,
      },
      snap: { ...defaultSnaps, ...(block?.snap || {}) },
      options: {
        ...defaultBlockOptions,
        ...block.options,
      },
    };
  });

export default parseBlocks;
