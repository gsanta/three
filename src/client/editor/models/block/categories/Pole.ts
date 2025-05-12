import Block from '../Block';
import BlockData from '../BlockData';

class Pole extends Block {
  static PRIMARY_WIRE_1_CONNECTION_A = 'Pin1';

  static PRIMARY_WIRE_1_CONNECTION_B = 'Pin1b';

  static PRIMARY_WIRE_2_CONNECTION_A = 'Pin2';

  static PRIMARY_WIRE_2_CONNECTION_B = 'Pin2b';

  static PRIMARY_WIRE_3_CONNECTION_A = 'Pin3';

  static PRIMARY_WIRE_3_CONNECTION_B = 'Pin3b';

  static WIRE_4 = 'Pin4';

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

  constructor(block: BlockData) {
    super(block);
    this.checkCategory('poles');

    this.block = block;
  }

  arePrimaryWireConnectionsEmpty(place: 'a' | 'b') {
    return (place === 'a' ? Pole.PRIMARY_WIRE_CONNECTION_NAMES_A : Pole.PRIMARY_WIRE_CONNECTION_NAMES_B).every(
      (name) => !this.block.partDetails[name] || !this.block.partDetails[name]?.isConnected,
    );
  }
}

export default Pole;
