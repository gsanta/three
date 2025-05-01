import { BlockPartRole } from '@/client/editor/data/BlockPartLookupData';
import { BlockCategoryName } from '@/client/editor/models/block/BlockCategory';

export type BlockAddMethodName = 'add-block-to-block' | 'add-block-to-slot' | 'add-slot-to-slot' | 'add-poles';

type BlockAddMethod = {
  executeAfterRender: boolean;
  name: BlockAddMethodName;
  sourceCategory: BlockCategoryName;
  targetCategory?: BlockCategoryName;
  sourcePartRole?: BlockPartRole;
  targetPartRole?: BlockPartRole;
  connectionType?: 'parent-child' | 'sibling';
};

export default BlockAddMethod;
