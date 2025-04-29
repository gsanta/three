import { BlockCategoryName } from '@/client/editor/models/block/BlockCategory';
import { ModelPartRole } from '@/client/editor/models/BaseBlockType';

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
