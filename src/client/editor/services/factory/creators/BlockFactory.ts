/* eslint-disable @typescript-eslint/no-unused-vars */
import BlockType from '@/client/editor/types/BlockType';
import Block from '@/client/editor/types/Block';
import BlockCategory, { BlockCategoryType } from '@/client/editor/types/BlockCategory';
import SceneService from '@/client/editor/components/scene/SceneService';
import BlockCreator from './BlockCreator';

abstract class BlockFactory {
  constructor(sceneService: SceneService) {
    this.sceneService = sceneService;
  }

  create(blockType: BlockType, overrides: Partial<Block> = {}): Block {
    const block = BlockCreator.create(this.sceneService.uuid(), blockType, overrides);

    return block;
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
