import * as blocks from '../utils/blocks.json';
import Num3 from './Num3';

export type BlockType = keyof typeof blocks;

type Block = {
  data: {
    name: BlockType;
    geometry: string;
    position: [number, number, number];
    scale: [number, number, number];
    rotation: [number, number, number];
  } & (
    | {
        name: BlockType;
        radialSegments: never;
        radius: never;
        height: never;
        points: never;
      }
    | {
        name: 'roof';
        radialSegments: number;
        radius: number;
        height: number;
      }
    | {
        name: 'cable';
        points: Num3[];
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

export default Block;
