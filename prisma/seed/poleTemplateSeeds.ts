import { BlockType, Prisma } from '@prisma/client';

const poleTempalteSeeds: (Omit<BlockType, 'animations' | 'decorations' | 'id' | 'parts' | 'partDetails'> & {
  animations?: Prisma.JsonObject;
  decorations: Prisma.JsonArray;
  parts?: Prisma.JsonArray;
  partDetails?: Prisma.JsonObject;
})[] = [
  {
    category: 'poles',
    decorations: ['devices'],
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
      '#1': {
        name: 'root',
      },
      '#2': {
        role: 'slot',
        category: 'pin',
        name: 'pin1',
        type: 'physical',
      },
      '#3': {
        category: 'pin',
        name: 'pin2',
        role: 'slot',
        type: 'physical',
      },
      '#4': {
        name: 'pin3',
        role: 'slot',
        category: 'pin',
        type: 'physical',
      },
      '#5': {
        name: 'pin4',
        role: 'slot',
        category: 'pin',
        type: 'physical',
      },
    },
    type: 'pole-1',
  },
  {
    category: 'weather-heads',
    decorations: ['devices'],
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
      '#1': {
        name: 'root',
      },
      '#2': {
        name: 'pin',
        role: 'slot',
        category: 'pin',
        type: 'physical',
      },
    },
    type: 'weather-head-1',
  },
  {
    category: 'cables',
    decorations: ['cables'],
    path: null,
    type: 'cable-1',
  },
];

export default poleTempalteSeeds;
