import { BlockType, Prisma } from '@prisma/client';

const furnitureSeeds: (Omit<BlockType, 'animations' | 'decorations' | 'id' | 'parts' | 'partDetails'> & {
  animations?: Prisma.JsonObject;
  decorations: Prisma.JsonArray;
  parts: Prisma.JsonArray;
  partDetails?: Prisma.JsonObject;
})[] = [
  {
    category: 'furnitures',
    decorations: [],
    path: '/rug1.glb',
    parts: [
      {
        index: '#1',
        geometryPath: 'Rug1Base.geometry',
        materialPath: 'Rug1_Material',
      },
    ],
    partDetails: {
      '#1': {
        name: 'root',
      },
    },
    type: 'rug-1',
  },
  {
    category: 'furnitures',
    decorations: [],
    path: '/shelf1.glb',
    parts: [
      {
        index: '#1',
        geometryPath: 'Shelf1Base.geometry',
        materialPath: 'Rug1_Material',
      },
    ],
    partDetails: {
      '#1': {
        name: 'root',
      },
    },
    type: 'shelf-1',
  },
];

export default furnitureSeeds;
