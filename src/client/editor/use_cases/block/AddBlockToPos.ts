import FactoryService from '../../services/factory/FactoryService';
import Num3 from '../../types/Num3';
import Edit from '../../services/transaction/Edit';
import { BlockSlices } from '../../stores/block/blockSlice.types';

class AddBlockToPos {
  constructor(factoryService: FactoryService, targetSlice: BlockSlices) {
    this.factoryService = factoryService;
    this.targetSlice = targetSlice;
  }

  perform(edit: Edit, templateName: string, pos: Num3) {
    this.factoryService.create(
      edit,
      templateName,
      {
        block: {
          position: pos,
        },
      },
      this.targetSlice,
    );
  }

  private factoryService: FactoryService;

  private targetSlice: BlockSlices;
}

export default AddBlockToPos;
