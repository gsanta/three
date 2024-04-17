import * as blocks from '../utils/blocks.json';
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
};

type BlockType<S extends ShapeType = ShapeType> = {
  category: BlockCategory;
  name: BlockName;
  color: [number, number, number];
  geometry: S;
  position: [number, number, number];
  scale: [number, number, number];
  movable: boolean;
  rotation: [number, number, number];
  radialSegments: number;
  radius: number;
  height: number;
  points?: Num3[];
} & (
  | {
      geometry: 'model';
      parts: ModelPart[];
      path: string;
    }
  | {
      geometry: 'tube';
      points: Num3[];
    }
  | {
      geometry: 'cone';
      radialSegments: number;
      radius: number;
      height: number;
      points: never;
    }
);
// snap?: {
//   x: number;
//   y: number;
//   z: number;
// };
// options: {
//   rotation: {
//     x: number[];
//     y: number[];
//     z: number[];
//   };
//   size: {
//     scales: number[];
//     direction: 'x' | 'y' | 'z';
//     selected: number;
//   };
// };
// selected: {
//   rotation: [number, number, number];
// };

export default BlockType;
