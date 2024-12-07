import SceneService from '../../components/scene/service/SceneService';
import ElectricConnection from '../electricity/types/ElectricConnection';
import ElectricMeter from '../electricity/types/ElectricMeter';
import FakeNode from '../electricity/types/FakeNode';

class ElectricityFactory {
  constructor(sceneService: SceneService) {
    this.sceneService = sceneService;
  }

  createElectricMeter(blockId: string, node: Partial<ElectricMeter>): ElectricMeter {
    return {
      isOn: true,
      hotTerminals: [],
      neutralTerminals: [],
      ...node,
      blockId,
      id: this.sceneService.uuid('electric-node'),
    };
  }

  createFakeNode(blockId: string): FakeNode {
    return {
      id: this.sceneService.uuid('electric-node'),
      blockId,
      hotTerminals: [],
      neutralTerminals: [],
      type: 'fake-node',
    };
  }

  createElectricConnection(blockId: string, connection: Partial<ElectricConnection>): ElectricConnection {
    return {
      type: 'hot',
      ...connection,
      blockId,
      id: this.sceneService.uuid('electric-node'),
    };
  }

  private sceneService: SceneService;
}

export default ElectricityFactory;
