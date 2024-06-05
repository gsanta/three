export const maxPolePinNumber = 3;

export type Pins = 'pin1' | 'pin2' | 'pin3' | 'pin4' | 'pin5' | 'pin6';

export type Pin = {
  wires: string[];
  type: 'in' | 'out' | 'in-out';
};

type Pole = {
  id: string;
  category: 'poles';
  pins: Partial<Record<string, Pin>>;
};

export type PartialPole = {
  pins?: {
    [key in Pins]?: string[];
  };
};

export const createPin = (type: Pin['type'], wires: string[]): Pin => {
  return {
    type,
    wires,
  };
};

export default Pole;
