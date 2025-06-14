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
  {
    categoryName: 'transformers',
    decorations: ['transformers'],
    path: '/pole_mounted_transformer_1.glb',
    parts: [
      {
        name: 'Body',
        materialPath: 'Palette',
        position: [-0.012, 0.018, 0.118],
        scale: [0.683, 0.689, 0.3],
      },
      {
        name: 'Holder',
        materialPath: 'Palette',
        position: [-0.096, 0.707, 0.451],
        scale: [0.321, 0.042, 0.048],
      },
      {
        name: 'N',
        materialPath: 'Palette',
        position: [0.453, -0.103, 0.001],
        scale: [0.059, 0.059, 0.063],
      },
      {
        name: 'L3',
        materialPath: 'Palette',
        position: [0.212, -0.103, 0.001],
        scale: [0.059, 0.059, 0.063],
      },
      {
        name: 'L2',
        materialPath: 'Palette',
        position: [-0.22, -0.103, 0.001],
        scale: [0.059, 0.059, 0.063],
      },
      {
        name: 'L1',
        materialPath: 'Palette',
        position: [-0.539, -0.103, 0.001],
        scale: [0.059, 0.059, 0.063],
      },
    ],
    partDetails: {
      L1: {
        roles: ['pin'],
        type: 'physical',
      },
      L2: {
        roles: ['pin'],
        type: 'physical',
      },
      L3: {
        roles: ['pin'],
        type: 'physical',
      },
      N: {
        roles: ['pin'],
        type: 'physical',
      },
    },
    decorationData: {
      transformers: {
        decoration: 'transformers',
        location: 'pole-mounted',
      },
      poles: {
        decoration: 'poles',
        wires: ['L1', 'L2', 'L3', 'N'],
      },
    },
    type: 'pole-mounted-transformer-1',
  },
];

export default transformerSeeds;
