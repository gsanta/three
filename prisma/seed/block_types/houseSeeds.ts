import { BlockType, Prisma } from '@prisma/client';

const houseSeeds: (Omit<BlockType, 'animations' | 'decorations' | 'id' | 'parts' | 'partDetails'> & {
  animations?: Prisma.JsonObject;
  parts?: Prisma.JsonArray;
  partDetails?: Prisma.JsonObject;
})[] = [
  {
    categoryName: 'houses',
    path: '/two_story_house_1.glb',
    parts: [
      {
        name: 'Base',
        materialPath: 'Palette',
        scale: [2.537, 2.537, 2.537],
      },
    ],
    partDetails: {
      Base: {},
    },
    type: 'two-story-house-1',
  },
];

export default houseSeeds;
