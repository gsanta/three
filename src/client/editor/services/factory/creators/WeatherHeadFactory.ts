import BlockFactory from './BlockFactory';
import BlockType from '@/client/editor/types/BlockType';
import Device, { createPin } from '@/client/editor/models/block/Device';

class WeatherHeadFactory extends BlockFactory {
  createCategory(block: BlockType, overrides: Partial<BlockType> = {}): Device {
    const pins: Device['pins'] = {};

    Object.keys(block.partDetails)
      .filter((key) => block.partDetails[key]?.roles === 'pin')
      .forEach((key) => (pins[key] = createPin('in-out', [])));

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

export default WeatherHeadFactory;
