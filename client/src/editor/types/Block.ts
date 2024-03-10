import * as blocks from '../utils/blocks.json';

export type BlockType = keyof typeof blocks;

type Block = {
  data: {
    name: BlockType;
    geometry: string;
    position: [number, number, number];
    scale: [number, number, number];
    rotation: [number, number, number];
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
} & {
  data: {
    geometry: 'cone';
    radialSegments: number;
    radius: number;
    height: number;
  };
};

export default Block;
