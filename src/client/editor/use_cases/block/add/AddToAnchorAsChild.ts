import FactoryService from '@/client/editor/services/factory/FactoryService';
import BlockData from '@/client/editor/models/block/BlockData';
import BlockConstantData from '@/client/editor/models/block/BlockConstantData';
import BlockPart from '@/client/editor/models/block/part/BlockPart';
import Vector from '@/client/editor/models/math/Vector';
import BlockPartGeometryData from '@/client/editor/models/block/part/BlockPartGeometryData';
import Edit from '@/client/editor/services/transaction/Edit';

export type AddParams = {
  edit: Edit;

  newBlockType: BlockConstantData;
  newBlockAnchorName?: string;

  position?: Vector;

  to?: {
    block?: BlockData;
    anchorPartName?: string;
  };
};

class AddToAnchorAsChild {
  constructor(factoryService: FactoryService) {
    this.factoryService = factoryService;
  }

  execute({ edit, newBlockType, newBlockAnchorName, to }: AddParams) {
    if (!to || !to.block || !to.anchorPartName) {
      throw new Error('Target block and anchor part name must be provided');
    }

    const targetPart = to.block.parts.find((part) => part.name === to.anchorPartName);

    const newBlockPart = newBlockType.parts.find((part) => part.name === newBlockAnchorName);

    if (!newBlockPart) {
      throw new Error(`Block type ${newBlockType.type} does not have a part with name ${newBlockAnchorName}`);
    }

    if (!targetPart) {
      return;
    }

    const targetPartDetail = to.block.partDetails[targetPart.name];

    this.factoryService.create(edit, newBlockType.type, {
      block: {
        parentConnection: {
          block: to.block.id,
          part: targetPart.name,
        },
        position: this.calculatePosition(new BlockPart(to.block, targetPart), newBlockPart),
        rotation: [0, targetPartDetail?.orientation || 0, 0],
      },
    });

    const newBlock = edit.getLastBlock();

    edit.updateBlock(
      to.block.id,
      {
        childConnections: [
          {
            childBlock: newBlock.id,
          },
        ],
      },
      { arrayMergeStrategy: 'merge' },
    );

    return newBlock;
  }

  private calculatePosition(existingPart: BlockPart, newPart: BlockPartGeometryData) {
    const existingPartPos = new Vector(existingPart.getPart().position);
    const newPartPos = new Vector(newPart.position).negate();

    return existingPartPos.add(newPartPos).get();
  }

  private factoryService: FactoryService;
}

export default AddToAnchorAsChild;
