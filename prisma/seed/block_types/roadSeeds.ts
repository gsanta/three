import { BlockType, Prisma } from '@prisma/client';

const roadSeeds: (Omit<BlockType, 'animations' | 'decorations' | 'id' | 'parts' | 'partDetails'> & {
  animations?: Prisma.JsonObject;
  decorations: Prisma.JsonArray;
  parts: Prisma.JsonArray;
  partDetails?: Prisma.JsonObject;
})[] = [
  {
    categoryName: 'roads',
    decorations: [],
    parts: [
      {
        name: 'Base',
        materialPath: 'Road1Palette',
        scale: [2.184, 0.067, 2.362],
      },
      {
        name: 'EndNorth',
        materialPath: 'Road1Palette',
        position: [-0.002, 0.068, -3.796],
        scale: [2.184, 0.067, 2.484],
      },
      {
        name: 'EndSouth',
        materialPath: 'Road1Palette',
        position: [-0.002, 0.074, 3.778],
        scale: [2.184, 0.067, 2.484],
      },
    ],
    partDetails: {
      Base: {},
      EndNorth: {
        roles: ['road-slot'],
        role: 'slot',
        type: 'placeholder',
      },
      EndSouth: {
        roles: ['road-slot'],
        role: 'slot',
        orientation: 180,
        type: 'placeholder',
      },
    },
    path: '/road_1.glb',
    type: 'road-1',
  },
  {
    categoryName: 'roads',
    decorations: [],
    parts: [
      {
        name: 'Body',
        materialPath: 'Material',
        position: [-0.002, 0.137, -0.019],
        rotation: [-3.14, 0, -3.14],
        scale: [-2.975, -0.132, -2.775],
      },
      {
        name: 'EndNorth',
        materialPath: 'Material',
        position: [0.009, 0.08, -3.77],
        rotation: [-3.14, 0, -3.14],
        scale: [-2.975, -0.132, -2.775],
      },
      {
        name: 'EndSouth',
        materialPath: 'Material',
        position: [0.009, 0.08, 3.766],
        rotation: [-3.14, 0, -3.14],
        scale: [-2.975, -0.132, -2.775],
      },
      {
        name: 'EndEast',
        materialPath: 'Material',
        position: [3.761, 0.079, -0.015],
        rotation: [-3.14, 0, -3.14],
        scale: [-2.975, -0.132, -2.775],
      },
      {
        name: 'EndWest',
        materialPath: 'Material',
        position: [-3.779, 0.079, -0.015],
        rotation: [-3.14, 0, -3.14],
        scale: [-2.975, -0.132, -2.775],
      },
    ],
    partDetails: {
      Body: {},
      EndNorth: {
        roles: ['road-slot'],
        role: 'slot',
        type: 'placeholder',
      },
      EndSouth: {
        roles: ['road-slot'],
        role: 'slot',
        orientation: 180,
        type: 'placeholder',
      },
      EndEast: {
        roles: ['road-slot'],
        role: 'slot',
        orientation: -90,
        type: 'placeholder',
      },
      EndWest: {
        roles: ['road-slot'],
        role: 'slot',
        orientation: 90,
        type: 'placeholder',
      },
    },
    path: '/road_2.glb',
    type: 'road-2',
  },
  {
    categoryName: 'roads',
    decorations: [],
    path: '/road_3.glb',
    parts: [
      {
        name: 'Base',
        materialPath: 'Material',
        position: [0.001, 0.001, 0.003],
        scale: [2.184, 0.067, 2.484],
      },
      {
        name: 'EndSouth',
        materialPath: 'Material',
        position: [-1.543, 0.074, 2.482],
        scale: [2.184, 0.067, 2.484],
      },
      {
        name: 'EndNorth',
        materialPath: 'Material',
        position: [2.51, 0.068, -1.506],
        rotation: [0, -1.5707, 0],
        scale: [2.184, 0.067, 2.484],
      },
    ],
    partDetails: {
      Base: {},
      EndSouth: {
        roles: ['road-slot'],
        role: 'slot',
        orientation: 180,
        type: 'placeholder',
      },
      EndNorth: {
        roles: ['road-slot'],
        role: 'slot',
        orientation: -90,
        type: 'placeholder',
      },
    },
    type: 'road-3',
  },
];

export default roadSeeds;
