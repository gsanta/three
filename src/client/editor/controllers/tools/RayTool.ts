import Tool, { ToolInfo } from '@/client/editor/models/Tool';
import ToolName from '@/client/editor/models/ToolName';
import { ArrowHelper } from 'three';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import BlockStore from '../../stores/block/BlockStore';
import TransactionService from '../../services/transaction/TransactionService';
import SceneService from '../../components/scene/service/SceneService';
import SceneServiceImpl from '../../components/scene/service/SceneServiceImpl';

class RayTool extends Tool {
  constructor(store: BlockStore, update: TransactionService, scene: SceneStore) {
    super(store, update, ToolName.RayHelper);

    this.scene = scene;
    this.sceneService = new SceneServiceImpl(store, this.scene);
  }

  onPointerDown({ eventObject, clientX, clientY }: ToolInfo) {
    const [intersection, ray] = this.sceneService.intersection([eventObject?.userData.modelId || ''], clientX, clientY);

    if (!intersection) {
      return;
    }

    if (this.arrow) {
      this.scene.getScene().remove(this.arrow);
    }

    const arrow = new ArrowHelper(ray.direction, ray.origin, intersection[0].meshes[0].distance, 0xff0000);

    this.scene.getScene().add(arrow);

    this.arrow = arrow;

    // if (!cable) {
    //   const newMesh = MeshCreator.create(cableBlock, { points: [[point.x, point.y, point.z]] });
    //   this.store.dispatch(addMesh(newMesh));
    //   this.store.dispatch(setSelectedBlocks([newMesh.id]));
    // } else {
    //   const newMesh = {
    //     ...meshes[cable],
    //     points: [...meshes[cable].points, [point.x, point.y, point.z]],
    //   };

    //   this.store.dispatch(updateMesh(newMesh));
    // }
  }

  private scene: SceneStore;

  private sceneService: SceneService;

  private arrow: ArrowHelper | undefined;
}

export default RayTool;
