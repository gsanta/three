type ElectricConnection = {
  id: string;
  blockId?: string;
  type: 'hot' | 'neutral' | 'ground';
  node1?: string;
  node2?: string;
};

export default ElectricConnection;
