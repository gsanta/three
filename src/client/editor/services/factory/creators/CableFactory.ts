import BlockFactory from './BlockFactory';
import BlockCreator from './BlockCreator';
import Block from '@/client/editor/models/Block';
import BlockType from '@/client/editor/models/BlockType';
import Cable from '@/client/editor/models/block/Cable';
import mergeDeep from '@/client/editor/utils/mergeDeep';
import { PartialDeep } from 'type-fest';
import BlockDecoration, { BlockDecorationType } from '@/client/editor/models/BlockCategory';

class CableFactory extends BlockFactory {
  create(blockType: BlockType, overrides: Partial<Block> = {}) {
    const block = BlockCreator.create(this.sceneService.uuid(blockType), blockType, overrides);

    return block;
  }

  createCategory(block: Block, overrides: Partial<BlockDecorationType> & { category: BlockDecoration }): Cable {
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
