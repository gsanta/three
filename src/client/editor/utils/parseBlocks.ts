import BlockType, { BlockName } from '../types/BlockType';

const defaultBlock: Partial<BlockType> = {
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  scale: [1, 1, 1],
  movable: true,
  moveAxis: [true, false, true],
};

const parseBlocks = (blocks: BlockType[]): BlockType[] =>
  blocks.map((block) => {
    return {
      ...defaultBlock,
      ...block,
      partDetails: block.partDetails || {},
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
