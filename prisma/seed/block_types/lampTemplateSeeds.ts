import { BlockType, Prisma } from '@prisma/client';

const lampTempalteSeeds: (Omit<BlockType, 'animations' | 'decorations' | 'id' | 'parts' | 'partDetails'> & {
  animations?: Prisma.JsonObject;
  decorations: Prisma.JsonArray;
  parts: Prisma.JsonArray;
  partDetails?: Prisma.JsonObject;
})[] = [
  {
    category: 'lamps',
    decorations: ['devices'],
    path: '/lamp1.glb',
    parts: [
      {
        index: '#1',
        geometryPath: 'Lamp1Body.geometry',
        materialPath: 'DarkGray',
        position: [0.003, 0.017, -0.003],
        scale: [0.102, 1.563, 0.102],
        name: 'root',
      },
      {
        index: '#2',
        position: [0.003, 2.737, -0.003],
        scale: [0.102, 1.563, 0.102],
        parts: [
          {
            geometryPath: 'Cube022.geometry',
            materialPath: 'DarkGray',
          },
          {
            geometryPath: 'Cube022_1.geometry',
            materialPath: 'Road',
          },
        ],
      },
      {
        index: '#3',
        position: [0.003, 2.737, -0.003],
        scale: [0.102, 1.563, 0.102],
        parts: [
          {
            geometryPath: 'Cube023.geometry',
            materialPath: 'DarkGray',
          },
          {
            geometryPath: 'Cube023_1.geometry',
            materialPath: 'Wood1',
          },
        ],
      },
    ],
    partDetails: {
      '#2': {
        category: 'load-off',
        hide: false,
      },
      '#3': {
        category: 'load-on',
        hide: true,
      },
    },
    type: 'lamp-1',
  },
];

export default lampTempalteSeeds;
