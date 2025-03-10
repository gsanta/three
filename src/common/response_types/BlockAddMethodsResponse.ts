import { BlockCategoryName } from '@/client/editor/types/block/BlockCategory';
import { BlockAddMethodName } from '../model_types/BlockAddMethod';

type BlockAddMethodsResponse = {
  items: {
    categories: { addMethodName: string; categoryName: BlockCategoryName; sourcePartName: string }[];
    executeAfterRender: boolean;
    id: number;
    name: BlockAddMethodName;
  }[];
};

export default BlockAddMethodsResponse;
