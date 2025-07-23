type ElectricSupplierDecorator = {
  id: string;
  decoration: 'electric-suppliers';
  isOn: boolean;
};

export const electricSupplierDefaultValues: Partial<ElectricSupplierDecorator> = {
  decoration: 'electric-suppliers',
  isOn: false,
};

export default ElectricSupplierDecorator;
