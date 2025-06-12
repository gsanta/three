import { Prisma } from '@prisma/client';

const weatherHeadSeeds: Prisma.BlockTypeUncheckedCreateInput[] = [
  {
    categoryName: 'weather-heads',
    path: '/weather_head_1.glb',
    parts: [
      {
        name: 'Body',
        materialPath: 'Palette',
        position: [0, 0.086, 0.171],
        scale: 2.537,
      },
      {
        name: 'BuildingAnchor',
        materialPath: 'Palette',
        position: [0, 0.086, 0.171],
        scale: 2.537,
      },
      {
        name: 'CableAnchor',
        materialPath: 'Palette',
        position: [0, 0.639, -0.252],
        scale: 2.537,
      },
    ],
    partDetails: {
      Body: {},
      BuildingAnchor: {
        roles: ['weather-head-anchor'],
      },
      CableAnchor: {},
    },
    type: 'weather-head-1',
  },
];

export default weatherHeadSeeds;
