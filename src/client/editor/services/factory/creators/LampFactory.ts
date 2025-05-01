import BlockFactory from './BlockFactory';
import BlockType from '@/client/editor/types/BlockType';
import Device from '@/client/editor/models/block/Device';

class LampFactory extends BlockFactory {
  createCategory(block: BlockType, overrides: Partial<BlockType> = {}): Device {
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
