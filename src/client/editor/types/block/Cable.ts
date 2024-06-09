import Num3 from '@/client/editor/types/Num3';

export type CableEnd = {
  pin: string;
  device: string;
  point: Num3;
};

type Cable = {
  id: string;
  category: 'cables';
  end1: CableEnd | null;
  end2: CableEnd | null;
};

export default Cable;
