/* eslint-disable @typescript-eslint/no-unused-vars */
import BlockType from '@/client/editor/types/BlockType';
import Block from '@/client/editor/types/Block';
import BlockCategory, { BlockCategoryType } from '@/client/editor/types/BlockCategory';
import SceneService from '@/client/editor/components/scene/SceneService';

abstract class BlockFactory {
  readonly category?: BlockCategory;

  constructor(sceneService: SceneService, category?: BlockCategory) {
    this.category = category;
    this.sceneService = sceneService;
  }

  create(_blockType: BlockType, _overrides: Partial<Block> = {}): Block {
    throw new Error('Unimplemented method');
  }

  createCategory(
    _block: Block,
    _overrides: Partial<BlockCategoryType> & { category: BlockCategory },
  ): BlockCategoryType {
    throw new Error('Unimplemented method');
  }

  protected sceneService: SceneService;
}

export default BlockFactory;
