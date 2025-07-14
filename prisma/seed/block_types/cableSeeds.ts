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
    geometry: 'cable-geometry',
    path: null,
    type: 'cable-1',
  },
  {
    categoryName: 'cables',
    decorations: ['cables'],
    geometry: 'ground-cable-geometry',
    path: '/ground_cable_1.glb',
    parts: [
      {
        name: 'Body',
        materialPath: 'Palette',
        position: [0.004, 0.036, -0.106],
        rotation: [Math.PI / 2, 0, 0],
      },
      {
        name: 'End1',
        materialPath: 'Palette',
        position: [0.004, 0.036, 0.894],
        rotation: [Math.PI / 2, 0, 0],
      },
      {
        name: 'End2',
        materialPath: 'Palette',
        position: [0.004, 0.036, -1.1],
        rotation: [Math.PI / 2, 0, 0],
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
    texturePath: '/ribbon_caution.png',
    type: 'ground-cable-1',
  },
  {
    categoryName: 'cable-groups',
    decorations: [],
    geometry: 'empty',
    // decorationData: {
    //   'cable-groups': {
    //     decoration: 'cable-groups',
    //   },
    // },
    texturePath: '/ribbon_caution.png',
    type: 'cable-group-1',
  },
];

export default cableSeeds;
