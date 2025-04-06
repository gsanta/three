import SceneStore from '@/client/editor/components/scene/SceneStore';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import MeshUtils from '@/client/editor/utils/MeshUtils';
import VectorUtils from '@/client/editor/utils/vectorUtils';
import { Vector3 } from 'three';
import AddBlock from './AddBlock';
import MathUtils from '@/client/editor/utils/mathUtils';

class AddSlotToSlot extends AddBlock {
  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneStore: SceneStore,
    updateService: TransactionService,
  ) {
    super('add-slot-to-slot');

    this.blockStore = blockStore;
    this.factoryService = factoryService;
    this.sceneStore = sceneStore;
    this.updateService = updateService;
  }

  perform({
    addMethod,
    edit,
    newBlockType,
    targetBlock,
    targetPartIndex: targetPartName,
  }: Parameters<AddBlock['perform']>[0]) {
    if (!targetBlock) {
      throw new Error('targetBlock is mandatory for addMethod: add-slot-to-slot');
    }

    if (!targetPartName) {
      throw new Error('targetPartIndex is mandatory for addMethod: add-slot-to-slot');
    }

    if (!addMethod.sourcePartRole) {
      throw new Error('sourcePartRole is mandatory for addMethod: add-slot-to-slot');
    }

    if (!newBlockType) {
      return edit;
    }

    const targetPart = targetBlock.parts.find((part) => part.name === targetPartName);

    // const rotatedPart = BlockUtils.findMatchingSlot(targetBlock, targetPartIndex, newBlockType);

    if (!targetPart) {
      return edit;
    }

    // const { part: targetPart, rotation: targetRotation } = rotatedPart;

    const mesh = this.sceneStore.getObj3d(targetBlock.id);

    const partMesh = MeshUtils.findByName(mesh, targetPart?.name);
    const pos = new Vector3();
    partMesh.getWorldPosition(pos);

    // const finalRotation = rotation + toDegree(block.rotation[1]);
    const targetPos = targetPart.position; //VectorUtils.rotate(targetPart.position || [0, 0, 0], targetRotation) || [0, 0, 0];
    const targetX = -targetPos[0];
    const targetZ = -targetPos[2];
    const targetY = -targetPos[1];

    const sourcePartName = Object.entries(newBlockType.partDetails)?.find(([, part]) =>
      part?.roles?.includes(addMethod.sourcePartRole!),
    )?.[0];

    if (!sourcePartName) {
      throw new Error(
        `source with type ${newBlockType.type} does not contain part with role ${addMethod.sourcePartRole}`,
      );
    }

    const sourcePartPos = newBlockType.parts.find((part) => part.name === sourcePartName)?.position || [0, 0, 0];

    // const targetPartOrientation = newBlockType.partDetails[targetPart.index]?.orientation || 0;
    // const idealNextPartOrientation = MathUtils.normalizeAngle(targetPartOrientation + 180);
    // const idealNextSelectedPart = newBlockType.parts.find(
    //   (part) => newBlockType.partDetails[part.index]?.orientation === idealNextPartOrientation,
    // );

    // if (!idealNextSelectedPart) {
    //   idealNextSelectedPart = newBlockType.parts
    //     .filter((part) => newBlockType.partDetails[part.index]?.role === 'slot')
    //     .find((part) => part.name !== targetPart.name);
    // }

    edit.select(null);

    this.factoryService.create(edit, newBlockType.type, {
      block: {
        parentConnection: {
          block: targetBlock.id,
          part: targetPartName,
        },
        position: VectorUtils.add(targetPos, MathUtils.negate(sourcePartPos)),
        // rotation: [0, targetRotation, 0],
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

    // edit.select(edit.getLastBlock().id, sourcePartInfo?.index);

    return edit;
  }

  private blockStore: BlockStore;

  private factoryService: FactoryService;

  private sceneStore: SceneStore;

  private updateService: TransactionService;
}

export default AddSlotToSlot;
