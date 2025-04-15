import { BlockCategoryName } from '@/client/editor/types/block/BlockCategory';
import { ModelPartRole } from '@/client/editor/types/BlockType';

export type BlockAddMethodName = 'add-block-to-block' | 'add-block-to-slot' | 'add-slot-to-slot' | 'add-poles';

type BlockAddMethod = {
  executeAfterRender: boolean;
  name: BlockAddMethodName;
  sourceCategory: BlockCategoryName;
  targetCategory?: BlockCategoryName;
  sourcePartRole?: ModelPartRole;
  targetPartRole?: ModelPartRole;
  connectionType?: 'parent-child' | 'sibling';
};

export default BlockAddMethod;
