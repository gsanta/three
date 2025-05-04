import { BlockType, Prisma } from '@prisma/client';

const humanSeeds: (Omit<BlockType, 'animations' | 'decorations' | 'id' | 'parts' | 'partDetails'> & {
  animations?: Prisma.JsonObject;
  parts?: Prisma.JsonArray;
  partDetails?: Prisma.JsonObject;
})[] = [
  {
    categoryName: 'humans',
    path: '/human_1.glb',
    parts: [
      {
        name: 'Body',
        materialPath: 'Palette',
        scale: [0.711, 1.033, 0.711],
      },
    ],
    partDetails: {
      Body: {},
    },
    type: 'human-1',
  },
];

export default humanSeeds;
