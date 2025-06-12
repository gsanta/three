import { BlockCategoryName } from './BlockCategoryName';
import { BlockDecoratorName } from './BlockDecoration';
import BlockPartGeometryData from './part/BlockPartGeometryData';
import BlockPartLookupData from './part/BlockPartLookupData';

export type AnimationTriggerName = 'device-on';

export type BlockTypeName = string | 'underground-cable-1';

type BlockConstantData = {
  animations?: Partial<Record<AnimationTriggerName, string[]>>;
  category: BlockCategoryName;
  color: [number, number, number];
  decorations: BlockDecoratorName[];
  movable: boolean;
  moveAxis: [boolean, boolean, boolean];
  parts: BlockPartGeometryData[];
  partDetails: Record<string, BlockPartLookupData | undefined>;
  path: string | null;
  type: string;
};

export default BlockConstantData;
