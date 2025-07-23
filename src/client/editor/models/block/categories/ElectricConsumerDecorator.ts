type ElectricConsumerDecorator = {
  id: string;
  decoration: 'electric-consumers';
  supplierId?: string;
};

export const electricConsumerDefaultValues: Partial<ElectricConsumerDecorator> = {
  decoration: 'electric-consumers',
};

export default ElectricConsumerDecorator;
