import Pole, { PartialPole } from '@/editor/services/scene/types/Pole';
import BlockFactory from './BlockFactory';
import BlockData from '@/editor/types/BlockData';
import BlockCreator from '../BlockCreator';
import Block from '@/editor/types/Block';

class PoleFactory extends BlockFactory<'poles'> {
  create(options: Partial<Block> = {}) {
    const block = BlockCreator.create(this.blockData, options);
    const pole: Pole = { id: block.id, pins: { pin1: null, pin2: null, pin3: null } };

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
