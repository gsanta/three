import { BlockType, Prisma } from '@prisma/client';

const electricityProviders: (Omit<BlockType, 'animations' | 'decorations' | 'id' | 'parts' | 'partDetails'> & {
  animations?: Prisma.JsonObject;
  decorations: Prisma.JsonArray;
  parts: Prisma.JsonArray;
  partDetails?: Prisma.JsonObject;
})[] = [
  {
    animations: {},
    category: 'electricity-providers',
    decorations: ['devices'],
    path: '/generator1.glb',
    parts: [
      {
        index: '#1',
        geometryPath: 'Cube028.geometry',
        materialPath: 'White',
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [0.481, 0.581, 0.74],
      },
      {
        index: '#2',
        geometryPath: 'Cube028_1.geometry',
        materialPath: 'DarkGray',
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [0.481, 0.581, 0.74],
      },
      {
        index: '#3',
        geometryPath: 'Cube.geometry',
        materialPath: 'DarkGray',
        position: [0.467, 0.918, 0.38],
        rotation: [0, 0, 0],
        scale: [-0.014, -0.051, -0.051],
      },
    ],
    partDetails: {
      '#1': {
        name: '#1',
      },
      '#2': {
        name: '#2',
      },
      '#3': {
        category: 'pin',
        name: '#3',
        type: 'physical',
      },
    },
    type: 'generator-1',
  },
];

export default electricityProviders;
