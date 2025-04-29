import BlockType from '@/client/editor/models/BlockType';
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

  setLastModifiedBlock(block: BlockType) {
    this.lastModifiedBlock = block;
  }

  setLastCreatedBlock(block: BlockType) {
    this.lastCreatedBlock = block;
  }

  addTestData(key: string, value: unknown) {
    this.storedTestData[key] = value;
  }

  storedTestData: Record<string, unknown> = {};

  private plane: Mesh | undefined;

  private lastModifiedBlock: BlockType | undefined;

  private lastCreatedBlock: BlockType | undefined;
}

export default TestStore;
