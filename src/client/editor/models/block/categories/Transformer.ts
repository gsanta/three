import BlockStore from '@/client/editor/stores/block/BlockStore';
import Block from '../Block';
import BlockData from '../BlockData';
import TransformerDecorator from './TransformerDecorator';
import ElectricDevice from './ElectricDevice';

class Transformer extends Block {
  constructor(block: BlockData, blockStore: BlockStore) {
    super(block);
    this.checkCategory('transformers');

    this.block = block;
    this.blockStore = blockStore;

    this.electricDevice = new ElectricDevice(block);
  }

  getTransformerDecorator(): TransformerDecorator {
    return this.blockStore.getDecorator('transformers', this.block.id) as TransformerDecorator;
  }

  getAsElectricDevice(): ElectricDevice {
    return this.electricDevice;
  }

  private blockStore: BlockStore;

  private electricDevice: ElectricDevice;
}

export default Transformer;
