import SceneStore from '@/client/editor/components/scene/SceneStore';
import BaseMesh from './BaseMesh';
import ChildMesh from './ChildMesh';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import BlockData from '@/client/editor/data/BlockData';
import UpdateService from '@/client/editor/services/update/UpdateService';

class ModelMesh extends BaseMesh {
  constructor(block: BlockData, blockStore: BlockStore, sceneStore: SceneStore, updateService: UpdateService) {
    super(block, blockStore, sceneStore, updateService);

    this.children = block.parts.map((part) => new ChildMesh(this, block, part.name));
  }
}

export default ModelMesh;
