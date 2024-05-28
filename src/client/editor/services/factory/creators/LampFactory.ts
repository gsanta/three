import BlockFactory from './BlockFactory';
import Block from '@/client/editor/types/Block';
import SceneService from '@/client/editor/components/scene/SceneService';
import Device from '@/client/editor/types/block/Device';

class LampFactory extends BlockFactory {
  constructor(sceneService: SceneService) {
    super(sceneService, 'poles');
  }

  createCategory(block: Block, overrides: Partial<Block> = {}): Device {
    const device: Device = { isOn: false, ...overrides, id: block.id, category: 'devices' };
    return device;
  }
}

export default LampFactory;
