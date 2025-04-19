import { BlockCategoryName } from '@/client/editor/models/block/BlockCategory';

type BlockCategoriesResponse = {
  items: {
    id: number;
    name: BlockCategoryName;
  }[];
};

export default BlockCategoriesResponse;
