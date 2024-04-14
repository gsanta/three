import { defaultSnap } from '@/editor/utils/sceneUtils';
import BlockType, { BlockName } from '../../../types/BlockType';

const defaultSnaps = { x: defaultSnap, y: defaultSnap, z: defaultSnap };

const defaultBlock: Partial<BlockType> = {
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  scale: [1, 1, 1],
  movable: true,
};

const defaultBlockOptions: Partial<BlockType['options']> = {
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

const defaultBlockSelected: Partial<BlockType['selected']> = {
  rotation: [0, 0, 0],
};

const parseBlocks = (blocks: Record<string, BlockType>): BlockType[] =>
  Object.keys(blocks).map((key) => {
    const block = blocks[key as BlockName];
    return {
      ...defaultBlock,
      ...block,
      name: key as BlockName,
      // data: {
      //   ...block.data,
      //   name: key as BlockName,
      // },
      // snap: { ...defaultSnaps, ...(block?.snap || {}) },
      // options: {
      //   ...defaultBlockOptions,
      //   ...block.options,
      // },
      // selected: {
      //   ...defaultBlockSelected,
      //   ...block.selected,
      // },
    };
  });

export default parseBlocks;
