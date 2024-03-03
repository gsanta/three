import Block, { BlockType } from '../types/Block';

export const getBlock = (blocks: Block[], blockName: BlockType) => {
  const block = blocks.find((b) => b.name === blockName);

  if (!block) {
    throw new Error('Block not found: ' + blockName);
  }

  return block;
};
