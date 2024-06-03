import Num3 from '@/client/editor/types/Num3';

type Cable = {
  id: string;
  category: 'cables';
  points: Num3[];
  end1: {
    pin: string;
    device: string;
  } | null;
  end2: {
    pin: string;
    device: string;
  } | null;
};

export default Cable;
