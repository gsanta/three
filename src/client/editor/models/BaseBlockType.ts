import * as blocks from '../utils/blocks.json';
import Axis from './Axis';
import { BlockCategoryName } from './block/BlockCategory';
import BlockDecoration from './BlockCategory';
import Num3 from './Num3';

export type BlockName = keyof typeof blocks.blocks;

export type ShapeType = 'box' | 'cone' | 'model' | 'tube';

export type ModelPart = {
  materialPath?: string;
  position: Num3;
  rotation?: Num3;
  scale?: Num3 | number;
  parts: ModelPart[];
  name: string;
};

export type ModelPartRole =
  | 'pin'
  | 'wall-slot'
  | 'ceil-slot'
  | 'floor-slot'
  | 'load-on'
  | 'road-slot'
  | 'load-off'
  | 'wall-join'
  | 'transformer-holder';

export type ModelPartInfo = {
  allowMovement?: Axis[];
  hide?: boolean;
  isSelected?: boolean;
  isConnected?: boolean;
  joins?: [string, string];
  orientation: number;
  role?: 'slot';
  roles?: ModelPartRole[];
  type: 'placeholder' | 'phisycal';
};

export type AnimationTriggerName = 'device-on';

type BaseBlockType<S extends ShapeType = ShapeType> = {
  animations?: Partial<Record<AnimationTriggerName, string[]>>;
  category: BlockCategoryName;
  color: [number, number, number];
  decorations: BlockDecoration[];
  geometry: S;
  position: [number, number, number];
  scale: [number, number, number];
  movable: boolean;
  moveAxis: [boolean, boolean, boolean];
  rotation: [number, number, number];
  parts: ModelPart[];
  partDetails: Record<string, ModelPartInfo | undefined>;
  path: string;
  type: string;
};

export default BaseBlockType;
