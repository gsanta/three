import BaseMesh from './BaseMesh';
import ChildMesh from './ChildMesh';
import Block from '@/client/editor/types/Block';

class ModelMesh extends BaseMesh {
  constructor(block: Block) {
    super(block);

    this.children = block.parts.map((part) => new ChildMesh(this, block, part.index || ''));
  }
}

export default ModelMesh;