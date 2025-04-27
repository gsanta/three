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
      {
        name: 'WeatherHead',
        materialPath: 'Palette',
        position: [-1.843, 7.337, -2.924],
        scale: 2.537,
      },
    ],
    partDetails: {
      Base: {},
      WeatherHead: {
        role: 'slot',
        roles: ['pin'],
        type: 'physical',
      },
    },
    type: 'two-story-house-1',
  },
];

export default houseSeeds;
