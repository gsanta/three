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
        position: [0, 1, 0],
        scale: [6.282, 1, 6.282],
      },
      {
        index: '#2',
        geometryPath: 'Room1Wall1.geometry',
        materialPath: 'Material',
        position: [0, 1, 0],
        scale: [6.282, 1, 6.282],
      },
      {
        index: '#3',
        geometryPath: 'Room1Wall2.geometry',
        materialPath: 'Material',
        position: [0, 1, 0],
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
    },
    type: 'room-1',
  },
];

export default roomSeeds;
