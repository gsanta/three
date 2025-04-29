/* eslint-disable @typescript-eslint/no-unused-vars */
import BaseBlockType from '@/client/editor/models/BaseBlockType';
import BlockType from '@/client/editor/models/BlockType';
import BlockDecoration, { BlockDecorationType } from '@/client/editor/models/BlockCategory';
import BlockCreator from './BlockCreator';
import SceneService from '@/client/editor/components/scene/service/SceneService';

abstract class BlockFactory {
  constructor(sceneService: SceneService) {
    this.sceneService = sceneService;
  }

  create(blockType: BaseBlockType, overrides: Partial<BlockType> = {}): BlockType {
    const block = BlockCreator.create(this.sceneService.uuid(blockType), blockType, overrides);

    return block;
  }

  createCategory(
    _block: BlockType,
    _overrides: Partial<BlockDecorationType> & { category: BlockDecoration },
  ): BlockDecorationType {
    throw new Error('Unimplemented method');
  }

  protected sceneService: SceneService;
}

export default BlockFactory;
