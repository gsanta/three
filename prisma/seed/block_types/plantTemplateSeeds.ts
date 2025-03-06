import { BlockType, Prisma } from '@prisma/client';

const plantTempalteSeeds: (Omit<BlockType, 'animations' | 'decorations' | 'id' | 'parts' | 'partDetails'> & {
  animations?: Prisma.JsonObject;
  decorations: Prisma.JsonArray;
  parts: Prisma.JsonArray;
  partDetails?: Prisma.JsonObject;
})[] = [
  {
    category: 'decorations',
    decorations: [],
    path: '/tree.glb',
    parts: [
      {
        scale: [0.09, 0.71, 0.09],
        parts: [
          {
            index: '#1',
            geometryPath: 'Cylinder_1.geometry',
            materialPath: 'Material.002',
          },
          {
            index: '#2',
            geometryPath: 'Cylinder_2.geometry',
            materialPath: 'Material.004',
          },
          {
            index: '#3',
            geometryPath: 'Cylinder_3.geometry',
            materialPath: 'Material.003',
          },
          {
            index: '#4',
            geometryPath: 'Cylinder_4.geometry',
            materialPath: 'Material.001',
          },
        ],
      },
    ],
    type: 'tree-1',
  },
];

export default plantTempalteSeeds;
