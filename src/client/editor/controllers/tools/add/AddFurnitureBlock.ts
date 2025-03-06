import AddBlock from './AddBlock';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import AddBlockToPos from '@/client/editor/use_cases/block/AddBlockToPos';

class AddFurnitureBlock extends AddBlock {
  constructor(factoryService: FactoryService) {
    super('add-to-room');

    this.addBlockToPos = new AddBlockToPos(factoryService, 'building');

    this.sourceCategories = ['furnitures', 'home-electrics'];
    this.targetCategories = ['rooms'];
  }

  perform({ edit, newBlockType, targetBlock, position }: Parameters<AddBlock['perform']>[0]) {
    if (!targetBlock) {
      return;
    }

    this.addBlockToPos.perform(edit, newBlockType.type, position);

    const newBlock = edit.getLastBlock();

    edit.updateBlock(
      newBlock.id,
      {
        parentConnection: {
          block: targetBlock.id,
        },
      },
      { slice: 'building' },
    );

    edit.updateBlock(
      targetBlock.id,
      {
        childConnections: [
          {
            childBlock: newBlock.id,
          },
        ],
      },
      { arrayMergeStrategy: 'merge', slice: 'building' },
    );
  }

  private addBlockToPos: AddBlockToPos;
}

export default AddFurnitureBlock;
