import SceneStore from '../../components/scene/SceneStore';
import FactoryService from '../../services/factory/FactoryService';
import Edit from '../../services/update/Edit';
import BlockUtils from '../../utils/BlockUtils';
import MeshUtils from '../../utils/MeshUtils';
import VectorUtils from '../../utils/vectorUtils';
import MathUtils from '../../utils/mathUtils';
import BlockStore from '../../stores/block/BlockStore';
import { Vector3 } from 'three';

class AddSlotToSlot {
  constructor(blockStore: BlockStore, factoryService: FactoryService, sceneStore: SceneStore) {
    this.blockStore = blockStore;
    this.factoryService = factoryService;
    this.sceneStore = sceneStore;
  }

  perform(edit: Edit, targetBlockId: string, targetPartIndex: string, templateName: string) {
    const block = this.blockStore.getBlocks()[targetBlockId];

    const template = this.blockStore.getTemplateByType(templateName);

    if (!template) {
      return;
    }

    const rotatedPart = BlockUtils.findMatchingSlot(block, targetPartIndex, template);

    if (!rotatedPart) {
      return;
    }

    const { part: targetPart, rotation: targetRotation } = rotatedPart;

    const mesh = this.sceneStore.getObj3d(block.id);

    const partMesh = MeshUtils.findByName(mesh, targetPartIndex);
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

    edit.select(null);

    this.factoryService.create(edit, templateName, {
      position: VectorUtils.add([pos.x, pos.y, pos.z], [targetX, targetY, targetZ] || [0, 0, 0]),
      rotation: [0, targetRotation, 0],
    });

    edit.select(edit.getLastBlock().id, idealNextSelectedPart?.index);
  }

  private blockStore: BlockStore;

  private factoryService: FactoryService;

  private sceneStore: SceneStore;
}

export default AddSlotToSlot;
