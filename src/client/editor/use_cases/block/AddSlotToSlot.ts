import SceneStore from '../../components/scene/SceneStore';
import FactoryService from '../../services/factory/FactoryService';
import BlockUtils from '../../utils/BlockUtils';
import MeshUtils from '../../utils/MeshUtils';
import VectorUtils from '../../utils/vectorUtils';
import MathUtils from '../../utils/mathUtils';
import BlockStore from '../../stores/block/BlockStore';
import { Vector3 } from 'three';
import TransactionService from '../../services/transaction/TransactionService';
import Edit from '../../services/transaction/Edit';

class AddSlotToSlot {
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

  perform(edit: Edit, targetBlockId: string, targetPartIndex: string, templateName: string) {
    const block = this.blockStore.getBlocks()[targetBlockId];

    const template = this.blockStore.getBlockType(templateName);

    if (!template) {
      return;
    }

    const rotatedPart = BlockUtils.findMatchingSlot(block, targetPartIndex, template);

    if (!rotatedPart) {
      return;
    }

    const { part: targetPart, rotation: targetRotation } = rotatedPart;

    const mesh = this.sceneStore.getObj3d(block.id);

    const targetPartInfo = block.partDetails[targetPartIndex];
    const partMesh = MeshUtils.findByName(mesh, targetPartInfo?.name);
    const pos = new Vector3();
    partMesh.getWorldPosition(pos);

    // const finalRotation = rotation + toDegree(block.rotation[1]);
    const targetPos = VectorUtils.rotate(targetPart.position || [0, 0, 0], targetRotation) || [0, 0, 0];
    const targetX = -targetPos[0];
    const targetZ = -targetPos[2];
    const targetY = -targetPos[1];

    const targetPartOrientation = template.partDetails[targetPart.name]?.orientation || 0;
    const idealNextPartOrientation = MathUtils.normalizeAngle(targetPartOrientation + 180);
    let idealNextSelectedPart = template.parts.find(
      (part) => template.partDetails[part.name]?.orientation === idealNextPartOrientation,
    );

    if (!idealNextSelectedPart) {
      idealNextSelectedPart = template.parts
        .filter((part) => template.partDetails[part.name]?.role === 'slot')
        .find((part) => part.name !== targetPart.name);
    }

    edit.select(null);

    this.factoryService.create(edit, templateName, {
      block: {
        position: VectorUtils.add([pos.x, pos.y, pos.z], [targetX, targetY, targetZ] || [0, 0, 0]),
        rotation: [0, targetRotation, 0],
      },
    });

    edit.select(edit.getLastBlock().id, idealNextSelectedPart?.name);
  }

  private blockStore: BlockStore;

  private factoryService: FactoryService;

  private sceneStore: SceneStore;

  private updateService: TransactionService;
}

export default AddSlotToSlot;
