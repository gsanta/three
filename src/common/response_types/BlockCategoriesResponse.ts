import { BlockCategoryName } from '@/client/editor/types/block/BlockCategory';

type BlockCategoriesResponse = {
  items: {
    id: number;
    name: BlockCategoryName;
  }[];
};

export default BlockCategoriesResponse;
