import { BlockCategoryName } from '@/client/editor/models/block/BlockCategoryName';
import BlockAddMethod, { BlockAddMethodName } from '../model_types/BlockAddMethod';

type BlockAddMethodsResponse = {
  items: {
    categories: {
      addMethodName: BlockAddMethodName;
      sourceCategoryName: BlockCategoryName;
      targetCategoryName?: BlockCategoryName;
      sourcePartRole: string;
      targetPartRole: string;
      connectionType: BlockAddMethod['connectionType'];
    }[];
    executeAfterRender: boolean;
    id: number;
    name: BlockAddMethodName;
  }[];
};

export default BlockAddMethodsResponse;
