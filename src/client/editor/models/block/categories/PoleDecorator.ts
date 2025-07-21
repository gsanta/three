import { WireRole } from './PoleModel';

type PoleDecorator = {
  id: string;
  decoration: 'poles';
  wires: WireRole[];
};

export default PoleDecorator;
