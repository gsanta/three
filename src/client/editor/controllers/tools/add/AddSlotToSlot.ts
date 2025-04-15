import SceneStore from '@/client/editor/components/scene/SceneStore';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import MeshUtils from '@/client/editor/utils/MeshUtils';
import VectorUtils from '@/client/editor/utils/vectorUtils';
import { Vector3 } from 'three';
import AddBlock from './AddBlock';
import BlockUtils from '@/client/editor/utils/BlockUtils';
import Block from '@/client/editor/types/Block';
import BlockAddMethod from '@/common/model_types/BlockAddMethod';
import BlockType, { ModelPart, ModelPartRole } from '@/client/editor/types/BlockType';
import Num3 from '@/client/editor/types/Num3';

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

    if (!targetPart) {
      return edit;
    }

    const sourcePartName = Object.entries(newBlockType.partDetails)?.find(([, part]) =>
      part?.roles?.includes(addMethod.sourcePartRole!),
    )?.[0];

    if (!sourcePartName) {
      throw new Error(
        `source with type ${newBlockType.type} does not contain part with role ${addMethod.sourcePartRole}`,
      );
    }

    edit.select(null);

    const [sourcePart, rotation] = this.calculateSourcePartWithRotation(
      addMethod.connectionType,
      addMethod.sourcePartRole,
      targetBlock,
      targetPart,
      newBlockType,
    );

    this.factoryService.create(edit, newBlockType.type, {
      block: {
        ...this.calculateSourceConnection(addMethod, targetBlock, targetPart),
        position: this.calculatePosition(addMethod, targetBlock, targetPart, sourcePart, rotation[1]),
        rotation: rotation,
      },
    });

    const newBlock = edit.getLastBlock();

    edit.updateBlock(
      targetBlock.id,
      {
        ...this.calculateTargetConnection(addMethod, newBlock),
      },
      { arrayMergeStrategy: 'merge' },
    );

    edit.select(edit.getLastBlock().id);

    return edit;
  }

  private calculatePosition(
    addMethod: BlockAddMethod,
    targetBlock: Block,
    targetPart: ModelPart,
    sourcePart: ModelPart,
    sourceRotation: number,
  ) {
    let targetPartPos: Num3 = [0, 0, 0];
    let sourcePartPos: Num3 = [0, 0, 0];
    switch (addMethod.connectionType) {
      case 'sibling':
        const mesh = this.sceneStore.getObj3d(targetBlock.id);
        const partMesh = MeshUtils.findByName(mesh, targetPart?.name);
        const pos = new Vector3();
        partMesh.getWorldPosition(pos);
        targetPartPos = [pos.x, pos.y, pos.z];
        const sourcePos = VectorUtils.rotate(sourcePart.position || [0, 0, 0], sourceRotation) || [0, 0, 0];
        sourcePartPos = [-sourcePos[0], -sourcePos[1], -sourcePos[2]];
        break;
      case 'parent-child':
        targetPartPos = targetPart.position;
        sourcePartPos = VectorUtils.negate(sourcePart.position);
        break;
    }

    return VectorUtils.add(targetPartPos, sourcePartPos);
  }

  private calculateSourcePartWithRotation(
    connectionType: BlockAddMethod['connectionType'],
    sourcePartRole: ModelPartRole,
    targetBlock: Block,
    targetPart: ModelPart,
    newBlockType: BlockType,
  ): [ModelPart, Num3] {
    const sourceParts = newBlockType?.parts?.filter((part) =>
      newBlockType.partDetails[part.name]?.roles?.includes(sourcePartRole),
    );

    switch (connectionType) {
      case 'parent-child':
        return [sourceParts[0], [0, 0, 0]];
      case 'sibling':
      default:
        const rotatedPart = BlockUtils.findMatchingSlot(targetBlock, targetPart.name, newBlockType, sourceParts);

        if (!rotatedPart?.part) {
          throw new Error(`Source part with role ${sourcePartRole} not found on block type ${newBlockType}`);
        }

        return [rotatedPart.part, [0, rotatedPart?.rotation || 0, 0]];
    }
  }

  private calculateSourceConnection(
    addMethod: BlockAddMethod,
    targetBlock: Block,
    targetPart: ModelPart,
  ): Partial<Block> {
    switch (addMethod.connectionType) {
      case 'parent-child':
        return {
          parentConnection: {
            block: targetBlock.id,
            part: targetPart.name,
          },
        };
      case 'sibling':
      default:
        return {};
    }
  }

  private calculateTargetConnection(addMethod: BlockAddMethod, newBlock: Block): Partial<Block> {
    switch (addMethod.connectionType) {
      case 'parent-child':
        return {
          childConnections: [
            {
              childBlock: newBlock.id,
            },
          ],
        };
      case 'sibling':
      default:
        return {};
    }
  }

  private blockStore: BlockStore;

  private factoryService: FactoryService;

  private sceneStore: SceneStore;

  private updateService: TransactionService;
}

export default AddSlotToSlot;
