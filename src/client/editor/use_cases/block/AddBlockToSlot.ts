import SceneStore from '../../components/scene/SceneStore';
import MeshUtils from '../../utils/MeshUtils';
import MathUtils, { toDegree } from '../../utils/mathUtils';
import FactoryService from '../../services/factory/FactoryService';
import BlockStore from '../../stores/block/BlockStore';
import TransactionService from '../../services/transaction/TransactionService';

class AddBlockToSlot {
  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneStore: SceneStore,
    updateService: TransactionService,
  ) {
    this.blockStore = blockStore;
    this.factoryService = factoryService;
    this.sceneStore = sceneStore;
    this.updateService = updateService;
  }

  perform(targetBlockId: string, targetPartIndex: string, templateName: string) {
    const edit = this.updateService.getTransaction();
    const targetBlock = this.blockStore.getBlocks()[targetBlockId];

    const mesh = this.sceneStore.getObj3d(targetBlock.id);
    const targetPart = targetBlock.partDetails[targetPartIndex];
    const targetPartMesh = MeshUtils.findByName(mesh, targetPart?.name || '');

    const sourcePartPos = targetPartMesh.position;
    const sourcePartOrientation = targetBlock.partDetails[targetPartIndex]?.orientation || 0;
    const finalRotation = MathUtils.normalizeAngle(toDegree(targetBlock.rotation[1]) + sourcePartOrientation);

    this.factoryService.create(edit, templateName, {
      parent: targetBlock.id,
      position: [sourcePartPos.x, sourcePartPos.y, sourcePartPos.z],
      rotation: [0, finalRotation, 0],
      place: targetPartIndex,
    });

    const newBlock = edit.getLastBlock();

    edit.updateBlock(targetBlockId, {
      children: [newBlock.id],
      partDetails: {
        [targetPartIndex]: {
          connectedTo: {
            blockId: newBlock.id,
          },
        },
      },
    });

    edit.commit();
  }

  private blockStore: BlockStore;

  private factoryService: FactoryService;

  private sceneStore: SceneStore;

  private updateService: TransactionService;
}

export default AddBlockToSlot;
