import SceneStore from '@/client/editor/components/scene/SceneStore';
import BaseMesh from './BaseMesh';
import ChildMesh from './ChildMesh';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import Block from '@/client/editor/types/Block';

class ModelMesh extends BaseMesh {
  constructor(block: Block, blockStore: BlockStore, sceneStore: SceneStore) {
    super(block, blockStore, sceneStore);

    this.children = block.parts.map((part) => new ChildMesh(this, block, part.index || ''));
  }
}

export default ModelMesh;
