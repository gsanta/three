import { BlockTemplate, Prisma } from '@prisma/client';

const roadTempalteSeeds: (Omit<BlockTemplate, 'categories' | 'id' | 'parts' | 'partDetails'> & {
  categories: Prisma.JsonArray;
  parts: Prisma.JsonArray;
  partDetails: Prisma.JsonObject;
})[] = [
  {
    category: 'roads',
    categories: [],
    parts: [
      {
        index: '#1',
        geometryPath: 'Cube008.geometry',
        materialPath: 'Road',
        position: [-0.002, 0.001, -0.019],
        scale: [2.184, 0.067, 2.484],
        name: 'root',
      },
      {
        index: '#2',
        geometryPath: 'Cube008_1.geometry',
        materialPath: 'White',
        position: [-0.002, 0.001, -0.019],
        scale: [2.184, 0.067, 2.484],
        name: 'stripes',
      },
      {
        index: '#3',
        geometryPath: 'EndNorth.geometry',
        materialPath: 'wall-placeholder',
        position: [-0.002, 0.068, -2.011],
        scale: [2.184, 0.067, 2.484],
        name: 'end-north',
      },
      {
        index: '#4',
        geometryPath: 'EndSouth.geometry',
        materialPath: 'wall-placeholder',
        position: [-0.002, 0.074, 1.977],
        scale: [2.184, 0.067, 2.484],
        name: 'end-south',
      },
    ],
    partDetails: {
      '#3': {
        role: 'slot',
      },
      '#4': {
        role: 'slot',
        orientation: 180,
      },
    },
    path: '/road1.glb',
    type: 'road-1',
  },
  {
    categories: [],
    category: 'roads',
    parts: [
      {
        index: '#1',
        geometryPath: 'Cube012.geometry',
        materialPath: 'Road',
        position: [-0.002, 0.137, -0.019],
        rotation: [-3.14, 0, -3.14],
        scale: [-2.975, -0.132, -2.775],
        name: 'root',
      },
      {
        index: '#2',
        geometryPath: 'Cube012_1.geometry',
        materialPath: 'White',
        position: [-0.002, 0.137, -0.019],
        rotation: [-3.14, 0, -3.14],
        scale: [-2.975, -0.132, -2.775],
      },
      {
        index: '#3',
        geometryPath: 'EndNorth001.geometry',
        materialPath: 'wall-placeholder',
        position: [0.009, 0.08, -3.022],
        rotation: [-3.14, 0, -3.14],
        scale: [-2.975, -0.132, -2.775],
        name: 'end-north',
      },
      {
        index: '#4',
        geometryPath: 'EndSouth001.geometry',
        materialPath: 'wall-placeholder',
        position: [0.009, 0.08, 2.979],
        rotation: [-3.14, 0, -3.14],
        scale: [-2.975, -0.132, -2.775],
        name: 'end-south',
      },
      {
        index: '#5',
        geometryPath: 'EndEast.geometry',
        materialPath: 'wall-placeholder',
        position: [2.987, 0.079, -0.015],
        rotation: [-3.14, 0, -3.14],
        scale: [-2.975, -0.132, -2.775],
        name: 'end-east',
      },
      {
        index: '#6',
        geometryPath: 'EndWest.geometry',
        materialPath: 'wall-placeholder',
        position: [-2.991, 0.079, -0.015],
        rotation: [-3.14, 0, -3.14],
        scale: [-2.975, -0.132, -2.775],
        name: 'end-west',
      },
    ],
    partDetails: {
      '#3': {
        role: 'slot',
      },
      '#4': {
        role: 'slot',
        orientation: 180,
      },
      '#5': {
        role: 'slot',
        orientation: 90,
      },
      '#6': {
        role: 'slot',
        orientation: 270,
      },
    },
    path: '/road2.glb',
    type: 'road-2',
  },
  {
    categories: [],
    category: 'roads',
    path: '/road3.glb',
    parts: [
      {
        index: '#1',
        geometryPath: 'Cube018.geometry',
        materialPath: 'Road',
        position: [0.001, 0.001, 0.003],
        scale: [2.184, 0.067, 2.484],
        name: 'root',
      },
      {
        index: '#2',
        geometryPath: 'Cube018_1.geometry',
        materialPath: 'White',
        position: [0.001, 0.001, 0.003],
        scale: [2.184, 0.067, 2.484],
        name: 'stripes',
      },
      {
        index: '#3',
        geometryPath: 'Road3EndSouth.geometry',
        materialPath: 'wall-placeholder',
        position: [-1.543, 0.074, 2.482],
        scale: [2.184, 0.067, 2.484],
        name: 'end-south',
      },
      {
        index: '#4',
        geometryPath: 'Road3EndNorth.geometry',
        materialPath: 'wall-placeholder',
        position: [2.51, 0.068, -1.506],
        rotation: [0, -1.5707, 0],
        scale: [2.184, 0.067, 2.484],
        name: 'end-east',
      },
    ],
    partDetails: {
      '#3': {
        role: 'slot',
        orientation: 180,
      },
      '#4': {
        role: 'slot',
        orientation: 90,
      },
    },
    type: 'road-3',
  },
];

export default roadTempalteSeeds;