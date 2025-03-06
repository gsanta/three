import BlockCategory from '@/client/editor/types/block/BlockCategory';

type BlockCategoriesResponse = {
  items: {
    id: number;
    name: BlockCategory;
  }[];
};

export default BlockCategoriesResponse;
