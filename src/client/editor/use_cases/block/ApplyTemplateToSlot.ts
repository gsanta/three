import MeshUtils from '@/client/editor/utils/MeshUtils';
import SceneStore from '../../components/scene/SceneStore';
import BlockStore from '../../stores/block/BlockStore';
import { Vector3 } from 'three';
import Edit from '../../services/update/Edit';
import { BlockName } from '@/client/editor/types/BlockType';
import Block from '../../types/Block';
import VectorUtils from '../../utils/vectorUtils';
import BlockUtils from '../../utils/BlockUtils';
import MathUtils from '../../utils/mathUtils';
import AddBlockToSlot from './AddBlockToSlot';

class ApplyTemplateToSlot {
  constructor(blockStore: BlockStore, sceneStore: SceneStore) {
    this.blockStore = blockStore;

    this.sceneStore = sceneStore;

    this.addBlockToSlot = new AddBlockToSlot(sceneStore);
  }

  perform(edit: Edit, templateName: string) {
    const partNames = this.blockStore.getSelectedPartNames();

    const blockId = Object.keys(partNames)[0];

    if (!blockId) {
      return;
    }

    const partName = partNames[blockId][0];

    const block = this.blockStore.getBlocks()[blockId];

    const template = this.blockStore.getTemplateByName(templateName);

    const hasTargetSlot = template?.parts.find((part) => template.partDetails[part.index]?.role === 'slot');

    if (hasTargetSlot) {
      this.snapSlotToSlot(edit, block, partName, templateName);
    } else {
      this.addBlockToSlot.perform(edit, block, partName, templateName);
    }
  }

  private snapSlotToSlot(edit: Edit, block: Block, partName: string, templateName: string) {
    const template = this.blockStore.getTemplateByName(templateName);

    if (!template) {
      return;
    }

    const rotatedPart = BlockUtils.findMatchingSlot(block, partName, template);

    if (!rotatedPart) {
      return;
    }

    const { part: targetPart, rotation: targetRotation } = rotatedPart;

    const mesh = this.sceneStore.getObj3d(block.id);

    const partMesh = MeshUtils.findByName(mesh, partName);
    const pos = new Vector3();
    partMesh.getWorldPosition(pos);

    // const finalRotation = rotation + toDegree(block.rotation[1]);
    const targetPos = VectorUtils.rotate(targetPart.position || [0, 0, 0], targetRotation) || [0, 0, 0];
    const targetX = -targetPos[0];
    const targetZ = -targetPos[2];
    const targetY = -targetPos[1];

    const targetPartOrientation = template.partDetails[targetPart.index]?.orientation || 0;
    const idealNextPartOrientation = MathUtils.normalizeAngle(targetPartOrientation + 180);
    let idealNextSelectedPart = template.parts.find(
      (part) => template.partDetails[part.index]?.orientation === idealNextPartOrientation,
    );

    if (!idealNextSelectedPart) {
      idealNextSelectedPart = template.parts
        .filter((part) => template.partDetails[part.index]?.role === 'slot')
        .find((part) => part.name !== targetPart.name);
    }

    edit
      .select(null)
      .create(templateName as BlockName, {
        position: VectorUtils.add([pos.x, pos.y, pos.z], [targetX, targetY, targetZ] || [0, 0, 0]),
        rotation: [0, targetRotation, 0],
      })
      .select(edit.getLastBlock().id, idealNextSelectedPart?.name);
  }

  private blockStore: BlockStore;

  private sceneStore: SceneStore;

  private addBlockToSlot: AddBlockToSlot;
}

export default ApplyTemplateToSlot;
