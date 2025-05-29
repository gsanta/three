import BlockData from '@/client/editor/models/block/BlockData';
import BlockCategoryAction from '../BlockCategoryAction';
import EraserService from '@/client/editor/services/EraserService';

class DeleteAction implements BlockCategoryAction {
  name = 'delete-action';

  constructor(eraser: EraserService) {
    this.eraser = eraser;
  }

  execute(block: BlockData): void {
    this.eraser.erase(block.id);
  }

  private eraser: EraserService;
}

export default DeleteAction;
