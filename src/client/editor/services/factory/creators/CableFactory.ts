import BlockFactory from './BlockFactory';
import BlockCreator from './BlockCreator';
import BlockData from '@/client/editor/data/BlockData';
import BlockConstantData from '@/client/editor/data/BlockConstantData';
import Cable from '@/client/editor/models/block/Cable';
import mergeDeep from '@/client/editor/utils/mergeDeep';
import { PartialDeep } from 'type-fest';
import BlockDecoration, { BlockDecorationType } from '@/client/editor/models/BlockCategory';

class CableFactory extends BlockFactory {
  create(blockType: BlockConstantData, overrides: Partial<BlockData> = {}) {
    const block = BlockCreator.create(this.sceneService.uuid(blockType), blockType, overrides);

    return block;
  }

  createCategory(block: BlockData, overrides: Partial<BlockDecorationType> & { category: BlockDecoration }): Cable {
    const cable: Cable = {
      end1: null,
      end2: null,
      points: [],
      ...overrides,
      category: 'cables',
      id: block.id,
    };
    return cable;
  }

  updateDecoration(orig: Cable, partial: PartialDeep<Cable>) {
    const updated: Cable = mergeDeep<Cable>(orig, partial, 'merge');

    return updated;
  }
}

export default CableFactory;
