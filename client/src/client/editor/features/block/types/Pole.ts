export const maxPolePinNumber = 3;

export type Pins = 'pin1' | 'pin2' | 'pin3';

type Pole = {
  id: string;
  category: 'poles';
  pins: {
    [key in Pins]: string | null;
  };
};

export type PartialPole = {
  pins?: {
    pin1?: string | null;
    pin2?: string | null;
    pin3?: string | null;
  };
};

export default Pole;
