import { BlockCategoryName } from './BlockCategoryName';
import { BlockDecoratorName } from './BlockDecoration';
import BlockPartGeometryData from './part/BlockPartGeometryData';
import BlockPartLookupData from './part/BlockPartLookupData';

export type AnimationTriggerName = 'device-on';

export type BlockTypeName = string | 'ground-cable-1';

export type BlockGeometry = 'empty' | 'ground-cable-geometry' | 'cable-geometry';

type BlockConstantData = {
  animations?: Partial<Record<AnimationTriggerName, string[]>>;
  category: BlockCategoryName;
  color: [number, number, number];
  decorations: BlockDecoratorName[];
  geometry?: BlockGeometry;
  movable: boolean;
  moveAxis: [boolean, boolean, boolean];
  parts: BlockPartGeometryData[];
  partDetails: Record<string, BlockPartLookupData | undefined>;
  path: string | null;
  texturePath?: string | null;
  type: BlockTypeName;
};

export default BlockConstantData;
