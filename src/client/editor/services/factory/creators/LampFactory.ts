import BlockFactory from './BlockFactory';
import Block from '@/client/editor/types/Block';
import Device from '@/client/editor/types/block/Device';

class LampFactory extends BlockFactory {
  createCategory(block: Block, overrides: Partial<Block> = {}): Device {
    const device: Device = { isOn: false, pins: {}, ...overrides, id: block.id, category: 'devices' };
    return device;
  }
}

export default LampFactory;
