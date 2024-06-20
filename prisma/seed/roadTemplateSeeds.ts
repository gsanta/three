import { BlockType, Prisma } from '@prisma/client';

const roadTempalteSeeds: (Omit<BlockType, 'animations' | 'decorations' | 'id' | 'parts' | 'partDetails'> & {
  animations?: Prisma.JsonObject;
  decorations: Prisma.JsonArray;
  parts: Prisma.JsonArray;
  partDetails?: Prisma.JsonObject;
})[] = [
  {
    category: 'roads',
    decorations: [],
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
      '#1': {
        name: 'root',
      },
      '#2': {
        name: 'stripes',
      },
      '#3': {
        category: 'road-slot',
        name: 'end-north',
        role: 'slot',
        type: 'placeholder',
      },
      '#4': {
        category: 'road-slot',
        name: 'end-south',
        role: 'slot',
        orientation: 180,
        type: 'placeholder',
      },
    },
    path: '/road1.glb',
    type: 'road-1',
  },
  {
    category: 'roads',
    decorations: [],
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
      '#1': {
        name: 'root',
      },
      '#2': {
        name: 'stripes',
      },
      '#3': {
        category: 'road-slot',
        name: 'end-north',
        role: 'slot',
        type: 'placeholder',
      },
      '#4': {
        category: 'road-slot',
        name: 'end-south',
        role: 'slot',
        orientation: 180,
        type: 'placeholder',
      },
      '#5': {
        category: 'road-slot',
        name: 'end-east',
        role: 'slot',
        orientation: 90,
        type: 'placeholder',
      },
      '#6': {
        category: 'road-slot',
        name: 'end-west',
        role: 'slot',
        orientation: 270,
        type: 'placeholder',
      },
    },
    path: '/road2.glb',
    type: 'road-2',
  },
  {
    category: 'roads',
    decorations: [],
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
      '#1': {
        name: 'root',
      },
      '#2': {
        name: 'stripes',
      },
      '#3': {
        category: 'road-slot',
        name: 'end-south',
        role: 'slot',
        orientation: 180,
        type: 'placeholder',
      },
      '#4': {
        category: 'road-slot',
        name: 'end-east',
        role: 'slot',
        orientation: 90,
        type: 'placeholder',
      },
    },
    type: 'road-3',
  },
];

export default roadTempalteSeeds;
