import { BlockCategoryName } from '../../models/block/BlockCategoryName';

interface DrawService {
  canHandleCategory(category: BlockCategoryName): boolean;

  cancel(): void;

  finish(): void;
}

export default DrawService;
