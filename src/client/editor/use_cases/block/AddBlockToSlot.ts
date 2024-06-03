import SceneStore from '../../components/scene/SceneStore';
import Edit from '../../services/update/Edit';
import MeshUtils from '../../utils/MeshUtils';
import MathUtils, { toDegree } from '../../utils/mathUtils';
import FactoryService from '../../services/factory/FactoryService';
import BlockStore from '../../stores/block/BlockStore';

class AddBlockToSlot {
  constructor(blockStore: BlockStore, factoryService: FactoryService, sceneStore: SceneStore) {
    this.blockStore = blockStore;
    this.factoryService = factoryService;
    this.sceneStore = sceneStore;
  }

  perform(edit: Edit, targetBlockId: string, targetPartIndex: string, templateName: string) {
    const targetBlock = this.blockStore.getBlocks()[targetBlockId];

    const mesh = this.sceneStore.getObj3d(targetBlock.id);
    const sourcePartMesh = MeshUtils.findByName(mesh, targetPartIndex);
    const sourcePart = targetBlock.parts.find((part) => part.index === targetPartIndex);

    const sourcePartPos = sourcePartMesh.position;
    const sourcePartOrientation = targetBlock.partDetails[sourcePart?.index || '']?.orientation || 0;
    const finalRotation = MathUtils.normalizeAngle(toDegree(targetBlock.rotation[1]) + sourcePartOrientation);

    this.factoryService.create(edit, templateName, {
      parent: targetBlock.id,
      position: [sourcePartPos.x, sourcePartPos.y, sourcePartPos.z],
      rotation: [0, finalRotation, 0],
      slotTarget: {
        blockId: targetBlock.id,
        slotName: targetPartIndex,
      },
    });

    const lastBlock = edit.getLastBlock();

    edit.updateBlock(targetBlockId, {
      children: [lastBlock.id],
      slotSources: [{ slotName: targetPartIndex, blockId: lastBlock.id }],
    });
  }

  private blockStore: BlockStore;

  private factoryService: FactoryService;

  private sceneStore: SceneStore;
}

export default AddBlockToSlot;
