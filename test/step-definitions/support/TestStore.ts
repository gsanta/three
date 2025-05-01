import BlockData from '@/client/editor/data/BlockData';
import { DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three';

class TestStore {
  storedBlockId?: string;

  setup() {
    const geometry = new PlaneGeometry(1, 1);
    const material = new MeshBasicMaterial({ color: 0xffff00, side: DoubleSide });
    this.plane = new Mesh(geometry, material);
    this.plane.name = 'plane';
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

  setLastModifiedBlock(block: BlockData) {
    this.lastModifiedBlock = block;
  }

  setLastCreatedBlock(block: BlockData) {
    this.lastCreatedBlock = block;
  }

  addTestData(key: string, value: unknown) {
    this.storedTestData[key] = value;
  }

  storedTestData: Record<string, unknown> = {};

  private plane: Mesh | undefined;

  private lastModifiedBlock: BlockData | undefined;

  private lastCreatedBlock: BlockData | undefined;
}

export default TestStore;
