import { BlockCategoryName } from './block/BlockCategoryName';
import Num3 from './math/Num3';

type BlockSelectedSettings = {
  category: BlockCategoryName;
  rotation: Num3;
  scale: Num3;
};

export default BlockSelectedSettings;
