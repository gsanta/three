import Device, { createPin } from '@/client/editor/types/block/Device';
import BlockFactory from './BlockFactory';
import Block from '@/client/editor/types/Block';

class PoleFactory extends BlockFactory {
  createCategory(block: Block, overrides: Partial<Block> = {}): Device {
    const pins: Device['pins'] = {};

    Object.keys(block.partDetails)
      .filter((key) => block.partDetails[key]?.category === 'pin')
      .forEach((key) => (pins[key] = createPin('in-out', [])));

    const pole: Device = { isOn: false, pins: pins, ...overrides, id: block.id, category: 'devices' };
    return pole;
  }
}

export default PoleFactory;
