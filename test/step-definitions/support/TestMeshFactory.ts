import Block from '@/client/editor/types/Block';
import BaseMesh from './mesh_mocks/BaseMesh';
import ModelMesh from './mesh_mocks/ModelMesh';
import SceneStore from '@/client/editor/components/scene/SceneStore';

class TestMeshFactory {
  create(block: Block, sceneStore: SceneStore): BaseMesh {
    if (block.parts) {
      return new ModelMesh(block, sceneStore);
    }
    return new BaseMesh(block, sceneStore);
  }
}

export default TestMeshFactory;
