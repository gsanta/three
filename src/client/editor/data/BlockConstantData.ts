import * as blocks from '../utils/blocks.json';
import { BlockCategoryName } from '../models/block/BlockCategory';
import BlockDecoration from '../models/BlockCategory';
import BlockPartGeometryData from './BlockPartGeometryData';
import BlockPartLookupData from './BlockPartLookupData';

export type BlockName = keyof typeof blocks.blocks;

export type AnimationTriggerName = 'device-on';

type BlockConstantData = {
  animations?: Partial<Record<AnimationTriggerName, string[]>>;
  category: BlockCategoryName;
  color: [number, number, number];
  decorations: BlockDecoration[];
  movable: boolean;
  moveAxis: [boolean, boolean, boolean];
  parts: BlockPartGeometryData[];
  partDetails: Record<string, BlockPartLookupData | undefined>;
  path: string;
  type: string;
};

export default BlockConstantData;
