import Num3 from '@/client/editor/models/math/Num3';

export type CableEnd = {
  pin: string;
  device: string;
};

export type CablePoint = {
  position: Num3;
  blockId?: string;
  partIndex?: string;
};

type Cable = {
  id: string;
  category: 'cables';
  end1: CableEnd | null;
  end2: CableEnd | null;
  points: CablePoint[];
};

export default Cable;
