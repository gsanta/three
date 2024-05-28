import { BlockCategoryType } from '@/client/editor/types/BlockCategory';
import BlockUpdater from './BlockUpdater';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import Edit from '../../update/Edit';
import Device from '@/client/editor/types/block/Device';

const isDevice = (decoration: BlockCategoryType): decoration is Device => {
  return decoration.category === 'devices';
};

class LampUpdater extends BlockUpdater {
  constructor(blockStore: BlockStore) {
    super('lamps');

    this.blockStore = blockStore;
  }

  onUpdateDecorators(edit: Edit, newState: BlockCategoryType): void {
    if (isDevice(newState)) {
      edit.updateBlock(newState.id, {
        partDetails: {
          '#2': {
            isHidden: newState.isOn,
          },
          '#3': {
            isHidden: !newState.isOn,
          },
        },
      });
    }
  }

  private blockStore: BlockStore;
}

export default LampUpdater;
