import { BlockTemplate, Prisma } from '@prisma/client';

const plantTempalteSeeds: (Omit<BlockTemplate, 'categories' | 'id' | 'parts' | 'partDetails'> & {
  categories: Prisma.JsonArray;
  parts: Prisma.JsonArray;
  partDetails?: Prisma.JsonObject;
})[] = [
  {
    categories: [],
    category: 'decorations',
    path: '/tree.glb',
    parts: [
      {
        scale: [0.09, 0.71, 0.09],
        parts: [
          {
            geometryPath: 'Cylinder_1.geometry',
            materialPath: 'Material.002',
          },
          {
            geometryPath: 'Cylinder_2.geometry',
            materialPath: 'Material.004',
          },
          {
            geometryPath: 'Cylinder_3.geometry',
            materialPath: 'Material.003',
          },
          {
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