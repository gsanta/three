import Block from '@/client/editor/types/Block';
import BaseMesh from './mesh_mocks/BaseMesh';
import ModelMesh from './mesh_mocks/ModelMesh';

class TestMeshFactory {
  create(block: Block): BaseMesh {
    if (block.parts) {
      return new ModelMesh(block);
    }
    return new BaseMesh(block);
  }
}

export default TestMeshFactory;
