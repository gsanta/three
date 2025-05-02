import Device from '@/client/editor/models/block/categories/Device';
import BlockFactory from './BlockFactory';
import BlockData from '@/client/editor/models/block/BlockData';

class PoleFactory extends BlockFactory {
  createCategory(block: BlockData, overrides: Partial<BlockData> = {}): Device {
    const pins: Device['pins'] = {};

    const pole: Device = {
      circuitComponent: 'consumer',
      isOn: false,
      pins: pins,
      ...overrides,
      id: block.id,
      category: 'devices',
    };
    return pole;
  }
}

export default PoleFactory;
