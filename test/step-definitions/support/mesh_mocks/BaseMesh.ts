import { Vector3 } from 'three';
import AbstractMesh from './AbstractMesh';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import BlockType from '@/client/editor/types/BlockType';
import UpdateService from '@/client/editor/services/update/UpdateService';

class BaseMesh extends AbstractMesh {
  constructor(
    block: BlockType,
    blockStore: BlockStore,
    sceneStore: SceneStore,
    updateService: UpdateService,
    name?: string,
  ) {
    super(name);
    this.blockStore = blockStore;
    this.blockId = block.id;
    this.name = name;
    this.userData = {
      modelId: block.id,
    };
    this.sceneStore = sceneStore;
    this.updateService = updateService;
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

  getRotation() {
    return this.blockStore.getBlock(this.blockId).rotation;
  }

  render() {
    const block = this.blockStore.getBlock(this.blockId);
    if (block.isDirty) {
      this.updateService.updateDirtyBlock(block.id);
    }
  }

  protected blockId: string;

  private sceneStore: SceneStore;

  protected blockStore: BlockStore;

  private updateService: UpdateService;
}

export default BaseMesh;
