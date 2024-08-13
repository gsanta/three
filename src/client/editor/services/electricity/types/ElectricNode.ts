export type ElectricNodeType = 'meter';

type ElectricTerminal = {
  id: string;
  type: 'hot' | 'neutral' | 'ground';
};

type ElectricNode = {
  id: string;

  hotTerminals: ElectricTerminal[];
  neutralTerminals: ElectricTerminal[];
};

export default ElectricNode;
