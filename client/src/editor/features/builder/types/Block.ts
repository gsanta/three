import * as blocks from '../utils/blocks.json';

export type BlockType = keyof typeof blocks;

type Block = {
  geometry: string;
  scale: [number, number, number];
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
} & { name: BlockType };

export default Block;
