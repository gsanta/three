import FactoryService from '@/client/editor/services/factory/FactoryService';
import { AddParams } from './AddToAnchorAsChild';

class AddToPlain {
  constructor(factoryService: FactoryService) {
    this.factoryService = factoryService;
  }

  execute({ edit, newBlockType, position }: AddParams) {
    if (!position) {
      throw new Error('Position must be provided for adding to plain');
    }

    const block = this.factoryService.create(edit, newBlockType.type, { block: { position: position.get() } });

    return block;
  }

  private factoryService: FactoryService;
}

export default AddToPlain;
