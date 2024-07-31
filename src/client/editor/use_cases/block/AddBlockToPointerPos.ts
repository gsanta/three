import SceneStore from '../../components/scene/SceneStore';
import FactoryService from '../../services/factory/FactoryService';
import BlockStore from '../../stores/block/BlockStore';
import SceneService from '../../components/scene/service/SceneService';
import MeshUtils from '../../utils/MeshUtils';
import { MathUtils } from 'three';
import Num3 from '../../types/Num3';
import VectorUtils from '../../utils/vectorUtils';
import Edit from '../../services/update/Edit';

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
    const targetPart = targetBlock.partDetails[targetPartIndex];
    const targetPartMesh = MeshUtils.findByName(mesh, targetPart?.name || 'root');

    const [intersections] = this.sceneService.intersection([targetPartMesh], clientX, clientY);

    if (intersections?.length) {
      const intersection = intersections[0];

      const rootBlock = this.blockStore.getRootBlock(targetBlockId);

      const targetPos = VectorUtils.sub(intersection.meshes[0].point, rootBlock.position);

      this.factoryService.create(edit, templateName, {
        block: {
          parentConnection: {
            block: targetBlock.id,
          },
          position: targetPos,
          rotation: targetBlock.rotation.map((rot) => MathUtils.radToDeg(rot)) as Num3,
        },
      });

      const lastBlock = edit.getLastBlock();

      edit.updateBlock(rootBlock.id, {
        childConnections: [{ childBlock: lastBlock.id }],
      });
    }
  }

  private blockStore: BlockStore;

  private factoryService: FactoryService;

  private sceneService: SceneService;

  private sceneStore: SceneStore;
}

export default AddBlockToPointerPos;
