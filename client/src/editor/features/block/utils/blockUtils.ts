import BlockType, { BlockName } from '../../../types/BlockType';

export const getBlock = (blocks: BlockType[], blockName: BlockName) => {
  const block = blocks.find((b) => b.name === blockName);

  if (!block) {
    throw new Error('Block not found: ' + blockName);
  }

  return block;
};
