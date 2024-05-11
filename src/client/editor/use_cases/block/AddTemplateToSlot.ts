import MeshUtils from '@/client/editor/utils/MeshUtils';
import SceneStore from '../../components/scene/SceneStore';
import BlockStore from '../../stores/block/BlockStore';
import { Vector3 } from 'three';
import Edit from '../../services/update/Edit';
import { BlockName } from '@/client/editor/types/BlockType';

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

    const mesh = this.sceneStore.getObj3d(blockId);

    if (!mesh) {
      return;
    }

    const partName = partNames[blockId][0];

    const partMesh = MeshUtils.findByName(mesh, partName);
    const pos = new Vector3();
    partMesh.getWorldPosition(pos);

    const block = this.blockStore.getBlocks()[blockId];

    const orientation = block.parts.find((part) => part.name === partName)?.orientation || 0;

    if (templateName) {
      edit.create(templateName as BlockName, {
        parent: blockId,
        position: [pos.x, pos.y, pos.z],
        rotation: [0, orientation, 0],
        slotTarget: {
          blockId: blockId,
          slotName: partName,
        },
      });

      const lastBlock = edit.getLastBlock();

      edit.updateBlock(blockId, {
        children: [lastBlock.id],
        slotSources: [{ slotName: partName, blockId: lastBlock.id }],
      });
    }
  }

  private blockStore: BlockStore;

  private sceneStore: SceneStore;
}

export default AddTemplateToSlot;
