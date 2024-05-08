import Block from '@/client/editor/types/Block';
import { DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three';

class TestStore {
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

  getLastModifiedBlock() {
    if (!this.lastModifiedBlock) {
      throw new Error('No block was modified.');
    }

    return this.lastModifiedBlock;
  }

  setLastModifiedBlock(block: Block) {
    this.lastModifiedBlock = block;
  }

  private plane: Mesh | undefined;

  private lastModifiedBlock: Block | undefined;
}

export default TestStore;
