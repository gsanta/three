import Tool, { ToolInfo } from '@/client/editor/features/tool/service/Tool';
import ToolName from '@/client/editor/features/tool/state/ToolName';
import { ArrowHelper } from 'three';
import SceneStore from '@/client/editor/features/scene/SceneStore';
import Intersect from '../Intersect';
import BlockStore from '../../BlockStore';
import UpdateService from '../../services/update/UpdateService';

class RayTool extends Tool {
  constructor(store: BlockStore, update: UpdateService, scene: SceneStore) {
    super(store, update, ToolName.RayHelper);

    this.scene = scene;
  }

  onPointerDown({ eventObjectName, clientX, clientY }: ToolInfo) {
    const canvasElement = this.scene.getCanvasElement();
    const camera = this.scene.getCamera();
    const mesh = this.scene.getMesh(eventObjectName);

    if (!mesh) {
      return;
    }

    const intersect = new Intersect(canvasElement, camera);

    const [intersection, ray] = intersect.calculate(mesh, clientX, clientY);

    if (!intersection) {
      return;
    }

    if (this.arrow) {
      this.scene.getScene().remove(this.arrow);
    }

    const arrow = new ArrowHelper(ray.direction, ray.origin, intersection.distance, 0xff0000);
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

  private arrow: ArrowHelper | undefined;
}

export default RayTool;
