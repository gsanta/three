import { BlockType, Prisma } from '@prisma/client';

const roomSeeds: (Omit<BlockType, 'animations' | 'decorations' | 'id' | 'parts' | 'partDetails'> & {
  animations?: Prisma.JsonObject;
  decorations: Prisma.JsonArray;
  parts: Prisma.JsonArray;
  partDetails?: Prisma.JsonObject;
})[] = [
  {
    category: 'rooms',
    decorations: [],
    path: '/room.glb',
    parts: [
      {
        index: '#1',
        geometryPath: 'Room1Base.geometry',
        materialPath: 'Material',
        position: [-0.002, 0.2, 0.002],
        scale: [6.282, 1, 6.282],
      },
      {
        index: '#2',
        geometryPath: 'Room1Wall1.geometry',
        materialPath: 'Material',
        position: [-6.532, 4.206, -0.245],
        scale: [6.282, 1, 6.282],
      },
      {
        index: '#3',
        geometryPath: 'Room1Wall2.geometry',
        materialPath: 'Material',
        position: [-0.192, 4.264, -6.532],
        scale: [6.282, 1, 6.282],
      },
      {
        index: '#4',
        geometryPath: 'Room1WallSeparator3.geometry',
        materialPath: 'Material',
        position: [6.098, 4.214, -6.536],
        scale: [6.282, 1, 6.282],
      },
      {
        index: '#5',
        geometryPath: 'Room1WallSeparator1.geometry',
        materialPath: 'Material',
        position: [-6.535, 4.21, 6.035],
        scale: [6.282, 1, 6.282],
      },
      {
        index: '#6',
        geometryPath: 'Room1WallSeparator4.geometry',
        materialPath: 'Material',
        position: [-6.615, 4.203, -6.599],
        scale: [6.282, 1, 6.282],
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
      },
      '#3': {
        category: 'wall-slot',
        name: 'wall2',
      },
      '#4': {
        category: 'wall-slot',
        name: 'wall-separator-3',
      },
      '#5': {
        category: 'wall-slot',
        name: 'wall-separator-1',
      },
      '#6': {
        category: 'wall-slot',
        name: 'wall-separator-4',
      },
    },
    type: 'room-1',
  },
];

export default roomSeeds;
