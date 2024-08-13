import SceneService from '../../components/scene/service/SceneService';
import ElectricConnection from '../electricity/types/ElectricConnection';
import ElectricNode from '../electricity/types/ElectricNode';

class ElectricityFactory {
  constructor(sceneService: SceneService) {
    this.sceneService = sceneService;
  }

  createElectricNode(): ElectricNode {
    return {
      id: this.sceneService.uuid('electric-node'),
      hotTerminals: [],
      neutralTerminals: [],
    };
  }

  createElectricConnection(connection: Partial<ElectricConnection>): ElectricConnection {
    return {
      type: 'hot',
      ...connection,
      id: this.sceneService.uuid('electric-node'),
    };
  }

  private sceneService: SceneService;
}

export default ElectricityFactory;
