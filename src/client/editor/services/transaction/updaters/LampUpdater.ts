import { BlockDecorationType } from '@/client/editor/models/block/BlockCategory';
import BlockUpdater from './BlockUpdater';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import Edit from '../Edit';
import BlockData from '@/client/editor/models/block/BlockData';
import Device from '@/client/editor/models/block/categories/Device';

const isDevice = (decoration: BlockDecorationType): decoration is Device => {
  return decoration.category === 'devices';
};

class LampUpdater extends BlockUpdater {
  constructor(blockStore: BlockStore) {
    super('lamps');

    this.blockStore = blockStore;
  }

  onUpdateDecorators(edit: Edit, block: BlockData, newState: BlockDecorationType): void {
    if (isDevice(newState)) {
      const loadOnPartIndexes = Object.keys(block.partDetails).filter(
        (key) => block.partDetails[key]?.roles === 'load-on',
      );
      const loadOffPartIndexes = Object.keys(block.partDetails).filter(
        (key) => block.partDetails[key]?.roles === 'load-off',
      );

      edit.updateBlock(block.id, {
        partDetails: {
          [loadOnPartIndexes[0]]: {
            ...block.partDetails[loadOnPartIndexes[0]],
            hide: !newState.isOn,
          },
          [loadOffPartIndexes[0]]: {
            ...block.partDetails[loadOffPartIndexes[0]],
            hide: newState.isOn,
          },
        },
      });
    }
  }

  private blockStore: BlockStore;
}

export default LampUpdater;
