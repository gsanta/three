/* eslint-disable @typescript-eslint/no-unused-vars */
import BlockConstantData from '@/client/editor/models/block/BlockConstantData';
import BlockData from '@/client/editor/models/block/BlockData';
import { BlockDecorationType } from '@/client/editor/models/block/BlockCategory';
import BlockCreator from './BlockCreator';
import SceneService from '@/client/editor/ui/scene/service/SceneService';
import { BlockCategoryName } from '@/client/editor/models/block/BlockCategoryName';

abstract class BlockFactory {
  constructor(sceneService: SceneService) {
    this.sceneService = sceneService;
  }

  create(blockType: BlockConstantData, overrides: Partial<BlockData> = {}): BlockData {
    const block = BlockCreator.create(this.sceneService.uuid(blockType), blockType, overrides);

    return block;
  }

  createCategory(
    _block: BlockData,
    _overrides: Partial<Omit<BlockDecorationType, 'category'>> & { category: BlockCategoryName },
  ): BlockDecorationType {
    throw new Error('Unimplemented method');
  }

  protected sceneService: SceneService;
}

export default BlockFactory;
