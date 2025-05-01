import BlockData from '@/client/editor/data/BlockData';
import BaseMesh from './mesh_mocks/BaseMesh';
import ModelMesh from './mesh_mocks/ModelMesh';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import UpdateService from '@/client/editor/services/update/UpdateService';

class TestMeshFactory {
  constructor(blockStore: BlockStore, sceneStore: SceneStore, updateService: UpdateService) {
    this.blockStore = blockStore;
    this.sceneStore = sceneStore;
    this.updateService = updateService;
  }

  create(block: BlockData): BaseMesh {
    if (block.parts) {
      return new ModelMesh(block, this.blockStore, this.sceneStore, this.updateService);
    }
    return new BaseMesh(block, this.blockStore, this.sceneStore, this.updateService);
  }

  private blockStore: BlockStore;

  private sceneStore: SceneStore;

  private updateService: UpdateService;
}

export default TestMeshFactory;
