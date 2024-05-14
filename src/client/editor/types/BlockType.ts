import * as blocks from '../utils/blocks.json';
import Axis from './Axis';
import BlockCategory from './BlockCategory';
import Num3 from './Num3';

export type BlockName = keyof typeof blocks.blocks;

export type ShapeType = 'box' | 'cone' | 'model' | 'tube';

export type ModelPart = {
  geometryPath?: string;
  materialPath?: string;
  position?: Num3;
  rotation?: Num3;
  scale?: Num3 | number;
  parts: ModelPart[];
  name?: string;
  orientation: number;
  slot?: {
    allowed?: Record<string, { slots: [] }>;
    allowMovement?: Axis[];
  };
};

type BlockType<S extends ShapeType = ShapeType> = {
  category: BlockCategory;
  name: BlockName;
  color: [number, number, number];
  geometry: S;
  position: [number, number, number];
  scale: [number, number, number];
  movable: boolean;
  moveAxis: [boolean, boolean, boolean];
  rotation: [number, number, number];
  radialSegments: number;
  radius: number;
  height: number;
  points?: Num3[];
  parts: ModelPart[];
  path: string;
  slots: Record<string, { categories?: string[]; slots?: string[]; rotation?: number }>;
};
// & (
//   | {
//       geometry: 'tube';
//       points: Num3[];
//     }
//   | {
//       geometry: 'cone';
//       radialSegments: number;
//       radius: number;
//       height: number;
//       points: never;
//     }
// );

export default BlockType;
