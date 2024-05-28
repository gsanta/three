import { BlockCategoryType } from '../../types/BlockCategory';
import BlockUpdater from './updaters/BlockUpdater';

class UpdateService {
  onUpdateDecorators(blockType: string, newState: BlockCategoryType) {
    const updater = this.updaters[blockType];

    if (updater) {
      updater.onUpdateDecorators(newState);
    }
  }

  private updaters: Record<string, BlockUpdater> = {};
}

export default UpdateService;
