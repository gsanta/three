import SceneService from '../../components/scene/SceneService';
import SceneStore from '../../components/scene/SceneStore';
import FactoryService from '../../services/factory/FactoryService';
import TransactionService from '../../services/transaction/TransactionService';
import Block from '../../types/Block';
import { addVector, multiplyVector } from '../../utils/vectorUtils';
class DrawHouseWiring {
  constructor(
    factoryService: FactoryService,
    sceneService: SceneService,
    sceneStore: SceneStore,
    updateService: TransactionService,
  ) {
    this.factoryService = factoryService;
    this.sceneService = sceneService;
    this.sceneStore = sceneStore;
    this.updateService = updateService;
  }

  execute(targetBlockId: string, existingCableId: string | null, clientX: number, clientY: number): string | null {
    const edit = this.updateService.getTransaction();

    const mesh = this.sceneStore.getObj3d(targetBlockId);

    const [intersections] = this.sceneService.intersection(mesh, clientX, clientY);

    if (intersections?.length !== 2) {
      return existingCableId;
    }

    const point = multiplyVector(addVector(intersections[0].point.toArray(), intersections[1].point.toArray()), 0.5);

    let block: Block | null = null;

    if (existingCableId) {
      edit.updateDecoration('cables', existingCableId, {
        points: [point],
      });
      edit.commit();
    } else {
      block = this.factoryService.create(
        edit,
        'cable-1',
        { dependsOn: [targetBlockId] },
        {
          cables: {
            points: [point],
          },
        },
      );
      edit.commit();
    }

    return existingCableId || block?.id || null;
  }

  private factoryService: FactoryService;

  private sceneService: SceneService;

  private sceneStore: SceneStore;

  private updateService: TransactionService;
}

export default DrawHouseWiring;
