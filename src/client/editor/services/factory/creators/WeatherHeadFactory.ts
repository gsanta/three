import BlockFactory from './BlockFactory';
import Block from '@/client/editor/types/Block';
import Device, { createPin } from '@/client/editor/types/block/Device';

class WeatherHeadFactory extends BlockFactory {
  createCategory(block: Block, overrides: Partial<Block> = {}): Device {
    const pins: Device['pins'] = {};

    Object.keys(block.partDetails)
      .filter((key) => block.partDetails[key]?.category === 'pin')
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
