import SceneStore from '@/client/editor/components/scene/SceneStore';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import MeshUtils from '@/client/editor/utils/MeshUtils';
import { Vector3 } from 'three';
import AddBlock from './AddBlock';
import BlockType from '@/client/editor/types/BlockType';
import BlockAddMethod from '@/common/model_types/BlockAddMethod';
import BaseBlockType, { ModelPart, BlockPartRole } from '@/client/editor/models/BaseBlockType';
import Num3 from '@/client/editor/models/Num3';
import { toRadian } from '@/client/editor/utils/mathUtils';
import BlockPart from '@/client/editor/models/block/BlockPart';
import Vector from '@/client/editor/utils/Vector';

class AddSlotToSlot extends AddBlock {
  constructor(factoryService: FactoryService, sceneStore: SceneStore) {
    super('add-slot-to-slot');

    this.factoryService = factoryService;
    this.sceneStore = sceneStore;
  }

  perform({
    addMethod,
    edit,
    newBlockType,
    targetBlock,
    targetPartIndex: targetPartName,
  }: Parameters<AddBlock['perform']>[0]) {
    this.addMethod = addMethod;

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

    const [newPart, newBlockRotation] = this.calculateNewBlockRotationAndPartToConnectTo(
      addMethod.connectionType,
      addMethod.sourcePartRole,
      targetBlock,
      targetPart,
      newBlockType,
    );

    const existingPart = new BlockPart(targetBlock, targetPart);

    this.factoryService.create(edit, newBlockType.type, {
      block: {
        ...this.calculateSourceConnection(addMethod, targetBlock, targetPart),
        position: this.calculatePosition(existingPart, newPart, toRadian(newBlockRotation[1])),
        rotation: newBlockRotation,
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

    edit.select([edit.getLastBlock()]);

    return edit;
  }

  private calculatePosition(existingPart: BlockPart, newPart: ModelPart, newBlockRotation: number) {
    let existingPartPos = new Vector();
    let newPartPos = new Vector();

    switch (this.addMethod?.connectionType) {
      case 'sibling':
        const mesh = this.sceneStore.getObj3d(existingPart.getBlock().getType().id);
        const partMesh = MeshUtils.findByName(mesh, existingPart?.getPart().name);
        const pos = new Vector3();
        partMesh.getWorldPosition(pos);
        existingPartPos = new Vector([pos.x, pos.y, pos.z]);

        newPartPos = new Vector(newPart.position).rotateY(newBlockRotation).negate();
        break;
      case 'parent-child':
        existingPartPos = new Vector(existingPart.getPart().position);
        newPartPos = new Vector(newPart.position).negate();
        break;
    }

    return existingPartPos.add(newPartPos).get();
  }

  private calculateNewBlockRotationAndPartToConnectTo(
    connectionType: BlockAddMethod['connectionType'],
    sourcePartRole: BlockPartRole,
    targetBlock: BlockType,
    targetPart: ModelPart,
    newBlockType: BaseBlockType,
  ): [ModelPart, Num3] {
    const sourceParts = newBlockType?.parts?.filter((part) =>
      newBlockType.partDetails[part.name]?.roles?.includes(sourcePartRole),
    );

    switch (connectionType) {
      case 'parent-child':
        return [sourceParts[0], [0, 0, 0]];
      case 'sibling':
      default:
        const blockPart = new BlockPart(targetBlock, targetPart.name);
        const partWithRotation = blockPart.findBestMatchingPartToConnectTo(newBlockType, sourcePartRole);

        if (!partWithRotation) {
          throw new Error(`Source part with role ${sourcePartRole} not found on block type ${newBlockType}`);
        }

        return partWithRotation;
    }
  }

  private calculateSourceConnection(
    addMethod: BlockAddMethod,
    targetBlock: BlockType,
    targetPart: ModelPart,
  ): Partial<BlockType> {
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

  private calculateTargetConnection(addMethod: BlockAddMethod, newBlock: BlockType): Partial<BlockType> {
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

  private factoryService: FactoryService;

  private sceneStore: SceneStore;

  private addMethod?: BlockAddMethod;
}

export default AddSlotToSlot;
