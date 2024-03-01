import Block, { BlockType } from '../types/Block';

const parseBlocks = (blocks: Record<string, Omit<Block, 'name'>>): Block[] =>
  Object.keys(blocks).map((key) => ({ ...blocks[key as BlockType], name: key as BlockType }));

export default parseBlocks;
