import Pole, { createPin } from '@/client/editor/types/block/Pole';
import BlockFactory from './BlockFactory';
import Block from '@/client/editor/types/Block';

class PoleFactory extends BlockFactory {
  createCategory(block: Block, overrides: Partial<Block> = {}): Pole {
    const pins: Pole['pins'] = {};

    Object.keys(block.partDetails)
      .filter((key) => block.partDetails[key]?.category === 'pin')
      .forEach((key) => (pins[key] = createPin('in-out', [])));

    const pole: Pole = { pins: pins, ...overrides, id: block.id, category: 'poles' };
    return pole;
  }
}

export default PoleFactory;
