import BlockData from '@/client/editor/models/block/BlockData';
import BaseMesh from './mesh_mocks/BaseMesh';
import ModelMesh from './mesh_mocks/ModelMesh';
import SceneStore from '@/client/editor/ui/scene/SceneStore';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import SceneService from '@/client/editor/ui/scene/service/SceneService';
import UpdateService from '@/client/editor/services/update/UpdateService';

class TestMeshFactory {
  constructor(
    blockStore: BlockStore,
    sceneStore: SceneStore,
    sceneService: SceneService,
    updateService: UpdateService,
  ) {
    this.blockStore = blockStore;
    this.sceneService = sceneService;
    this.sceneStore = sceneStore;
    this.updateService = updateService;
  }

  create(block: BlockData): BaseMesh {
    if (block.parts) {
      return new ModelMesh(block, this.blockStore, this.sceneStore, this.sceneService, this.updateService);
    }
    return new BaseMesh(block, this.blockStore, this.sceneStore, this.sceneService, this.updateService);
  }

  private blockStore: BlockStore;

  private sceneService: SceneService;

  private sceneStore: SceneStore;

  private updateService: UpdateService;
}

export default TestMeshFactory;
