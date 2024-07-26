import Block from '@/client/editor/types/Block';
import BaseMesh from './mesh_mocks/BaseMesh';
import ModelMesh from './mesh_mocks/ModelMesh';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import BlockStore from '@/client/editor/stores/block/BlockStore';

class TestMeshFactory {
  constructor(blockStore: BlockStore, sceneStore: SceneStore) {
    this.blockStore = blockStore;
    this.sceneStore = sceneStore;
  }

  create(block: Block): BaseMesh {
    if (block.parts) {
      return new ModelMesh(block.id, this.blockStore, this.sceneStore);
    }
    return new BaseMesh(block.id, this.blockStore, this.sceneStore);
  }

  private blockStore: BlockStore;

  private sceneStore: SceneStore;
}

export default TestMeshFactory;
