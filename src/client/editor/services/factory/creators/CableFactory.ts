import BlockFactory from './BlockFactory';
import BlockCreator from './BlockCreator';
import Block from '@/client/editor/types/Block';
import BlockType from '@/client/editor/types/BlockType';
import Cable from '@/client/editor/types/block/Cable';
import mergeDeep from '@/client/editor/utils/mergeDeep';
import { PartialDeep } from 'type-fest';
import SceneService from '@/client/editor/components/scene/SceneService';
import BlockCategory, { BlockCategoryType } from '@/client/editor/types/BlockCategory';

class CableFactory extends BlockFactory {
  constructor(sceneService: SceneService) {
    super(sceneService, 'cables');
  }

  create(blockType: BlockType, overrides: Partial<Block> = {}) {
    const block = BlockCreator.create(this.sceneService.uuid(), blockType, overrides);

    return block;
  }

  createCategory(block: Block, overrides: Partial<BlockCategoryType> & { category: BlockCategory }): Cable {
    const cable: Cable = { points: [], end1: null, end2: null, ...overrides, category: 'cables', id: block.id };
    return cable;
  }

  updateDecoration(orig: Cable, partial: PartialDeep<Cable>) {
    const updated: Cable = mergeDeep<Cable>(orig, partial, 'merge');

    return updated;
  }
}

export default CableFactory;
