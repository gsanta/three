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
        rotation: [-Math.PI, 0, -Math.PI],
        scale: [-3.718, -0.122, -3.718],
      },
      {
        index: '#2',
        geometryPath: 'wall1.geometry',
        materialPath: 'wall-placeholder',
        position: [-3.603, 0.264, 0.054],
        rotation: [-Math.PI, 0, -Math.PI],
        scale: [-3.718, -0.122, -3.718],
      },
      {
        index: '#3',
        geometryPath: 'wall2.geometry',
        materialPath: 'wall-placeholder',
        position: [-0.092, 0.264, -3.522],
        rotation: [-Math.PI, 0, -Math.PI],
        scale: [-3.718, -0.122, -3.718],
      },
      {
        index: '#4',
        geometryPath: 'wall3.geometry',
        materialPath: 'wall-placeholder',
        position: [3.465, 0.264, 0.054],
        rotation: [-Math.PI, 0, -Math.PI],
        scale: [-3.718, -0.122, -3.718],
      },
      {
        index: '#5',
        geometryPath: 'wall4.geometry',
        materialPath: 'wall-placeholder',
        position: [-0.092, 0.264, 3.595],
        rotation: [-Math.PI, 0, -Math.PI],
        scale: [-3.718, -0.122, -3.718],
      },
      {
        index: '#6',
        geometryPath: 'ceil.geometry',
        materialPath: 'wall-placeholder',
        position: [-0.069, 3.434, 0.037],
        rotation: [-Math.PI, 0, -Math.PI],
        scale: [-3.718, -0.122, -3.718],
      },
      {
        index: '#7',
        geometryPath: 'Platform1Floor.geometry',
        materialPath: 'wall-placeholder',
        position: [-0.092, 0.264, 0.054],
        rotation: [-Math.PI, 0, -Math.PI],
        scale: [-3.718, -0.122, -3.718],
      },
      {
        index: '#8',
        geometryPath: 'Platform1Column1.geometry',
        materialPath: 'Wall',
        position: [-3.603, 1.843, 3.595],
        rotation: [-Math.PI, 0, -Math.PI],
        scale: [-3.718, -0.122, -3.718],
      },
      {
        index: '#9',
        geometryPath: 'Platform1Column2.geometry',
        materialPath: 'Wall',
        position: [3.465, 1.843, 3.595],
        rotation: [-Math.PI, 0, -Math.PI],
        scale: [-3.718, -0.122, -3.718],
      },
      {
        index: '#10',
        geometryPath: 'Platform1Column3.geometry',
        materialPath: 'Wall',
        position: [3.409, 1.843, -3.522],
        rotation: [-Math.PI, 0, -Math.PI],
        scale: [-3.718, -0.122, -3.718],
      },
      {
        index: '#11',
        geometryPath: 'Platform1Column3.geometry',
        materialPath: 'Wall',
        position: [-3.562, 1.843, -3.522],
        rotation: [-Math.PI, 0, -Math.PI],
        scale: [-3.718, -0.122, -3.718],
      },
    ],
    partDetails: {
      '#1': {
        name: 'root',
      },
      '#2': {
        category: 'wall-slot',
        orientation: 90,
        name: 'wall1',
        type: 'placeholder',
        joins: ['#8', '#11'],
      },
      '#3': {
        category: 'wall-slot',
        name: 'wall2',
        type: 'placeholder',
        joins: ['#10', '#11'],
      },
      '#4': {
        category: 'wall-slot',
        orientation: 270,
        name: 'wall3',
        type: 'placeholder',
        joins: ['#9', '#10'],
      },
      '#5': {
        category: 'wall-slot',
        orientation: 180,
        name: 'wall4',
        type: 'placeholder',
        joins: ['#8', '#9'],
      },
      '#6': {
        category: 'ceil-slot',
        axes: ['y'],
        name: 'ceil',
        type: 'placeholder',
      },
      '#7': {
        category: 'floor-slot',
        allowMovement: ['y'],
        name: 'floor',
        type: 'placeholder',
      },
      '#8': {
        category: 'wall-join',
        name: 'wall-join-1',
        joins: ['#2', '#5'],
      },
      '#9': {
        category: 'wall-join',
        name: 'wall-join-2',
        joins: ['#5', '#4'],
      },
      '#10': {
        category: 'wall-join',
        name: 'wall-join-3',
        joins: ['#4', '#3'],
      },
      '#11': {
        category: 'wall-join',
        name: 'wall-join-4',
        joins: ['#2', '#3'],
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
    partDetails: {
      '#1': {
        name: 'root',
      },
    },
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
    partDetails: {
      '#1': {
        name: 'root',
      },
      '#2': {
        name: '#2',
      },
      '#3': {
        name: '#3',
      },
    },
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
      '#1': {
        name: 'root',
      },
      '#2': {
        category: 'active-area',
        name: '#2',
        role: 'slot',
        type: 'placeholder',
      },
      '#3': {
        category: 'active-area',
        name: '#3',
        role: 'slot',
        type: 'placeholder',
      },
    },
    type: 'roof-1',
  },
];

export default buildingTempalteSeeds;
