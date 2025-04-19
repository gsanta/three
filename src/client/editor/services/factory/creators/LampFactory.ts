import BlockFactory from './BlockFactory';
import Block from '@/client/editor/models/Block';
import Device from '@/client/editor/models/block/Device';

class LampFactory extends BlockFactory {
  createCategory(block: Block, overrides: Partial<Block> = {}): Device {
    const device: Device = {
      circuitComponent: 'consumer',
      isOn: false,
      pins: {},
      ...overrides,
      id: block.id,
      category: 'devices',
    };
    return device;
  }
}

export default LampFactory;
