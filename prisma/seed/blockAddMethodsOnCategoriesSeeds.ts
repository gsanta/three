const blockAddMethodsOnCategoriesSeeds = [
  {
    addMethodName: 'add-block-to-block',
    sourceCategoryName: 'poles',
  },
  {
    addMethodName: 'add-poles',
    sourceCategoryName: 'poles',
  },
  {
    addMethodName: 'add-slot-to-slot',
    sourceCategoryName: 'transformers',
    sourcePartRole: 'transformer-holder',
    targetPartRole: 'transformer-holder',
  },
  {
    addMethodName: 'add-block-to-block',
    sourceCategoryName: 'roads',
    targetCategoryName: 'plain',
  },
  {
    addMethodName: 'add-slot-to-slot',
    sourceCategoryName: 'roads',
    sourcePartRole: 'road-slot',
    targetPartRole: 'road-slot',
  },
];

export default blockAddMethodsOnCategoriesSeeds;
