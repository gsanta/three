import { Vector3 } from 'three';
import AbstractMesh from './AbstractMesh';
import SceneStore from '@/client/editor/ui/scene/SceneStore';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import BlockData from '@/client/editor/models/block/BlockData';
import SceneService from '@/client/editor/ui/scene/service/SceneService';
import UpdateService from '@/client/editor/services/update/UpdateService';

class BaseMesh extends AbstractMesh {
  constructor(
    block: BlockData,
    blockStore: BlockStore,
    sceneStore: SceneStore,
    sceneService: SceneService,
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
    this.sceneService = sceneService;
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
    this.sceneService.onMeshRendered(block.id);
  }

  protected blockId: string;

  private sceneService: SceneService;

  private sceneStore: SceneStore;

  protected blockStore: BlockStore;

  private updateService: UpdateService;
}

export default BaseMesh;
