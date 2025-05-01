/* eslint-disable @typescript-eslint/no-unused-vars */
import BlockConstantData from '@/client/editor/models/block/BlockConstantData';
import BlockData from '@/client/editor/models/block/BlockData';
import BlockDecoration, { BlockDecorationType } from '@/client/editor/models/block/BlockCategory';
import BlockCreator from './BlockCreator';
import SceneService from '@/client/editor/ui/scene/service/SceneService';

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
    _overrides: Partial<BlockDecorationType> & { category: BlockDecoration },
  ): BlockDecorationType {
    throw new Error('Unimplemented method');
  }

  protected sceneService: SceneService;
}

export default BlockFactory;
