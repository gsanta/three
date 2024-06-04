import { BlockTemplate, Prisma } from '@prisma/client';

const poleTempalteSeeds: (Omit<BlockTemplate, 'id' | 'parts' | 'partDetails' | 'categories'> & {
  categories: Prisma.JsonArray;
  parts?: Prisma.JsonArray;
  partDetails?: Prisma.JsonObject;
})[] = [
  {
    category: 'poles',
    categories: ['pole'],
    name: 'pole-1',
    path: '/pole.glb',
    parts: [
      {
        geometryPath: 'Pole.geometry',
        materialPath: 'Main',
        position: [-0.008, -0.002, 0.01],
        rotation: [-3.14159, 0, -3.14159],
        scale: [-0.136, -4.869, -0.136],
      },
      {
        geometryPath: 'Pin1.geometry',
        materialPath: 'Metal',
        position: [1.114, 9.336, 0.01],
        scale: -0.074,
        name: 'pin1',
      },
      {
        geometryPath: 'Pin2.geometry',
        materialPath: 'Metal',
        position: [-0.475, 9.336, 0.01],
        scale: -0.074,
        name: 'pin2',
      },
      {
        geometryPath: 'Pin3.geometry',
        materialPath: 'Metal',
        position: [-1.113, 9.336, 0.01],
        scale: -0.074,
        name: 'pin3',
      },
    ],
    type: 'poles',
  },
  {
    category: 'poles',
    categories: ['pole'],
    name: 'pole-2',
    path: '/pole2.glb',
    parts: [
      {
        index: '#1',
        geometryPath: 'Pole1Body.geometry',
        materialPath: 'Main',
        position: [-0.008, -0.002, 0.01],
        rotation: [-3.14159, 0, -3.14159],
        scale: [-0.113, -4.042, -0.113],
      },
      {
        index: '#2',
        geometryPath: 'Pole1Pin1.geometry',
        materialPath: 'DarkGray',
        position: [-0.913, 7.154, 0.011],
        scale: 0.081,
        name: 'pin1',
      },
      {
        index: '#3',
        geometryPath: 'Pole1Pin2.geometry',
        materialPath: 'DarkGray',
        position: [-0.378, 7.154, 0.011],
        scale: 0.081,
        name: 'pin2',
      },
      {
        index: '#4',
        geometryPath: 'Pole1Pin3.geometry',
        materialPath: 'DarkGray',
        position: [0.865, 7.154, 0.011],
        scale: 0.081,
        name: 'pin3',
      },
      {
        index: '#5',
        geometryPath: 'Pole1Pin4.geometry',
        materialPath: 'DarkGray',
        position: [0.006, 6.336, 0.216],
        scale: 0.081,
        name: 'pin4',
      },
    ],
    partDetails: {
      '#2': {
        role: 'slot',
        type: 'pin',
      },
      '#3': {
        role: 'slot',
        type: 'pin',
      },
      '#4': {
        role: 'slot',
        type: 'pin',
      },
      '#5': {
        role: 'slot',
        type: 'pin',
      },
    },
    type: 'poles',
  },
  {
    category: 'poles',
    categories: ['poles'],
    name: 'weather-head-1',
    path: '/weather_head_1.glb',
    parts: [
      {
        index: '#1',
        geometryPath: 'WeatherHead1Body.geometry',
        materialPath: 'DarkGray',
        position: [-0.003, 0.013, -0.003],
        scale: [0.06, 1, 0.06],
      },
      {
        index: '#2',
        geometryPath: 'WeatherHead1Pin.geometry',
        materialPath: 'Wall',
        position: [-0.003, 1.433, -0.003],
        scale: [0.06, 1, 0.06],
        name: 'pin1',
      },
    ],
    partDetails: {
      '#2': {
        role: 'slot',
      },
    },
    type: 'weather-heads',
  },
  {
    category: 'cables',
    categories: ['cables'],
    name: 'cable-1',
    path: null,
    type: 'cables',
  },
];

export default poleTempalteSeeds;
