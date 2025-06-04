import { BlockType, Prisma } from '@prisma/client';

const poleTempalteSeeds: (Omit<BlockType, 'animations' | 'decorations' | 'id' | 'parts' | 'partDetails'> & {
  animations?: Prisma.JsonObject;
  decorations: Prisma.JsonArray;
  parts?: Prisma.JsonArray;
  partDetails?: Prisma.JsonObject;
})[] = [
  {
    categoryName: 'poles',
    decorations: ['devices'],
    path: '/pole_1.glb',
    parts: [
      {
        name: 'Body',
        materialPath: 'Main',
        position: [-0.008, -0.002, 0.01],
      },
      {
        name: 'ContextMenuAnchor',
        materialPath: 'Main',
        position: [-0.008, 8.161, 0.01],
      },
      {
        name: 'Pin1',
        materialPath: 'DarkGray',
        position: [-0.913, 7.154, 0.011],
        scale: 0.081,
      },
      {
        name: 'Pin1b',
        materialPath: 'DarkGray',
        position: [-0.913, 7.154, 0.011],
        scale: 0.081,
      },
      {
        name: 'Pin2',
        materialPath: 'DarkGray',
        position: [-0.378, 7.154, 0.011],
        scale: 0.081,
      },
      {
        name: 'Pin2b',
        materialPath: 'DarkGray',
        position: [-0.378, 7.154, 0.011],
        scale: 0.081,
      },
      {
        name: 'Pin3',
        materialPath: 'DarkGray',
        position: [0.865, 7.154, 0.011],
        scale: 0.081,
      },
      {
        name: 'Pin3b',
        materialPath: 'DarkGray',
        position: [0.865, 7.154, 0.011],
        scale: 0.081,
      },
      {
        name: 'Pin4',
        materialPath: 'DarkGray',
        position: [0.006, 6.336, 0.216],
      },
    ],
    partDetails: {
      Body: {},
      ContextMenuAnchor: {},
      Pin1: {
        roles: ['pin'],
        type: 'physical',
      },
      Pin1b: {
        roles: ['pin'],
        type: 'placeholder',
      },
      Pin2: {
        roles: ['pin'],
        type: 'physical',
      },
      Pin2b: {
        roles: ['pin'],
        type: 'placeholder',
      },
      Pin3: {
        roles: ['pin'],
        type: 'physical',
      },
      Pin3b: {
        roles: ['pin'],
        type: 'placeholder',
      },
      Pin4: {
        roles: ['pin'],
        type: 'physical',
      },
    },
    type: 'pole-1',
  },
  {
    categoryName: 'poles',
    decorations: ['devices'],
    path: '/pole_2.glb',
    parts: [
      {
        name: 'Body',
        materialPath: 'Pole2Palette',
        position: [0.128, 0.017, -0.123],
        rotation: [0.065, 0, 0.064],
        scale: [0.065, 2.446, 0.065],
      },
      {
        name: 'Pin1',
        materialPath: 'Pole2Palette',
        position: [0.926, 6.745, -0.43],
        rotation: [0.065, 0, 0.064],
        scale: [0.065, 2.446, 0.065],
      },
      {
        name: 'Pin1b',
        materialPath: 'Pole2Palette',
        position: [0.926, 6.745, -0.43],
        rotation: [0.065, 0, 0.064],
        scale: [0.065, 2.446, 0.065],
      },
      {
        name: 'Pin2',
        materialPath: 'Pole2Palette',
        position: [0.926, 5.37, -0.43],
        rotation: [0.065, 0, 0.064],
        scale: [0.065, 2.446, 0.065],
      },
      {
        name: 'Pin2b',
        materialPath: 'Pole2Palette',
        position: [0.926, 5.37, -0.43],
        rotation: [0.065, 0, 0.064],
        scale: [0.065, 2.446, 0.065],
      },
      {
        name: 'Pin3',
        materialPath: 'Pole2Palette',
        position: [-0.637, 5.942, -0.43],
        rotation: [0.065, 0, 0.064],
        scale: [0.065, 2.446, 0.065],
      },
      {
        name: 'Pin3b',
        materialPath: 'Pole2Palette',
        position: [-0.637, 5.942, -0.43],
        rotation: [0.065, 0, 0.064],
        scale: [0.065, 2.446, 0.065],
      },
    ],
    partDetails: {
      Body: {},
      Pin1: {
        roles: ['pin'],
        type: 'physical',
      },
      Pin1b: {
        roles: ['pin'],
        type: 'placeholder',
      },
      Pin2: {
        roles: ['pin'],
        type: 'physical',
      },
      Pin2b: {
        roles: ['pin'],
        type: 'placeholder',
      },
      Pin3: {
        roles: ['pin'],
        type: 'physical',
      },
      Pin3b: {
        roles: ['pin'],
        type: 'placeholder',
      },
    },
    type: 'pole-2',
  },
  {
    categoryName: 'poles',
    decorations: ['devices'],
    path: '/pole_3.glb',
    parts: [
      {
        name: 'Body',
        materialPath: 'Palette',
        rotation: [1.57, 1.506, -1.507],
        scale: [0.065, 2.446, 0.065],
      },
      {
        name: 'Pin1',
        materialPath: 'Palette',
        position: [2.807, 6.745, 1.53],
        rotation: [1.57, 1.506, -1.507],
        scale: [0.127, 4.774, 0.127],
      },
      {
        name: 'Pin1b',
        materialPath: 'Palette',
        position: [2.807, 6.745, 1.53],
        rotation: [1.57, 1.506, -1.507],
        scale: [0.065, 2.446, 0.065],
      },
      {
        name: 'Pin2',
        materialPath: 'Palette',
        position: [2.807, 5.37, 1.53],
        rotation: [1.57, 1.506, -1.507],
        scale: [0.127, 4.774, 0.127],
      },
      {
        name: 'Pin2b',
        materialPath: 'Palette',
        position: [2.807, 5.37, 1.53],
        rotation: [1.57, 1.506, -1.507],
        scale: [0.127, 4.774, 0.127],
      },
      {
        name: 'Pin3',
        materialPath: 'Palette',
        position: [2.807, 5.942, 3.094],
        rotation: [1.57, 1.506, -1.507],
        scale: [0.127, 4.774, 0.127],
      },
      {
        name: 'Pin3b',
        materialPath: 'Palette',
        position: [2.807, 5.942, 3.094],
        rotation: [1.57, 1.506, -1.507],
        scale: [0.127, 4.774, 0.127],
      },
    ],
    partDetails: {
      Body: {},
      Pin1: {
        roles: ['pin'],
        type: 'physical',
      },
      Pin1b: {
        roles: ['pin'],
        type: 'placeholder',
      },
      Pin2: {
        roles: ['pin'],
        type: 'physical',
      },
      Pin2b: {
        roles: ['pin'],
        type: 'placeholder',
      },
      Pin3: {
        roles: ['pin'],
        type: 'physical',
      },
      Pin3b: {
        roles: ['pin'],
        type: 'placeholder',
      },
    },
    type: 'pole-3',
  },
  // {
  //   categoryName: 'weather-heads',
  //   decorations: ['devices'],
  //   path: '/weather_head_1.glb',
  //   parts: [
  //     {
  //       index: '#1',
  //       geometryPath: 'WeatherHead1Body.geometry',
  //       materialPath: 'DarkGray',
  //       position: [-0.003, 0.013, -0.003],
  //       scale: [0.06, 1, 0.06],
  //     },
  //     {
  //       index: '#2',
  //       geometryPath: 'WeatherHead1Pin.geometry',
  //       materialPath: 'Wall',
  //       position: [-0.003, 1.433, -0.003],
  //       scale: [0.06, 1, 0.06],
  //       name: 'pin1',
  //     },
  //   ],
  //   partDetails: {
  //     '#1': {
  //       name: 'root',
  //     },
  //     '#2': {
  //       name: 'pin',
  //       category: 'pin',
  //       type: 'physical',
  //     },
  //   },
  //   type: 'weather-head-1',
  // },
  {
    categoryName: 'cables',
    decorations: ['cables'],
    path: null,
    type: 'cable-1',
  },
];

export default poleTempalteSeeds;
