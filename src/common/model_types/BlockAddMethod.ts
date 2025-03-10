import { BlockCategoryName } from '@/client/editor/types/block/BlockCategory';

export type BlockAddMethodName = 'add-to-plain' | 'add-block-to-slot' | 'add-slot-to-slot' | 'add-poles';

type BlockAddMethod = {
  executeAfterRender: boolean;
  name: BlockAddMethodName;
  category: BlockCategoryName;
  sourcePartName?: string;
};

export default BlockAddMethod;
