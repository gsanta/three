import SceneStore from '../../components/scene/SceneStore';
import Edit from '../../services/update/Edit';
import FactoryService from '../../services/factory/FactoryService';
import BlockStore from '../../stores/block/BlockStore';
import SceneService from '../../components/scene/SceneService';
import MeshUtils from '../../utils/MeshUtils';
import { Vector3 } from 'three';

class AddBlockToPointerPos {
  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneService: SceneService,
    sceneStore: SceneStore,
  ) {
    this.blockStore = blockStore;
    this.factoryService = factoryService;
    this.sceneService = sceneService;
    this.sceneStore = sceneStore;
  }

  perform(
    edit: Edit,
    targetBlockId: string,
    targetPartIndex: string,
    templateName: string,
    clientX: number,
    clientY: number,
  ) {
    const targetBlock = this.blockStore.getBlocks()[targetBlockId];

    const mesh = this.sceneStore.getObj3d(targetBlock.id);
    const targetPartMesh = MeshUtils.findByName(mesh, targetPartIndex);
    const vec = new Vector3();
    targetPartMesh.getWorldPosition(vec);

    const [intersections] = this.sceneService.intersection(targetPartMesh, clientX, clientY);

    if (intersections?.length) {
      const intersection = intersections[0];

      const rootBlock = this.blockStore.getRootBlock(targetBlockId);

      const targetPos = intersection.point.sub(new Vector3(...rootBlock.position));

      this.factoryService.create(edit, templateName, {
        parent: targetBlock.id,
        position: [targetPos.x, targetPos.y, targetPos.z],
      });

      const lastBlock = edit.getLastBlock();

      edit.updateBlock(rootBlock.id, {
        children: [lastBlock.id],
      });
    }
  }

  private blockStore: BlockStore;

  private factoryService: FactoryService;

  private sceneService: SceneService;

  private sceneStore: SceneStore;
}

export default AddBlockToPointerPos;
