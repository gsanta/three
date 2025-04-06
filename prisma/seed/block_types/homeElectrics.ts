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
        name: 'Cylinder',
        materialPath: 'DarkGray',
        position: [0, 0, 0],
        rotation: [Math.PI / 2, 0, 0],
        scale: [1, 0.248, 1],
      },
      {
        name: 'Cylinder_1',
        materialPath: 'White',
        position: [0, 0, 0],
        rotation: [Math.PI / 2, 0, 0],
        scale: [1, 0.248, 1],
      },
      {
        name: 'WashingMashine1DoorOff',
        materialPath: 'Road',
        position: [-0.005, 0.63, -0.651],
        rotation: [Math.PI / 2, 0, 0],
        scale: [1, 0.248, 1],
      },
      {
        name: 'WashingMashine1DoorOn',
        materialPath: 'Wood1',
        position: [-0.004, 0.626, -0.379],
        rotation: [Math.PI / 2, 0, 0],
        scale: [1, 0.248, 1],
      },
      {
        name: 'WashingMashine1Base001',
        materialPath: 'White',
        position: [0.273, 0.314, 0.454],
        rotation: [Math.PI / 2, 0, 0],
        scale: [1, 0.248, 1],
      },
    ],
    partDetails: {
      WashingMashine1DoorOff: {
        name: 'WashingMashine1DoorOff',
      },
      WashingMashine1DoorOn: {
        name: 'WashingMashine1DoorOn',
      },
      WashingMashine1Base001: {
        roles: ['pin'],
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
        name: 'Socket1Base',
        materialPath: 'Road',
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [0.23, 0.23, 0.141],
      },
      {
        name: 'Socket1Base_1',
        materialPath: 'DarkGray',
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [0.23, 0.23, 0.141],
      },
    ],
    partDetails: {
      Socket1Base: {
        roles: ['pin'],
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
        name: 'Television1Base',
        materialPath: 'Rug1_Material',
      },
    ],
    partDetails: {
      Television1Base: {
        name: 'root',
      },
    },
    type: 'television-1',
  },
];

export default homeElectrics;
