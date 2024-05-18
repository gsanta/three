/* eslint-disable @typescript-eslint/no-unused-vars */
import BlockType from '@/client/editor/types/BlockType';
import Block from '@/client/editor/types/Block';
import type { PartialDeep } from 'type-fest';
import BlockCategory, { BlockCategories } from '@/client/editor/types/BlockCategory';
import BlockFactory from './BlockFactory';
import BlockCreator from './BlockCreator';

class DefaultFactory extends BlockFactory<BlockCategory> {
  create(
    blockType: BlockType,
    blockOptions: Partial<Block> = {},
    _decorationOptions: Partial<BlockCategories[BlockCategory]> = {},
  ): { block: Block; decoration?: BlockCategories[BlockCategory] } {
    const block = BlockCreator.create(blockType, blockOptions);

    return { block };
  }

  updateDecoration(
    _orig: BlockCategories[BlockCategory],
    _partial: PartialDeep<BlockCategories[BlockCategory]>,
    _options: { mergeArrays: boolean } = { mergeArrays: true },
  ): BlockCategories[BlockCategory] {
    throw new Error('Unimplemented method');
  }
}

export default DefaultFactory;
