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
        name: 'Body',
        materialPath: 'Palette',
        scale: 2.537,
      },
      {
        name: 'WeatherHeadAnchor1',
        materialPath: 'Palette',
        position: [-2.005, 7.173, -2.537],
        scale: 2.537,
      },
      {
        name: 'WeatherHeadAnchor2',
        materialPath: 'Palette',
        position: [-2.568, 7.082, 1.925],
        rotation: [0, Math.PI / 2, 0],
        scale: 2.537,
      },
      {
        name: 'WeatherHeadAnchor3',
        materialPath: 'Palette',
        position: [2.534, 7.082, 1.925],
        rotation: [0, Math.PI / 2, 0],
        scale: 2.537,
      },
      {
        name: 'WeatherHeadAnchor4',
        materialPath: 'Palette',
        position: [-2.005, 7.173, 2.532],
        scale: 2.537,
      },
    ],
    partDetails: {
      Base: {},
      WeatherHeadAnchor1: {
        roles: ['weather-head-anchor'],
        type: 'physical',
      },
      WeatherHeadAnchor2: {
        orientation: 90,
        roles: ['weather-head-anchor'],
        type: 'physical',
      },
      WeatherHeadAnchor3: {
        orientation: 270,
        roles: ['weather-head-anchor'],
        type: 'physical',
      },
      WeatherHeadAnchor4: {
        orientation: 180,
        roles: ['weather-head-anchor'],
        type: 'physical',
      },
    },
    type: 'two-story-house-1',
  },
];

export default houseSeeds;
