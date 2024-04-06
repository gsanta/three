import BlockData, { BlockType } from '../../../types/BlockData';

export const getBlock = (blocks: BlockData[], blockName: BlockType) => {
  const block = blocks.find((b) => b.data.name === blockName);

  if (!block) {
    throw new Error('Block not found: ' + blockName);
  }

  return block;
};
