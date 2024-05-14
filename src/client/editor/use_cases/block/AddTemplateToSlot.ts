import MeshUtils from '@/client/editor/utils/MeshUtils';
import SceneStore from '../../components/scene/SceneStore';
import BlockStore from '../../stores/block/BlockStore';
import { Vector3 } from 'three';
import Edit from '../../services/update/Edit';
import { BlockName } from '@/client/editor/types/BlockType';
import Block from '../../types/Block';
import VectorUtils from '../../utils/vectorUtils';
import { toDegree } from '../../utils/mathUtils';

class AddTemplateToSlot {
  constructor(blockStore: BlockStore, sceneStore: SceneStore) {
    this.blockStore = blockStore;

    this.sceneStore = sceneStore;
  }

  perform(edit: Edit, templateName: string) {
    const partNames = this.blockStore.getSelectedPartNames();

    const blockId = Object.keys(partNames)[0];

    if (!blockId) {
      return;
    }

    const partName = partNames[blockId][0];

    const block = this.blockStore.getBlocks()[blockId];

    const slotInfo = block.slots[partName];

    if (slotInfo?.slots) {
      this.snapSlotToSlot(edit, block, partName, templateName);
    } else {
      this.snapSlotToBlock(edit, block, partName, templateName);
    }
  }

  private snapSlotToSlot(edit: Edit, block: Block, slot: string, templateName: string) {
    const template = this.blockStore.getTemplateByName(templateName);

    const slotInfo = block.slots[slot];

    const targetSlotName = slotInfo.slots?.find((acceptedSlotName) => template?.slots[acceptedSlotName]);
    const targetPosition = template?.parts.find((part) => part.name === targetSlotName)?.position;

    if (!targetPosition) {
      return;
    }

    const mesh = this.sceneStore.getObj3d(block.id);

    const partMesh = MeshUtils.findByName(mesh, slot);
    const pos = new Vector3();
    partMesh.getWorldPosition(pos);

    const rotation = slotInfo.rotation || 0;

    const finalRotation = rotation + toDegree(block.rotation[1]);
    const targetPos = VectorUtils.rotate(targetPosition, finalRotation);

    edit.create(templateName as BlockName, {
      position: VectorUtils.sub([pos.x, pos.y, pos.z], targetPos || [0, 0, 0]),
      rotation: [0, finalRotation, 0],
    });
  }

  private snapSlotToBlock(edit: Edit, block: Block, slot: string, templateName: string) {
    const mesh = this.sceneStore.getObj3d(block.id);

    const partMesh = MeshUtils.findByName(mesh, slot);
    const pos = new Vector3();
    partMesh.getWorldPosition(pos);

    const orientation = block.parts.find((part) => part.name === slot)?.orientation || 0;

    if (templateName) {
      edit.create(templateName as BlockName, {
        parent: block.id,
        position: [pos.x, pos.y, pos.z],
        rotation: [0, orientation, 0],
        slotTarget: {
          blockId: block.id,
          slotName: slot,
        },
      });

      const lastBlock = edit.getLastBlock();

      edit.updateBlock(block.id, {
        children: [lastBlock.id],
        slotSources: [{ slotName: slot, blockId: lastBlock.id }],
      });
    }
  }

  private blockStore: BlockStore;

  private sceneStore: SceneStore;
}

export default AddTemplateToSlot;
