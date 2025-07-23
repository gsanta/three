type ElectricsDecorator = {
  id: string;
  decoration: 'electrics';
  energized: boolean;
};

export const electricsDefaultValues: Partial<ElectricsDecorator> = {
  decoration: 'electrics',
  energized: false,
};

export default ElectricsDecorator;
