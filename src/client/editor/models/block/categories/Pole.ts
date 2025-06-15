import BlockStore from '@/client/editor/stores/block/BlockStore';
import Block from '../Block';
import BlockData from '../BlockData';
import PoleDecorator from './PoleDecorator';

export type WireRole = 'L1' | 'L2' | 'L3' | 'N' | 'PE';

export const wireRoleNames: WireRole[] = ['L1', 'L2', 'L3', 'N', 'PE'];

export type PolePartNames = 'TransformerHolder' | WireRole;

class Pole extends Block {
  static PRIMARY_WIRE_1_CONNECTION_A = 'Pin1';

  static PRIMARY_WIRE_1_CONNECTION_B = 'Pin1b';

  static PRIMARY_WIRE_2_CONNECTION_A = 'Pin2';

  static PRIMARY_WIRE_2_CONNECTION_B = 'Pin2b';

  static PRIMARY_WIRE_3_CONNECTION_A = 'Pin3';

  static PRIMARY_WIRE_3_CONNECTION_B = 'Pin3b';

  static SERVICE_DROP_PART_NAME: PolePartNames = 'TransformerHolder';

  static PRIMARY_WIRE_CONNECTION_NAMES_A = [
    Pole.PRIMARY_WIRE_1_CONNECTION_A,
    Pole.PRIMARY_WIRE_2_CONNECTION_A,
    Pole.PRIMARY_WIRE_3_CONNECTION_A,
  ];

  static PRIMARY_WIRE_CONNECTION_NAMES_B = [
    Pole.PRIMARY_WIRE_1_CONNECTION_B,
    Pole.PRIMARY_WIRE_2_CONNECTION_B,
    Pole.PRIMARY_WIRE_3_CONNECTION_B,
  ];

  constructor(block: BlockData, blockStore: BlockStore) {
    super(block);
    this.checkCategory('poles');

    this.block = block;
    this.blockStore = blockStore;
  }

  getPoleDecorator(): PoleDecorator {
    return this.blockStore.getDecorator('poles', this.block.id) as PoleDecorator;
  }

  getFirstEmptyPin(partName: WireRole): number | undefined {
    const pinCount = Object.keys(this.block.partDetails[partName]?.isConnected || {}).length;

    for (let i = 0; i < pinCount; i++) {
      if (this.isPinEmpty(partName, i)) {
        return i;
      }
    }

    return undefined;
  }

  isPinEmpty(partName: WireRole, pinIndex: number): boolean {
    return this.block.partDetails[partName]?.isConnected[pinIndex] === false;
  }

  private blockStore: BlockStore;
}

export default Pole;
