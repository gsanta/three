import { BlockType } from '@/editor/types/Block';
import BlockCreator from './BlockCreator';
import { Vector3 } from 'three';
import PoleCreator from './PoleCreator';
import { Store } from '@/common/utils/store';
import CableCreator from './CableCreator';

class BlockFactory {
  constructor(store: Store) {
    this.creators.push(new PoleCreator(store));

    this.cableCreator = new CableCreator(store, 'cable');
  }

  create(type: BlockType, pos: Vector3) {
    const creator = this.creators.find((currCreator) => currCreator.type === type);

    if (!creator) {
      throw new Error(`Creator not found for type ${type}.`);
    }

    creator.create(pos);
  }

  readonly cableCreator: CableCreator;

  private creators: (BlockCreator & { create(pos: Vector3): void })[] = [];
}

export default BlockFactory;
