import BlockFactory from './BlockFactory';
import BlockData from '@/client/editor/models/block/BlockData';
import Device from '@/client/editor/models/block/categories/Device';

class WeatherHeadFactory extends BlockFactory {
  createCategory(block: BlockData, overrides: Partial<BlockData> = {}): Device {
    const pins: Device['pins'] = {};

    const device: Device = {
      circuitComponent: 'consumer',
      isOn: false,
      pins: pins,
      ...overrides,
      id: block.id,
      category: 'devices',
    };
    return device;
  }
}

export default WeatherHeadFactory;
