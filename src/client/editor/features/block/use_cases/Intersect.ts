import { Intersection, Object3D, Ray, Raycaster, Vector2 } from 'three';
import SceneStore from '../../scene/SceneStore';

class Intersect {
  constructor(sceneStore: SceneStore) {
    this.sceneStore = sceneStore;
  }

  calculate(mesh: Object3D, clientX: number, clientY: number): [Intersection<Object3D>[] | undefined, Ray] {
    const raycaster = new Raycaster();

    const pointer = new Vector2();
    const { height, width, left, top } = this.sceneStore.getCanvasElement().getBoundingClientRect();
    pointer.x = ((clientX - left) / width) * 2 - 1;
    pointer.y = -((clientY - top) / height) * 2 + 1;

    raycaster.setFromCamera(pointer, this.sceneStore.getCamera());

    const intersects = raycaster.intersectObjects(mesh.children.length > 0 ? mesh.children : [mesh], false);

    if (intersects.length) {
      return [intersects, raycaster.ray];
    }

    return [[], raycaster.ray];
  }

  private sceneStore: SceneStore;
}

export default Intersect;
