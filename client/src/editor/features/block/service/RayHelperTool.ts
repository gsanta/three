import { Store } from '@/common/utils/store';
import Tool, { ToolInfo } from '@/editor/services/tool/service/Tool';
import ToolName from '@/editor/services/tool/state/ToolName';
import { ArrowHelper } from 'three';
import SceneService from '@/editor/services/scene/SceneService';
import Intersect from './Intersect';

class RayHelperTool extends Tool {
  constructor(store: Store, scene: SceneService) {
    super(store, ToolName.RayHelper);

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

  private scene: SceneService;

  private arrow: ArrowHelper | undefined;
}

export default RayHelperTool;
