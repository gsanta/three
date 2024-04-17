import BlockFactory from './BlockFactory';
import BlockCreator from '../BlockCreator';
import Block from '@/editor/types/Block';
import BlockType from '@/editor/types/BlockType';
import Cable from '@/editor/services/scene/types/Cable';
import mergeDeep from '@/editor/utils/mergeDeep';
import { PartialDeep } from 'type-fest';

class CableFactory extends BlockFactory<'cables'> {
  constructor() {
    super('cables');
  }

  create(blockType: BlockType, options: Partial<Block> = {}, decorationOptions: Partial<Cable> = {}) {
    const block = BlockCreator.create(blockType, options);
    const cable: Cable = { id: block.id, points: [], ...decorationOptions };

    return {
      block,
      decoration: cable,
    };
  }

  updateDecoration(orig: Cable, partial: PartialDeep<Cable>) {
    const updated: Cable = mergeDeep<Cable>(orig, partial);

    return updated;
  }
}

export default CableFactory;
