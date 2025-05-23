import { BlockCategoryName } from './BlockCategoryName';
import BlockPartGeometryData from './part/BlockPartGeometryData';
import BlockPartLookupData from './part/BlockPartLookupData';

export type AnimationTriggerName = 'device-on';

type BlockConstantData = {
  animations?: Partial<Record<AnimationTriggerName, string[]>>;
  category: BlockCategoryName;
  color: [number, number, number];
  decorations: BlockCategoryName[];
  movable: boolean;
  moveAxis: [boolean, boolean, boolean];
  parts: BlockPartGeometryData[];
  partDetails: Record<string, BlockPartLookupData | undefined>;
  path: string;
  type: string;
};

export default BlockConstantData;
