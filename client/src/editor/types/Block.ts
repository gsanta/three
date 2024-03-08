import * as blocks from '../utils/blocks.json';

export type BlockType = keyof typeof blocks;

type Block = {
  data: {
    name: BlockType;
    geometry: string;
    scale: [number, number, number];
  };
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
      selected: [number, number, number];
    };
    size: {
      scales: number[];
      direction: 'x' | 'y' | 'z';
      selected: number;
    };
  };
} & {
  data: {
    geometry: 'cone';
    radialSegments: number;
    radius: number;
    height: number;
  };
};

export default Block;
