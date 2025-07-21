import BlockStore from '@/client/editor/stores/block/BlockStore';
import BlockModel from '../BlockModel';
import BlockData from '../BlockData';
import PoleDecorator from './PoleDecorator';
import ElectricDevice from './ElectricDevice';

export type WireRole = 'L1' | 'L2' | 'L3' | 'N' | 'PE';

export const wireRoleNames: WireRole[] = ['L1', 'L2', 'L3', 'N', 'PE'];

export type PolePartNames = 'TransformerHolder' | WireRole;

class PoleModel extends BlockModel {
  static SERVICE_DROP_PART_NAME: PolePartNames = 'TransformerHolder';

  constructor(block: BlockData, blockStore: BlockStore) {
    super(block);
    this.checkCategory('poles');

    this.block = block;
    this.blockStore = blockStore;

    this.electricDevice = new ElectricDevice(block);
  }

  getPoleDecorator(): PoleDecorator {
    return this.blockStore.getDecorator('poles', this.block.id) as PoleDecorator;
  }

  getAsElectricDevice(): ElectricDevice {
    return this.electricDevice;
  }

  private blockStore: BlockStore;

  private electricDevice: ElectricDevice;
}

export default PoleModel;
