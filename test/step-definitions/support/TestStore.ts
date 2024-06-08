import Block from '@/client/editor/types/Block';
import { DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three';

class TestStore {
  storedBlockId?: string;

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

  getLastCreatedBlock() {
    if (!this.lastCreatedBlock) {
      throw new Error('No block was created.');
    }

    return this.lastCreatedBlock;
  }

  setLastModifiedBlock(block: Block) {
    this.lastModifiedBlock = block;
  }

  setLastCreatedBlock(block: Block) {
    this.lastCreatedBlock = block;
  }

  storedTestData: Record<string, unknown> = {};

  private plane: Mesh | undefined;

  private lastModifiedBlock: Block | undefined;

  private lastCreatedBlock: Block | undefined;
}

export default TestStore;
