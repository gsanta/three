import SceneStore from '../../components/scene/SceneStore';
import FactoryService from '../../services/factory/FactoryService';
import BlockStore from '../../stores/block/BlockStore';
import SceneService from '../../components/scene/service/SceneService';
import MeshUtils from '../../utils/MeshUtils';
import { MathUtils } from 'three';
import TransactionService from '../../services/transaction/TransactionService';
import Num3 from '../../types/Num3';
import VectorUtils from '../../utils/vectorUtils';

class AddBlockToPointerPos {
  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneService: SceneService,
    sceneStore: SceneStore,
    update: TransactionService,
  ) {
    this.blockStore = blockStore;
    this.factoryService = factoryService;
    this.sceneService = sceneService;
    this.sceneStore = sceneStore;
    this.update = update;
  }

  perform(targetBlockId: string, targetPartIndex: string, templateName: string, clientX: number, clientY: number) {
    const edit = this.update.getTransaction();
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
        parent: targetBlock.id,
        position: targetPos,
        rotation: targetBlock.rotation.map((rot) => MathUtils.radToDeg(rot)) as Num3,
      });

      const lastBlock = edit.getLastBlock();

      edit.updateBlock(rootBlock.id, {
        children: [lastBlock.id],
      });
    }

    edit.commit();
  }

  private blockStore: BlockStore;

  private factoryService: FactoryService;

  private sceneService: SceneService;

  private sceneStore: SceneStore;

  private update: TransactionService;
}

export default AddBlockToPointerPos;
