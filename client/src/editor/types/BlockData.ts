import * as blocks from '../utils/blocks.json';
import Num3 from './Num3';

export type BlockType = keyof typeof blocks;

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

type BlockData<S extends ShapeType = ShapeType> = {
  data: {
    name: BlockType;
    color: [number, number, number];
    shape: S;
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
        shape: 'model';
        parts: ModelPart[];
        path: string;
      }
    | {
        shape: 'tube';
        points: Num3[];
      }
    | {
        shape: 'cone';
        radialSegments: number;
        radius: number;
        height: number;
        points: never;
      }
  );
  snap?: {
    x: number;
    y: number;
    z: number;
  };
  options: {
    rotation: {
      x: number[];
      y: number[];
      z: number[];
    };
    size: {
      scales: number[];
      direction: 'x' | 'y' | 'z';
      selected: number;
    };
  };
  selected: {
    rotation: [number, number, number];
  };
};

export default BlockData;
