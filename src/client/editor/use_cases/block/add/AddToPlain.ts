import FactoryService from '@/client/editor/services/factory/FactoryService';
import Edit from '@/client/editor/services/transaction/Edit';
import BlockConstantData from '@/client/editor/models/block/BlockConstantData';
import Vector from '@/client/editor/models/math/Vector';

type AddParams = {
  edit: Edit;

  newBlockType: BlockConstantData;

  position: Vector;
};

class AddToPlain {
  constructor(factoryService: FactoryService) {
    this.factoryService = factoryService;
  }

  execute({ edit, newBlockType, position }: AddParams) {
    this.factoryService.create(edit, newBlockType.type, { block: { position: position.get() } });
    edit.select([edit.getLastBlock()]);

    return edit;
  }

  private factoryService: FactoryService;
}

export default AddToPlain;
