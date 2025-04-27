export type BlockCategoryName = 'cables' | 'houses' | 'poles' | 'transformers' | 'roads';

type BlockCategory = {
  name: BlockCategoryName;
};

export default BlockCategory;
