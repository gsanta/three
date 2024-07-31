import AddBlockType from './AddBlockType';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import AddBlockToPos from '@/client/editor/use_cases/block/AddBlockToPos';

class AddRoomBlock extends AddBlockType {
  constructor(factoryService: FactoryService) {
    super();

    this.addBlockToPos = new AddBlockToPos(factoryService, 'building');

    this.sourceCategories = ['rooms'];
    this.targetCategories = ['plain'];
  }

  perform({ edit, newBlockType, position }: Parameters<AddBlockType['perform']>[0]) {
    this.addBlockToPos.perform(edit, newBlockType.type, position);
  }

  private addBlockToPos: AddBlockToPos;
}

export default AddRoomBlock;
