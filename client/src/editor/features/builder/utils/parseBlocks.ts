import Block, { BlockType } from '../types/Block';

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

const parseBlocks = (blocks: Record<string, Omit<Block, 'name'>>): Block[] =>
  Object.keys(blocks).map((key) => {
    const block = blocks[key as BlockType];
    return { ...block, options: { ...defaultBlockOptions, ...block.options }, name: key as BlockType };
  }) as Block[];

export default parseBlocks;
