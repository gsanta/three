import SceneStore from '@/client/editor/ui/scene/SceneStore';
import BaseMesh from './BaseMesh';
import ChildMesh from './ChildMesh';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import BlockData from '@/client/editor/models/block/BlockData';
import SceneService from '@/client/editor/ui/scene/service/SceneService';
import UpdateService from '@/client/editor/services/update/UpdateService';

class ModelMesh extends BaseMesh {
  constructor(
    block: BlockData,
    blockStore: BlockStore,
    sceneStore: SceneStore,
    sceneService: SceneService,
    updateService: UpdateService,
  ) {
    super(block, blockStore, sceneStore, sceneService, updateService);

    this.children = block.parts.map((part) => new ChildMesh(this, block, part.name));
  }
}

export default ModelMesh;
