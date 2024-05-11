export const maxPolePinNumber = 3;

export type Pins = 'pin1' | 'pin2' | 'pin3';

type Pole = {
  id: string;
  category: 'poles';
  pins: {
    [key in Pins]: string[];
  };
};

export type PartialPole = {
  pins?: {
    [key in Pins]?: string[];
  };
};

export default Pole;
