type ElectricSupplierDecorator = {
  id: string;
  decoration: 'electric-supplier';
  isOn: boolean;
};

export const electricSupplierDefaultValues: Partial<ElectricSupplierDecorator> = {
  decoration: 'electric-supplier',
  isOn: false,
};

export default ElectricSupplierDecorator;
