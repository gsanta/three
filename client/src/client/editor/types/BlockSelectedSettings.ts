import BlockCategory from './BlockCategory';
import Num3 from './Num3';

type BlockSelectedSettings = {
  category: BlockCategory;
  rotation: Num3;
  scale: Num3;
};

// export const defaultBlockSelectedSettings: Omit<BlockSelectedSettings, 'category'> = {
//   rotation: [],
// };

export default BlockSelectedSettings;
