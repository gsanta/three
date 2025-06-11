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
