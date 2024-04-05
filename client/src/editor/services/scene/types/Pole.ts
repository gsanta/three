type Pole = {
  id: string;
  pins: {
    pin1: string | null;
    pin2: string | null;
    pin3: string | null;
  };
  name: string;
};

export type PartialPole = {
  pins?: {
    pin1?: string | null;
    pin2?: string | null;
    pin3?: string | null;
  };
};

export default Pole;
