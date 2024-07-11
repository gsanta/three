import SceneStore from '../../components/scene/SceneStore';
import MeshUtils from '../../utils/MeshUtils';
import MathUtils, { toDegree } from '../../utils/mathUtils';
import FactoryService from '../../services/factory/FactoryService';
import BlockStore from '../../stores/block/BlockStore';
import Edit from '../../services/update/Edit';

class AddBlockToSlot {
  constructor(blockStore: BlockStore, factoryService: FactoryService, sceneStore: SceneStore) {
    this.blockStore = blockStore;
    this.factoryService = factoryService;
    this.sceneStore = sceneStore;
  }

  perform(edit: Edit, targetBlockId: string, targetPartIndex: string, templateName: string) {
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
      stationedOn: {
        blockId: targetBlock.id,
        partIndex: targetPartIndex,
      },
      rotation: [0, finalRotation, 0],
    });

    const newBlock = edit.getLastBlock();

    edit.updateBlock(
      targetBlockId,
      {
        children: [newBlock.id],
        stationFor: [
          {
            blockId: newBlock.id,
          },
        ],
      },
      { arrayMergeStrategy: 'merge' },
    );

    return newBlock;
  }

  private blockStore: BlockStore;

  private factoryService: FactoryService;

  private sceneStore: SceneStore;
}

export default AddBlockToSlot;
