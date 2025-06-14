import Num3 from '@/client/editor/models/math/Num3';

export type CableEnd = {
  partName: string;
  pinIndex: number;
  device: string;
};

export type CablePoint = {
  position: Num3;
  blockId?: string;
  partIndex?: string;
};

type CableDecorator = {
  id: string;
  decoration: 'cables';
  end1: CableEnd | null;
  end2: CableEnd | null;
  location: 'underground' | 'overhead';
  points: CablePoint[];
};

export default CableDecorator;
