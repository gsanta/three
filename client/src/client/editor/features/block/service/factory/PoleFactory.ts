import Pole, { PartialPole } from '@/client/editor/services/scene/types/Pole';
import BlockFactory from './BlockFactory';
import BlockCreator from '../BlockCreator';
import Block from '@/client/editor/types/Block';
import BlockType from '@/client/editor/types/BlockType';

class PoleFactory extends BlockFactory<'poles'> {
  create(blockType: BlockType, options: Partial<Block> = {}) {
    const block = BlockCreator.create(blockType, options);
    const pole: Pole = { id: block.id, category: 'poles', pins: { pin1: null, pin2: null, pin3: null } };

    return {
      block,
      decoration: pole,
    };
  }

  updateDecoration(orig: Pole, partial: PartialPole) {
    const updated: Pole = {
      ...orig,
      ...partial,
      pins: {
        ...orig.pins,
        ...partial.pins,
      },
    };

    return updated;
  }
}

export default PoleFactory;
