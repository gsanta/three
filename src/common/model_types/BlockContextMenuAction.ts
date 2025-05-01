import { BlockCategoryName } from '@/client/editor/models/block/BlockCategoryName';

export type BlockContextMenuActionName = 'join-electric-system';

type BlockContextMenuAction = {
  name: BlockContextMenuActionName;
  categoryName: BlockCategoryName;
  categoryName2?: BlockCategoryName;
};

export default BlockContextMenuAction;
