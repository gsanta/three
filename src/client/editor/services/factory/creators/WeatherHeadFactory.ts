import BlockFactory from './BlockFactory';
import Block from '@/client/editor/types/Block';
import Pole, { createPin } from '@/client/editor/types/block/Pole';

class WeatherHeadFactory extends BlockFactory {
  createCategory(block: Block, overrides: Partial<Block> = {}): Pole {
    const pins: Pole['pins'] = {
      pin1: createPin('in-out', []),
      pin2: createPin('in-out', []),
      pin3: createPin('in-out', []),
    };

    const pole: Pole = { pins: pins, ...overrides, id: block.id, category: 'poles' };
    return pole;
  }
}

export default WeatherHeadFactory;
