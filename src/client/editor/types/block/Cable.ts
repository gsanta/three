import Num3 from '@/client/editor/types/Num3';

export type CableEnd = {
  pin: string;
  device: string;
};

type PointParent = {
  blockId: string;
  partIndex?: string;
};

type Cable = {
  id: string;
  category: 'cables';
  end1: CableEnd | null;
  end2: CableEnd | null;
  points: Num3[];
  pointParents: PointParent[];
};

export default Cable;
