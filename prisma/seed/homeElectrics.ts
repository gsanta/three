import { BlockType, Prisma } from '@prisma/client';

const homeElectrics: (Omit<BlockType, 'decorations' | 'id' | 'parts' | 'partDetails'> & {
  decorations: Prisma.JsonArray;
  parts: Prisma.JsonArray;
  partDetails?: Prisma.JsonObject;
})[] = [
  {
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
        position: [-0.005, 0.63, -0.651],
        rotation: [Math.PI / 2, 0, 0],
        scale: [1, 0.248, 1],
      },
      {
        index: '#4',
        geometryPath: 'WashingMashine1DoorOn.geometry',
        materialPath: 'Wood1',
        position: [-0.005, 0.63, -0.651],
        rotation: [Math.PI / 2, 0, 0],
        scale: [1, 0.248, 1],
      },
    ],
    partDetails: {
      '#4': {
        isHidden: true,
      },
    },
    type: 'washing-machine-1',
  },
];

export default homeElectrics;
