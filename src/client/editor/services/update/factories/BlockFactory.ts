/* eslint-disable @typescript-eslint/no-unused-vars */
import BlockType from '@/client/editor/types/BlockType';
import Block from '@/client/editor/types/Block';
import type { PartialDeep } from 'type-fest';
import BlockCategory, { BlockCategories } from '@/client/editor/types/BlockCategory';

abstract class BlockFactory<T extends BlockCategory | never = never> {
  readonly category?: BlockCategory;

  constructor(category?: BlockCategory) {
    this.category = category;
  }

  create(
    _blockType: BlockType,
    _blockOptions: Partial<Block> = {},
    _decorationOptions: Partial<BlockCategories[T]> = {},
  ): { block: Block; decoration?: BlockCategories[T] } {
    throw new Error('Unimplemented method');
  }

  updateDecoration(
    _orig: BlockCategories[T],
    _partial: PartialDeep<BlockCategories[T]>,
    _options: { mergeArrays: boolean } = { mergeArrays: true },
  ): BlockCategories[T] {
    throw new Error('Unimplemented method');
  }
}

export default BlockFactory;
