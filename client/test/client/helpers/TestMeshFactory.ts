import Block from '@/client/editor/types/Block';
import BaseMesh from './mesh_mocks/BaseMesh';
import PoleMesh from './mesh_mocks/PoleMesh';

class TestMeshFactory {
  create(block: Block): BaseMesh {
    if (block.category === 'poles') {
      return new PoleMesh(block);
    }
    return new BaseMesh(block);
  }
}

export default TestMeshFactory;
