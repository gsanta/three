import BlockAddMethodName from '../model_types/BlockAddMethod';

type BlockAddMethodsResponse = {
  items: {
    id: number;
    name: BlockAddMethodName;
  }[];
};

export default BlockAddMethodsResponse;
