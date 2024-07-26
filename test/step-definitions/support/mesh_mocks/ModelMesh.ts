import SceneStore from '@/client/editor/components/scene/SceneStore';
import BaseMesh from './BaseMesh';
import ChildMesh from './ChildMesh';
import BlockStore from '@/client/editor/stores/block/BlockStore';

class ModelMesh extends BaseMesh {
  constructor(blockId: string, blockStore: BlockStore, sceneStore: SceneStore) {
    super(blockId, blockStore, sceneStore);

    const block = blockStore.getBlock(blockId);
    this.children = block.parts.map((part) => new ChildMesh(this, block, part.index || ''));
  }
}

export default ModelMesh;
