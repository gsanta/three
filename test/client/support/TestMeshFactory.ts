import Block from '@/client/editor/types/Block';
import BaseMesh from './mesh_mocks/BaseMesh';
import PoleMesh from './mesh_mocks/PoleMesh';
import ModelMesh from './mesh_mocks/ModelMesh';

class TestMeshFactory {
  create(block: Block): BaseMesh {
    if (block.category === 'poles') {
      return new PoleMesh(block);
    } else if (block.parts) {
      return new ModelMesh(block);
    }
    return new BaseMesh(block);
  }
}

export default TestMeshFactory;
