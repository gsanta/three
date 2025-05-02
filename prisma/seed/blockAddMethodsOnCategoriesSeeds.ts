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
    connectionType: 'parent-child',
  },
  {
    addMethodName: 'add-slot-to-slot',
    sourceCategoryName: 'weather-heads',
    sourcePartRole: 'weather-head-anchor',
    targetPartRole: 'weather-head-anchor',
    connectionType: 'parent-child',
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
    connectionType: 'sibling',
  },
  {
    addMethodName: 'add-block-to-block',
    sourceCategoryName: 'houses',
  },
  {
    addMethodName: 'add-block-to-block',
    sourceCategoryName: 'plants',
  },
];

export default blockAddMethodsOnCategoriesSeeds;
