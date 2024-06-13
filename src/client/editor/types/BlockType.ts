import * as blocks from '../utils/blocks.json';
import Axis from './Axis';
import BlockDecoration from './BlockCategory';
import Num3 from './Num3';

export type BlockName = keyof typeof blocks.blocks;

export type ShapeType = 'box' | 'cone' | 'model' | 'tube';

export type ModelPart = {
  geometryPath?: string;
  index: string;
  materialPath?: string;
  position?: Num3;
  rotation?: Num3;
  scale?: Num3 | number;
  parts: ModelPart[];
  name?: string;
};

export type ModelPartCategory = 'pin' | 'wall-slot' | 'ceil-slot' | 'load-on' | 'load-off';

export type ModelPartInfo = {
  allowMovement?: Axis[];
  isHidden?: boolean;
  isSelected?: boolean;
  orientation: number;
  role?: 'slot';
  category: ModelPartCategory;
  type: 'placeholder' | 'phisycal';
};

type BlockType<S extends ShapeType = ShapeType> = {
  category: string;
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

export default BlockType;
