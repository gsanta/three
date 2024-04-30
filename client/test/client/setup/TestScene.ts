import { DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three';

class TestScene {
  setup() {
    const geometry = new PlaneGeometry(1, 1);
    const material = new MeshBasicMaterial({ color: 0xffff00, side: DoubleSide });
    this.plane = new Mesh(geometry, material);
  }

  getPlane(): Mesh {
    if (!this.plane) {
      throw new Error('Scene is not setup');
    }

    return this.plane;
  }

  private plane: Mesh | undefined;
}

export default TestScene;
