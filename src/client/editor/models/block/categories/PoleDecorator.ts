import { WireRole } from './Pole';

type PoleDecorator = {
  id: string;
  decoration: 'poles';
  wires: WireRole[];
};

export default PoleDecorator;
