import { Vector3 } from 'three';
import AbstractMesh from './AbstractMesh';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import BlockStore from '@/client/editor/stores/block/BlockStore';

class BaseMesh extends AbstractMesh {
  constructor(blockId: string, blockStore: BlockStore, sceneStore: SceneStore, name?: string) {
    super(name);
    this.blockStore = blockStore;
    this.blockId = blockId;
    this.name = name;
    this.userData = {
      modelId: blockId,
    };
    this.sceneStore = sceneStore;
  }

  getWorldPosition(vec3: Vector3) {
    const block = this.blockStore.getBlock(this.blockId);
    if (block.parentConnection) {
      this.sceneStore.getObj3d(block.parentConnection.block).getWorldPosition(vec3);
    }
    vec3.x += block.position[0];
    vec3.y += block.position[1];
    vec3.z += block.position[2];
  }

  userData: {
    modelId: string;
  };

  private blockId: string;

  private sceneStore: SceneStore;

  private blockStore: BlockStore;
}

export default BaseMesh;
