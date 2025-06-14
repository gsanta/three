import { Prisma } from '@prisma/client';

const cableSeeds: Prisma.BlockTypeUncheckedCreateInput[] = [
  {
    categoryName: 'cables',
    decorations: ['cables'],
    decorationData: {
      cables: {
        decoration: 'cables',
        location: 'overhead',
      },
    },
    path: null,
    type: 'cable-1',
  },
  {
    categoryName: 'cables',
    decorations: ['cables'],
    path: null,
    parts: [
      {
        name: 'End1',
      },
      {
        name: 'End2',
      },
    ],
    partDetails: {
      End1: {
        roles: ['pin'],
        type: 'physical',
      },
      End2: {
        roles: ['pin'],
        type: 'physical',
      },
    },
    decorationData: {
      cables: {
        decoration: 'cables',
        location: 'underground',
      },
    },
    type: 'underground-cable-1',
  },
];

export default cableSeeds;
