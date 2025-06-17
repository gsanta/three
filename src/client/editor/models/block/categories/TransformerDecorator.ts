import { WireRole } from './Pole';

type TransformerDecorator = {
  id: string;
  decoration: 'transformers';
  location: 'pad-mounted' | 'pole-mounted';
  primaryWires: WireRole[];
  secondaryWires: WireRole[];
};

export default TransformerDecorator;
