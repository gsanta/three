import BlockType, { BlockName } from '../types/BlockType';

const defaultBlock: Partial<BlockType> = {
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  scale: [1, 1, 1],
  movable: true,
  moveAxis: [true, false, true],
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
