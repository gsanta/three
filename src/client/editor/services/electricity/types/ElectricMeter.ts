import ElectricNode from './ElectricNode';

type ElectricMeter = ElectricNode & {
  id: string;

  isOn: boolean;
};

export default ElectricMeter;
