import Num3 from '@/client/editor/types/Num3';
import { Pins } from './Pole';

type Cable = {
  id: string;
  category: 'cables';
  points: Num3[];
  end1: {
    pin: Pins;
    device: string;
  } | null;
  end2: {
    pin: Pins;
    device: string;
  } | null;
};

export default Cable;
