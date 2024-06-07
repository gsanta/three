import * as blocks from '../utils/blocks.json';
import Axis from './Axis';
import BlockCategory from './BlockCategory';
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

export type ModelPartDetail = {
  allowMovement?: Axis[];
  isHidden?: boolean;
  orientation: number;
  role?: 'slot';
  type?: string;
};

type BlockType<S extends ShapeType = ShapeType> = {
  category: string;
  categories: BlockCategory[];
  color: [number, number, number];
  geometry: S;
  position: [number, number, number];
  scale: [number, number, number];
  movable: boolean;
  moveAxis: [boolean, boolean, boolean];
  rotation: [number, number, number];
  parts: ModelPart[];
  partDetails: Record<string, ModelPartDetail | undefined>;
  path: string;
  type: string;
};

export default BlockType;
