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
    path: '/distribution_transformer.glb',
    parts: [
      {
        index: '#1',
        geometryPath: 'Distribution_transformer1Body.geometry',
        materialPath: 'Material',
        rotation: [0, 0.588, 0],
        scale: [0.526, 0.689, 0.526],
      },
      {
        index: '#2',
        geometryPath: 'Distribution_transformer1Pin3.geometry',
        materialPath: 'Material',
        position: [0.233, 0.957, 0.634],
        rotation: [0, 0.588, 0],
        scale: [0.526, 0.689, 0.526],
      },
      {
        index: '#3',
        geometryPath: 'Distribution_transformer1Pin2.geometry',
        materialPath: 'Material',
        position: [-0.05, 0.957, 0.68],
        rotation: [0, 0.588, 0],
        scale: [0.526, 0.689, 0.526],
      },
      {
        index: '#4',
        geometryPath: 'Distribution_transformer1Pin1.geometry',
        materialPath: 'Material',
        position: [-0.327, 0.957, 0.596],
        rotation: [0, 0.588, 0],
        scale: [0.526, 0.689, 0.526],
      },
      {
        index: '#5',
        geometryPath: 'Distribution_transformer1Join.geometry',
        materialPath: 'Material',
        position: [0.058, 0.958, -0.501],
        rotation: [0, 0.588, 0],
        scale: [0.526, 0.689, 0.526],
      },
    ],
    partDetails: {
      '#1': {
        name: 'root',
      },
    },
    type: 'distribution-transformer-single-phased',
  },
];

export default transformerSeeds;
