import { Camera, Intersection, Mesh, Object3D, Ray, Raycaster, Vector2, Vector3 } from 'three';

class Intersect {
  constructor(canvasElement: HTMLCanvasElement, camera: Camera) {
    this.canvasElement = canvasElement;
    this.camera = camera;
  }

  calculate(mesh: Mesh, clientX: number, clientY: number): [Intersection<Object3D> | undefined, Ray] {
    const raycaster = new Raycaster();

    const pointer = new Vector2();
    const { height, width, left, top } = this.canvasElement.getBoundingClientRect();
    pointer.x = ((clientX - left) / width) * 2 - 1;
    pointer.y = -((clientY - top) / height) * 2 + 1;

    raycaster.setFromCamera(pointer, this.camera);

    const intersects = raycaster.intersectObjects([mesh], false);

    if (intersects.length) {
      console.log(intersects[0].point);
      return [intersects[0], raycaster.ray];
    }

    console.log('not intersecting');

    return [undefined, raycaster.ray];
  }

  private camera: Camera;

  private canvasElement: HTMLCanvasElement;
}

export default Intersect;
