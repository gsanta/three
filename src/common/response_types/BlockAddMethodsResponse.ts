import { BlockCategoryName } from '@/client/editor/types/block/BlockCategory';
import { BlockAddMethodName } from '../model_types/BlockAddMethod';

type BlockAddMethodsResponse = {
  items: {
    categories: {
      addMethodName: string;
      sourceCategoryName: BlockCategoryName;
      targetCategoryName?: BlockCategoryName;
      sourcePartRole: string;
      targetPartRole: string;
    }[];
    executeAfterRender: boolean;
    id: number;
    name: BlockAddMethodName;
  }[];
};

export default BlockAddMethodsResponse;
