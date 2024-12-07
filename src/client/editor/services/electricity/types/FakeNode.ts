import ElectricNode from './ElectricNode';

type FakeNode = ElectricNode & {
  type: 'fake-node';
};

export default FakeNode;
