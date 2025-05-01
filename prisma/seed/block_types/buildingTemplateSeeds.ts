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
        name: 'base',
        materialPath: 'Wall',
        position: [-0.092, 0.007, 0.054],
        rotation: [-Math.PI, 0, -Math.PI],
        scale: [-3.718, -0.122, -3.718],
      },
      {
        name: 'wall1',
        materialPath: 'wall-placeholder',
        position: [-3.603, 0.264, 0.054],
        rotation: [-Math.PI, 0, -Math.PI],
        scale: [-3.718, -0.122, -3.718],
      },
      {
        name: 'wall2',
        materialPath: 'wall-placeholder',
        position: [-0.092, 0.264, -3.522],
        rotation: [-Math.PI, 0, -Math.PI],
        scale: [-3.718, -0.122, -3.718],
      },
      {
        name: 'wall3',
        materialPath: 'wall-placeholder',
        position: [3.465, 0.264, 0.054],
        rotation: [-Math.PI, 0, -Math.PI],
        scale: [-3.718, -0.122, -3.718],
      },
      {
        name: 'wall4',
        materialPath: 'wall-placeholder',
        position: [-0.092, 0.264, 3.595],
        rotation: [-Math.PI, 0, -Math.PI],
        scale: [-3.718, -0.122, -3.718],
      },
      {
        name: 'ceil',
        materialPath: 'wall-placeholder',
        position: [-0.069, 3.434, 0.037],
        rotation: [-Math.PI, 0, -Math.PI],
        scale: [-3.718, -0.122, -3.718],
      },
      {
        name: 'Platform1Floor',
        materialPath: 'wall-placeholder',
        position: [-0.092, 0.264, 0.054],
        rotation: [-Math.PI, 0, -Math.PI],
        scale: [-3.718, -0.122, -3.718],
      },
      {
        name: 'Platform1Column1',
        materialPath: 'Wall',
        position: [-3.603, 1.843, 3.595],
        rotation: [-Math.PI, 0, -Math.PI],
        scale: [-3.718, -0.122, -3.718],
      },
      {
        name: 'Platform1Column2',
        materialPath: 'Wall',
        position: [3.465, 1.843, 3.595],
        rotation: [-Math.PI, 0, -Math.PI],
        scale: [-3.718, -0.122, -3.718],
      },
      {
        name: 'Platform1Column3',
        materialPath: 'Wall',
        position: [3.409, 1.843, -3.522],
        rotation: [-Math.PI, 0, -Math.PI],
        scale: [-3.718, -0.122, -3.718],
      },
      {
        name: 'Platform1Column4',
        materialPath: 'Wall',
        position: [-3.562, 1.843, -3.522],
        rotation: [-Math.PI, 0, -Math.PI],
        scale: [-3.718, -0.122, -3.718],
      },
    ],
    partDetails: {
      base: {
        name: 'root',
      },
      wall1: {
        roles: ['wall-slot'],
        orientation: 90,
        name: 'wall1',
        type: 'placeholder',
        joins: ['#8', '#11'],
      },
      wall2: {
        roles: ['wall-slot'],
        name: 'wall2',
        type: 'placeholder',
        joins: ['#10', '#11'],
      },
      wall3: {
        roles: ['wall-slot'],
        orientation: 270,
        name: 'wall3',
        type: 'placeholder',
        joins: ['#9', '#10'],
      },
      wall4: {
        roles: ['wall-slot'],
        orientation: 180,
        name: 'wall4',
        type: 'placeholder',
        joins: ['#8', '#9'],
      },
      ceil: {
        roles: ['ceil-slot'],
        axes: ['y'],
        name: 'ceil',
        type: 'placeholder',
      },
      Platform1Floor: {
        roles: ['floor-slot'],
        name: 'floor',
        type: 'placeholder',
      },
      Platform1Column1: {
        roles: ['wall-join'],
        name: 'wall-join-1',
        joins: ['#2', '#5'],
      },
      Platform1Column2: {
        roles: ['wall-join'],
        name: 'wall-join-2',
        joins: ['#5', '#4'],
      },
      Platform1Column3: {
        roles: ['wall-join'],
        name: 'wall-join-3',
        joins: ['#4', '#3'],
      },
      Platform1Column4: {
        roles: ['wall-join'],
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
        name: 'Cube001',
        materialPath: 'Wall',
        rotation: [-3.14159, 0, -3.14159],
        scale: [-3.718, -0.122, -3.718],
      },
    ],
    partDetails: {
      Cube001: {
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
            name: 'Cube007',
            materialPath: 'Wall',
          },
          {
            index: '#2',
            name: 'Cube007_1',
            materialPath: 'Wood1',
          },
          {
            index: '#3',
            name: 'Cube007_2',
            materialPath: 'Wood2',
          },
        ],
      },
    ],
    partDetails: {
      Cube007: {
        name: 'root',
      },
      Cube007_1: {
        name: '#2',
      },
      Cube007_2: {
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
        name: 'Roof1Roof',
        materialPath: 'Roog',
        position: [-0.069, 0.088, 0.037],
        rotation: [-3.14159, 0, -3.14159],
        scale: [-3.922, -0.064, -3.922],
      },
      {
        name: 'Roof1Area1',
        materialPath: 'wall-placeholder',
        position: [-0.069, 0.088, 0.037],
        rotation: [-3.14159, 0, -3.14159],
        scale: [-3.922, -0.064, -3.922],
      },
      {
        name: 'Roof1Area2',
        materialPath: 'wall-placeholder',
        position: [-0.069, 0.088, 0.037],
        rotation: [-3.14159, 0, -3.14159],
        scale: [-3.922, -0.064, -3.922],
      },
    ],
    partDetails: {
      Roof1Roof: {
        name: 'root',
      },
      Roof1Area1: {
        roles: ['active-area'],
        name: '#2',
        role: 'slot',
        type: 'placeholder',
      },
      Roof1Area2: {
        roles: ['active-area'],
        name: '#3',
        role: 'slot',
        type: 'placeholder',
      },
    },
    type: 'roof-1',
  },
];

export default buildingTempalteSeeds;
