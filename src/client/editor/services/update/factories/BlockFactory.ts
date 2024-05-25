/* eslint-disable @typescript-eslint/no-unused-vars */
import BlockType from '@/client/editor/types/BlockType';
import Block from '@/client/editor/types/Block';
import type { PartialDeep } from 'type-fest';
import BlockCategory, { BlockCategories } from '@/client/editor/types/BlockCategory';
import SceneService from '@/client/editor/components/scene/SceneService';

abstract class BlockFactory<T extends BlockCategory | never = never> {
  readonly category?: BlockCategory;

  constructor(sceneService: SceneService, category?: BlockCategory) {
    this.category = category;
    this.sceneService = sceneService;
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

  protected sceneService: SceneService;
}

export default BlockFactory;
