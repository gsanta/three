import AddBlockType from './AddBlockType';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import AddBlockToPos from '@/client/editor/use_cases/block/AddBlockToPos';

class AddFurnitureBlock extends AddBlockType {
  constructor(factoryService: FactoryService) {
    super();

    this.addBlockToPos = new AddBlockToPos(factoryService);

    this.sourceCategories = ['furnitures', 'home-electrics'];
    this.targetCategories = ['rooms'];
  }

  perform({ edit, newBlockType, targetBlock, position }: Parameters<AddBlockType['perform']>[0]) {
    if (!targetBlock) {
      return;
    }

    this.addBlockToPos.perform(edit, newBlockType.type, position);

    const newBlock = edit.getLastBlock();

    edit.updateBlock(newBlock.id, {
      parentConnection: {
        block: targetBlock.id,
      },
    });

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
  }

  private addBlockToPos: AddBlockToPos;
}

export default AddFurnitureBlock;