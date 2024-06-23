import Num3 from '@/client/editor/types/Num3';

export type CableEnd = {
  pin: string;
  device: string;
};

type Cable = {
  id: string;
  category: 'cables';
  end1: CableEnd | null;
  end2: CableEnd | null;
  points: Num3[];
};

export default Cable;
