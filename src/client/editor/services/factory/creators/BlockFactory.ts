/* eslint-disable @typescript-eslint/no-unused-vars */
import BlockType from '@/client/editor/types/BlockType';
import Block from '@/client/editor/types/Block';
import BlockDecoration, { BlockDecorationType } from '@/client/editor/types/BlockCategory';
import BlockCreator from './BlockCreator';
import SceneService from '@/client/editor/components/scene/service/SceneService';

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
    _overrides: Partial<BlockDecorationType> & { category: BlockDecoration },
  ): BlockDecorationType {
    throw new Error('Unimplemented method');
  }

  protected sceneService: SceneService;
}

export default BlockFactory;
