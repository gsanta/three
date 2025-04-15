import { BlockType, Prisma } from '@prisma/client';

const plantSeeds: (Omit<BlockType, 'animations' | 'decorations' | 'id' | 'parts' | 'partDetails'> & {
  animations?: Prisma.JsonObject;
  parts?: Prisma.JsonArray;
  partDetails?: Prisma.JsonObject;
})[] = [
  {
    categoryName: 'plants',
    path: '/tree_1.glb',
    parts: [
      {
        name: 'Base',
        materialPath: 'Tree1Palette',
      },
    ],
    partDetails: {
      Base: {},
    },
    type: 'tree-1',
  },
  {
    categoryName: 'plants',
    path: '/tree_2.glb',
    parts: [
      {
        name: 'Base',
        materialPath: 'Tree2Palette',
      },
    ],
    partDetails: {
      Base: {},
    },
    type: 'tree-2',
  },
  {
    categoryName: 'plants',
    path: '/tree_3.glb',
    parts: [
      {
        name: 'Base',
        materialPath: 'Tree2Palette',
        scale: 1.358,
      },
    ],
    partDetails: {
      Base: {},
    },
    type: 'tree-3',
  },
];

export default plantSeeds;
