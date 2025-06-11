import { BlockType } from '@prisma/client';

const transformerSeeds: Partial<BlockType>[] = [
  {
    categoryName: 'transformers',
    decorations: ['transformers'],
    path: '/distribution_transformer_single_1.glb',
    parts: [
      {
        name: 'Body',
        materialPath: 'Material',
        rotation: [0, 0.588, 0],
      },
      {
        name: 'Pin3',
        materialPath: 'Material',
        position: [0.233, 0.957, 0.634],
        rotation: [0, 0.588, 0],
      },
      {
        name: 'Pin2',
        materialPath: 'Material',
        position: [-0.05, 0.957, 0.68],
        rotation: [0, 0.588, 0],
      },
      {
        name: 'Pin1',
        materialPath: 'Material',
        position: [-0.327, 0.957, 0.596],
        rotation: [0, 0.588, 0],
      },
      {
        name: 'Join',
        materialPath: 'Material',
        position: [0.058, 0.958, -0.501],
        rotation: [0, 0.588, 0],
      },
    ],
    partDetails: {
      Join: {
        roles: ['transformer-holder'],
      },
    },
    decorationData: {
      transformers: {
        decoration: 'transformers',
        location: 'pole-mounted',
      },
    },
    type: 'distribution-transformer-single-1',
  },
  {
    categoryName: 'transformers',
    decorations: ['transformers'],
    path: '/pad_mounted_transformer_1.glb',
    parts: [
      {
        name: 'Body',
        materialPath: 'Palette',
        position: [-0.028, -0.006, 0.001],
        rotation: [Math.PI, 0, Math.PI],
        scale: [0.766, 1, 0.323],
      },
      {
        name: 'Pin1',
        materialPath: 'Palette',
        position: [-0.467, -0.501, 0.002],
        rotation: [Math.PI, 0, Math.PI],
      },
      {
        name: 'Pin2',
        materialPath: 'Palette',
        position: [0.446, -0.501, 0.002],
        rotation: [Math.PI, 0, Math.PI],
      },
    ],
    partDetails: {
      Pin1: {
        roles: ['pin'],
      },
      Pin2: {
        roles: ['pin'],
      },
    },
    decorationData: {
      transformers: {
        decoration: 'transformers',
        location: 'pad-mounted',
      },
    },
    type: 'pad-mounted-transformer-1',
  },
];

export default transformerSeeds;
