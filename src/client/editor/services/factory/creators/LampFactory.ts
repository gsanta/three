import BlockFactory from './BlockFactory';
import BlockData from '@/client/editor/data/BlockData';
import Device from '@/client/editor/models/block/Device';

class LampFactory extends BlockFactory {
  createCategory(block: BlockData, overrides: Partial<BlockData> = {}): Device {
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
