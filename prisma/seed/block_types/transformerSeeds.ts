import { BlockType, Prisma } from '@prisma/client';

const transformerSeeds: (Omit<BlockType, 'animations' | 'decorations' | 'id' | 'parts' | 'partDetails'> & {
  animations?: Prisma.JsonObject;
  decorations: Prisma.JsonArray;
  parts?: Prisma.JsonArray;
  partDetails?: Prisma.JsonObject;
})[] = [
  {
    categoryName: 'transformers',
    decorations: ['devices'],
    path: '/distribution_transformer_single_1.glb',
    parts: [
      {
        name: 'Body',
        materialPath: 'Material',
        rotation: [0, 0.588, 0],
        scale: [0.526, 0.689, 0.526],
      },
      {
        name: 'Pin3',
        materialPath: 'Material',
        position: [0.233, 0.957, 0.634],
        rotation: [0, 0.588, 0],
        scale: [0.526, 0.689, 0.526],
      },
      {
        name: 'Pin2',
        materialPath: 'Material',
        position: [-0.05, 0.957, 0.68],
        rotation: [0, 0.588, 0],
        scale: [0.526, 0.689, 0.526],
      },
      {
        name: 'Pin1',
        materialPath: 'Material',
        position: [-0.327, 0.957, 0.596],
        rotation: [0, 0.588, 0],
        scale: [0.526, 0.689, 0.526],
      },
      {
        name: 'Join',
        materialPath: 'Material',
        position: [0.058, 0.958, -0.501],
        rotation: [0, 0.588, 0],
        scale: [0.526, 0.689, 0.526],
      },
    ],
    partDetails: {
      Join: {
        roles: ['transformer-holder'],
      },
    },
    type: 'distribution-transformer-single-1',
  },
];

export default transformerSeeds;
