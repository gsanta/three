import { Prisma } from '@prisma/client';

const conduitSeeds: Prisma.BlockTypeUncheckedCreateInput[] = [
  {
    categoryName: 'conduits',
    decorations: [],
    path: '/conduit_riser_1.glb',
    parts: [
      {
        name: 'Body',
        materialPath: 'Palette',
        position: [0.004, -0.008, 0],
        scale: [0.078, 1, 0.078],
      },
      {
        name: 'Holder',
        materialPath: 'Palette',
        position: [0.004, 3.877, -0.106],
        scale: [0.078, 1, 0.078],
      },
      {
        name: 'GroundConnection',
        materialPath: 'Palette',
        position: [0.004, -0.057, 0],
        scale: [0.078, 1, 0.078],
      },
    ],
    partDetails: {
      TransformerHolder: {
        roles: ['pin'],
        type: 'physical',
      },
      GroundConnection: {
        roles: ['pin'],
        type: 'physical',
      },
    },
    type: 'conduit-riser-1',
  },
];

export default conduitSeeds;
