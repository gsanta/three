import BlockDecoration from './block/BlockCategory';
import Num3 from './math/Num3';

type BlockSelectedSettings = {
  category: BlockDecoration;
  rotation: Num3;
  scale: Num3;
};

export default BlockSelectedSettings;
