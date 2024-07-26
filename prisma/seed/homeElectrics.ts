import { BlockType, Prisma } from '@prisma/client';

const homeElectrics: (Omit<BlockType, 'animations' | 'decorations' | 'id' | 'parts' | 'partDetails'> & {
  animations?: Prisma.JsonObject;
  decorations: Prisma.JsonArray;
  parts: Prisma.JsonArray;
  partDetails?: Prisma.JsonObject;
})[] = [
  {
    animations: {
      'device-on': ['WashingMashine1.DoorOffAction', 'WashingMashine1.DoorOnAction'],
    },
    category: 'home-electrics',
    decorations: ['devices'],
    path: '/washing_mashine1.glb',
    parts: [
      {
        index: '#1',
        geometryPath: 'Cylinder.geometry',
        materialPath: 'DarkGray',
        position: [0, 0, 0],
        rotation: [Math.PI / 2, 0, 0],
        scale: [1, 0.248, 1],
      },
      {
        index: '#2',
        geometryPath: 'Cylinder_1.geometry',
        materialPath: 'White',
        position: [0, 0, 0],
        rotation: [Math.PI / 2, 0, 0],
        scale: [1, 0.248, 1],
      },
      {
        index: '#3',
        geometryPath: 'WashingMashine1DoorOff.geometry',
        materialPath: 'Road',
        name: 'WashingMashine1DoorOff',
        position: [-0.005, 0.63, -0.651],
        rotation: [Math.PI / 2, 0, 0],
        scale: [1, 0.248, 1],
      },
      {
        index: '#4',
        geometryPath: 'WashingMashine1DoorOn.geometry',
        materialPath: 'Wood1',
        name: 'WashingMashine1DoorOn',
        position: [-0.004, 0.626, -0.379],
        rotation: [Math.PI / 2, 0, 0],
        scale: [1, 0.248, 1],
      },
      {
        index: '#5',
        geometryPath: 'WashingMashine1Base001.geometry',
        materialPath: 'White',
        position: [0.273, 0.314, 0.454],
        rotation: [Math.PI / 2, 0, 0],
        scale: [1, 0.248, 1],
      },
    ],
    partDetails: {
      '#3': {
        name: 'WashingMashine1DoorOff',
      },
      '#4': {
        name: 'WashingMashine1DoorOn',
      },
      '#5': {
        category: 'pin',
        name: '#5',
        type: 'physical',
      },
    },
    type: 'washing-machine-1',
  },
  {
    category: 'home-electrics',
    decorations: ['devices'],
    path: '/socket1.glb',
    parts: [
      {
        index: '#1',
        geometryPath: 'Socket1Base.geometry',
        materialPath: 'Road',
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [0.23, 0.23, 0.141],
      },
      {
        index: '#2',
        geometryPath: 'Socket1Base_1.geometry',
        materialPath: 'DarkGray',
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [0.23, 0.23, 0.141],
      },
    ],
    partDetails: {
      '#1': {
        category: 'pin',
        name: '#5',
        type: 'physical',
      },
    },
    type: 'socket-1',
  },
  {
    category: 'home-electrics',
    decorations: ['devices'],
    path: '/television1.glb',
    parts: [
      {
        index: '#1',
        geometryPath: 'Television1Base.geometry',
        materialPath: 'Rug1_Material',
      },
    ],
    partDetails: {
      '#1': {
        name: 'root',
      },
    },
    type: 'television-1',
  },
];

export default homeElectrics;
