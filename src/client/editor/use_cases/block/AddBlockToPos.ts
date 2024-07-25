import FactoryService from '../../services/factory/FactoryService';
import Num3 from '../../types/Num3';
import Edit from '../../services/update/Edit';

class AddBlockToPos {
  constructor(factoryService: FactoryService) {
    this.factoryService = factoryService;
  }

  perform(edit: Edit, templateName: string, pos: Num3) {
    this.factoryService.create(edit, templateName, {
      position: pos,
    });
  }

  private factoryService: FactoryService;
}

export default AddBlockToPos;
