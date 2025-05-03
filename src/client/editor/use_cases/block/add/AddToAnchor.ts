import BlockConstantData from '@/client/editor/models/block/BlockConstantData';
import BlockData from '@/client/editor/models/block/BlockData';
import BlockPart from '@/client/editor/models/block/part/BlockPart';
import BlockPartGeometryData from '@/client/editor/models/block/part/BlockPartGeometryData';
import { BlockPartRole } from '@/client/editor/models/block/part/BlockPartLookupData';
import Num3 from '@/client/editor/models/math/Num3';
import Vector from '@/client/editor/models/math/Vector';
import MeshWrapper from '@/client/editor/models/MeshWrapper';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import Edit from '@/client/editor/services/transaction/Edit';
import SceneStore from '@/client/editor/ui/scene/SceneStore';
import { Vector3 } from 'three';

type AddParams = {
  edit: Edit;

  newBlockType: BlockConstantData;
  newBlockAnchorRole: BlockPartRole;

  to: {
    block: BlockData;
    anchorPartName: string;
  };
};

class AddToAnchor {
  constructor(factoryService: FactoryService, sceneStore: SceneStore) {
    this.factoryService = factoryService;
    this.sceneStore = sceneStore;
  }

  execute({ edit, newBlockType, newBlockAnchorRole, to }: AddParams) {
    const targetPart = to.block.parts.find((part) => part.name === to.anchorPartName);

    if (!targetPart) {
      return;
    }

    const [newPart, newBlockRotation] = this.calculateNewBlockRotationAndPartToConnectTo(
      to.block,
      targetPart,
      newBlockType,
      newBlockAnchorRole,
    );

    this.factoryService.create(edit, newBlockType.type, {
      block: {
        position: this.calculatePosition(
          new BlockPart(to.block, targetPart),
          newPart,
          Vector.toRadian(newBlockRotation[1]),
        ),
        rotation: newBlockRotation,
      },
    });

    return edit.getLastBlock();
  }

  private calculatePosition(existingPart: BlockPart, newPart: BlockPartGeometryData, newBlockRotation: number) {
    const mesh = this.sceneStore.getObj3d(existingPart.getBlock().getType().id);
    const partMesh = new MeshWrapper(mesh).findByNameOld(existingPart?.getPart().name);
    const pos = new Vector3();
    partMesh.getWorldPosition(pos);
    const existingPartPos = new Vector([pos.x, pos.y, pos.z]);

    const newPartPos = new Vector(newPart.position).rotateY(newBlockRotation).negate();

    return existingPartPos.add(newPartPos).get();
  }

  private calculateNewBlockRotationAndPartToConnectTo(
    existingBlock: BlockData,
    existingBlockPart: BlockPartGeometryData,
    newBlockType: BlockConstantData,
    newBlockPartRole: BlockPartRole,
  ): [BlockPartGeometryData, Num3] {
    const blockPart = new BlockPart(existingBlock, existingBlockPart.name);
    const partWithRotation = blockPart.findBestMatchingPartToConnectTo(newBlockType, newBlockPartRole);

    if (!partWithRotation) {
      throw new Error(`Source part with role ${newBlockPartRole} not found on block type ${newBlockType}`);
    }

    return partWithRotation;
  }

  private factoryService: FactoryService;

  private sceneStore: SceneStore;
}

export default AddToAnchor;
