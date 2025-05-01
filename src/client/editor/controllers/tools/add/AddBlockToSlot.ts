import SceneStore from '@/client/editor/ui/scene/SceneStore';
import AddBlock from './AddBlock';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import MeshUtils from '@/client/editor/utils/MeshUtils';
import MathUtils, { toDegree } from '@/client/editor/utils/mathUtils';

class AddBlockToSlot extends AddBlock {
  constructor(factoryService: FactoryService, sceneStore: SceneStore) {
    super('add-block-to-slot');

    this.factoryService = factoryService;
    this.sceneStore = sceneStore;
  }

  perform({ edit, newBlockType, targetBlock, targetPartIndex }: Parameters<AddBlock['perform']>[0]) {
    if (!targetBlock) {
      throw new Error("'targetBlock' is undefined");
    }

    if (!targetPartIndex) {
      throw new Error("'targetPartIndex' is undefined");
    }

    const mesh = this.sceneStore.getObj3d(targetBlock?.id);
    const targetPart = targetBlock.partDetails[targetPartIndex];
    const targetPartMesh = MeshUtils.findByName(mesh, targetPart?.name || '');

    const sourcePartPos = targetPartMesh.position;
    const sourcePartOrientation = targetBlock.partDetails[targetPartIndex]?.orientation || 0;
    const finalRotation = MathUtils.normalizeAngle(toDegree(targetBlock.rotation[1]) + sourcePartOrientation);

    this.factoryService.create(edit, newBlockType.type, {
      block: {
        parentConnection: {
          block: targetBlock.id,
          part: targetPartIndex,
        },
        position: [sourcePartPos.x, sourcePartPos.y, sourcePartPos.z],
        rotation: [0, finalRotation, 0],
      },
    });

    const newBlock = edit.getLastBlock();

    edit.updateBlock(
      targetBlock.id,
      {
        childConnections: [
          {
            childBlock: newBlock.id,
          },
        ],
      },
      { arrayMergeStrategy: 'merge' },
    );

    return edit;
  }

  private factoryService: FactoryService;

  private sceneStore: SceneStore;
}

export default AddBlockToSlot;
