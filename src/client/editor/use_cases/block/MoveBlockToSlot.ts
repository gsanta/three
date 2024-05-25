import { Vector3 } from 'three';
import SceneStore from '../../components/scene/SceneStore';
import Edit from '../../services/update/Edit';
import BlockStore from '../../stores/block/BlockStore';
import Block from '../../types/Block';
import MeshUtils from '../../utils/MeshUtils';
import MathUtils, { toDegree } from '../../utils/mathUtils';

class MoveBlockToSlot {
  constructor(blockStore: BlockStore, sceneStore: SceneStore) {
    this.blockStore = blockStore;
    this.sceneStore = sceneStore;
  }

  perform(edit: Edit, sourceBlock: Block, sourcePartName: string) {
    const targetBlockId = sourceBlock.slotSources.find((source) => source.slotName === sourcePartName)?.blockId;

    if (!targetBlockId) {
      return;
    }

    const targetBlock = this.blockStore.getBlock(targetBlockId);

    const mesh = this.sceneStore.getObj3d(sourceBlock.id);
    const sourcePartMesh = MeshUtils.findByName(mesh, sourcePartName);
    const sourcePart = sourceBlock.parts.find((part) => part.name === sourcePartName);

    const sourcePartPos = new Vector3();
    sourcePartMesh.getWorldPosition(sourcePartPos);

    const sourcePartOrientation = sourceBlock.partDetails[sourcePart?.index || '']?.orientation || 0;
    const finalRotation = MathUtils.normalizeAngle(toDegree(sourceBlock.rotation[1]) + sourcePartOrientation);

    edit.updateBlock(targetBlock.id, {
      position: [sourcePartPos.x, sourcePartPos.y, sourcePartPos.z],
      rotation: [0, finalRotation, 0],
    });
  }

  private blockStore: BlockStore;

  private sceneStore: SceneStore;
}

export default MoveBlockToSlot;
