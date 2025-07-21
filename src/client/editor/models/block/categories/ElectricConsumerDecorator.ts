type ElectricConsumerDecorator = {
  id: string;
  decoration: 'electric-consumer';
  supplierId?: string;
};

export const electricConsumerDefaultValues: Partial<ElectricConsumerDecorator> = {
  decoration: 'electric-consumer',
};

export default ElectricConsumerDecorator;
