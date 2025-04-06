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
        name: 'Lamp1Body',
        materialPath: 'DarkGray',
        position: [0.003, 0.017, -0.003],
        scale: [0.102, 1.563, 0.102],
      },
      {
        position: [0.003, 2.737, -0.003],
        scale: [0.102, 1.563, 0.102],
        parts: [
          {
            name: 'Cube022',
            materialPath: 'DarkGray',
          },
          {
            name: 'Cube022_1',
            materialPath: 'Road',
          },
        ],
      },
      {
        name: '#3',
        position: [0.003, 2.737, -0.003],
        scale: [0.102, 1.563, 0.102],
        parts: [
          {
            name: 'Cube023',
            materialPath: 'DarkGray',
          },
          {
            name: 'Cube023_1',
            materialPath: 'Wood1',
          },
        ],
      },
    ],
    partDetails: {
      '#2': {
        roles: ['load-off'],
        hide: false,
      },
      '#3': {
        roles: ['load-on'],
        hide: true,
      },
    },
    type: 'lamp-1',
  },
];

export default lampTempalteSeeds;
