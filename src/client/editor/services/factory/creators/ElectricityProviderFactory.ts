import BlockFactory from './BlockFactory';
import BlockData from '@/client/editor/models/block/BlockData';
import Device, { createPin } from '@/client/editor/models/block/categories/Device';

class ElectricityProviderFactory extends BlockFactory {
  createCategory(block: BlockData, overrides: Partial<BlockData> = {}): Device {
    const pins: Device['pins'] = {};

    Object.keys(block.partDetails)
      .filter((key) => block.partDetails[key]?.roles === 'pin')
      .forEach((key) => (pins[key] = createPin('in-out', [])));

    const pole: Device = {
      circuitComponent: 'provider',
      pins: pins,
      isOn: false,
      ...overrides,
      id: block.id,
      category: 'devices',
    };
    return pole;
  }
}

export default ElectricityProviderFactory;
