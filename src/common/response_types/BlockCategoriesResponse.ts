import { BlockCategoryName } from '@/client/editor/models/block/BlockCategoryName';

type BlockCategoriesResponse = {
  items: {
    id: number;
    name: BlockCategoryName;
  }[];
};

export default BlockCategoriesResponse;
