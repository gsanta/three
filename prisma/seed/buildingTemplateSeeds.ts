import { BlockType, Prisma } from '@prisma/client';

const buildingTempalteSeeds: (Omit<BlockType, 'animations' | 'decorations' | 'id' | 'parts' | 'partDetails'> & {
  animations?: Prisma.JsonObject;
  decorations: Prisma.JsonArray;
  parts: Prisma.JsonArray;
  partDetails?: Prisma.JsonObject;
})[] = [
  {
    category: 'building-bases',
    decorations: [],
    path: '/building_base_1.glb',
    parts: [
      {
        index: '#1',
        geometryPath: 'base.geometry',
        materialPath: 'Wall',
        position: [-0.092, 0.007, 0.054],
        rotation: [0, 0, 0],
        scale: [-3.718, -0.122, -3.718],
        name: 'root',
      },
      {
        index: '#2',
        geometryPath: 'wall1.geometry',
        materialPath: 'wall-placeholder',
        position: [-3.603, 0.255, 0.054],
        rotation: [0, 0, 0],
        scale: [-3.718, -0.122, -3.718],
        name: 'wall1',
      },
      {
        index: '#3',
        geometryPath: 'wall2.geometry',
        materialPath: 'wall-placeholder',
        position: [-0.092, 0.255, -3.522],
        rotation: [0, 0, 0],
        scale: [-3.718, -0.122, -3.718],
        name: 'wall2',
      },
      {
        index: '#4',
        geometryPath: 'wall3.geometry',
        materialPath: 'wall-placeholder',
        position: [3.465, 0.255, 0.054],
        rotation: [0, 0, 0],
        scale: [-3.718, -0.122, -3.718],
        name: 'wall3',
      },
      {
        index: '#5',
        geometryPath: 'wall4.geometry',
        materialPath: 'wall-placeholder',
        position: [-0.092, 0.255, 3.595],
        rotation: [0, 0, 0],
        scale: [-3.718, -0.122, -3.718],
        name: 'wall4',
      },
      {
        index: '#6',
        geometryPath: 'ceil.geometry',
        materialPath: 'wall-placeholder',
        position: [-0.069, 3.434, 0.037],
        rotation: [0, 0, 0],
        scale: [-3.718, -0.122, -3.718],
        name: 'ceil',
        slot: {},
      },
      {
        index: '#7',
        geometryPath: 'floor.geometry',
        materialPath: 'wall-placeholder',
        position: [-0.092, 0.257, 0.049],
        scale: [-3.628, -0.122, -79.359],
        name: 'floor',
      },
    ],
    partDetails: {
      '#2': {
        category: 'wall-slot',
        orientation: 90,
        type: 'placeholder',
      },
      '#3': {
        category: 'wall-slot',
        type: 'placeholder',
      },
      '#4': {
        category: 'wall-slot',
        orientation: 270,
        type: 'placeholder',
      },
      '#5': {
        category: 'wall-slot',
        orientation: 180,
        type: 'placeholder',
      },
      '#6': {
        category: 'ceil-slot',
        axes: ['y'],
        type: 'placeholder',
      },
      '#7': {
        category: 'active-area',
        allowMovement: ['y'],
        type: 'placeholder',
      },
    },
    type: 'building-base-1',
  },
  {
    category: 'walls',
    decorations: [],
    path: '/wall_new.glb',
    parts: [
      {
        index: '#1',
        geometryPath: 'Cube001.geometry',
        materialPath: 'Wall',
        rotation: [-3.14159, 0, -3.14159],
        scale: [-3.718, -0.122, -3.718],
      },
    ],
    type: 'wall-1',
  },
  {
    category: 'walls',
    decorations: [],
    path: '/wall_door.glb',
    parts: [
      {
        scale: [-3.718, -0.122, -3.718],
        parts: [
          {
            index: '#1',
            geometryPath: 'Cube007.geometry',
            materialPath: 'Wall',
          },
          {
            index: '#2',
            geometryPath: 'Cube007_1.geometry',
            materialPath: 'Wood1',
          },
          {
            index: '#3',
            geometryPath: 'Cube007_2.geometry',
            materialPath: 'Wood2',
          },
        ],
      },
    ],
    type: 'wall-door-1',
  },
  {
    category: 'roofs',
    decorations: [],
    path: '/roof1.glb',
    parts: [
      {
        index: '#1',
        geometryPath: 'Roof1Roof.geometry',
        materialPath: 'Roog',
        position: [-0.069, 0.088, 0.037],
        rotation: [-3.14159, 0, -3.14159],
        scale: [-3.922, -0.064, -3.922],
      },
      {
        index: '#2',
        geometryPath: 'Roof1Area1.geometry',
        materialPath: 'wall-placeholder',
        position: [-0.069, 0.088, 0.037],
        rotation: [-3.14159, 0, -3.14159],
        scale: [-3.922, -0.064, -3.922],
      },
      {
        index: '#3',
        geometryPath: 'Roof1Area2.geometry',
        materialPath: 'wall-placeholder',
        position: [-0.069, 0.088, 0.037],
        rotation: [-3.14159, 0, -3.14159],
        scale: [-3.922, -0.064, -3.922],
      },
    ],
    partDetails: {
      '#2': {
        category: 'active-area',
        role: 'slot',
        type: 'placeholder',
      },
      '#3': {
        category: 'active-area',
        role: 'slot',
        type: 'placeholder',
      },
    },
    type: 'roof-1',
  },
];

export default buildingTempalteSeeds;
