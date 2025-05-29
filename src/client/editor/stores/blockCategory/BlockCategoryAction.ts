import BlockData from '../../models/block/BlockData';

export type BlockCategoryActionName = 'delete-action' | 'join-cable-action';

interface BlockCategoryAction {
  name: string;

  execute(block: BlockData): void;
}

export default BlockCategoryAction;
