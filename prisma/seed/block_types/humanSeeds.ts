import { Prisma } from '@prisma/client';

const humanSeeds: Prisma.BlockTypeUncheckedCreateInput[] = [
  {
    categoryName: 'humans',
    decorations: ['players'],
    decorationData: {
      players: {
        currentMovementPath: undefined,
        decoration: 'players',
        maxWork: 3,
        remainingWork: 3,
      },
    },
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
