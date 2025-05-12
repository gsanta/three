import { BlockCategoryName } from './block/BlockCategoryName';
import Num3 from './math/Num3';

type BlockSettings = {
  category: BlockCategoryName;
  rotation: {
    x: number[];
    y: number[];
    z: number[];
    default: Num3;
  };
  scale: {
    x: number[];
    y: number[];
    z: number[];
    default: Num3;
  };
  snap: Num3;
};

export const defaultBlockSettings: BlockSettings = {
  category: '' as unknown as BlockCategoryName,
  rotation: {
    x: [0],
    y: [0],
    z: [0],
    default: [0, 0, 0],
  },
  scale: {
    x: [1],
    y: [1],
    z: [1],
    default: [1, 1, 1],
  },
  snap: [0, 0, 0],
};

export default BlockSettings;
