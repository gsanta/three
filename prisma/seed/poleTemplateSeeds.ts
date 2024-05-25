import { BlockTemplate, Prisma } from '@prisma/client';

const poleTempalteSeeds: (Omit<BlockTemplate, 'id' | 'parts' | 'partDetails'> & {
  parts?: Prisma.JsonArray;
  partDetails?: Prisma.JsonObject;
})[] = [
  {
    category: 'poles',
    name: 'pole-1',
    path: '/pole.glb',
    parts: [
      {
        geometryPath: 'Pole.geometry',
        materialPath: 'Main',
        position: [-0.008, -0.002, 0.01],
        rotation: [-3.14159, 0, -3.14159],
        scale: [-0.136, -4.869, -0.136],
      },
      {
        geometryPath: 'Pin1.geometry',
        materialPath: 'Metal',
        position: [1.114, 9.336, 0.01],
        scale: -0.074,
        name: 'pin1',
      },
      {
        geometryPath: 'Pin2.geometry',
        materialPath: 'Metal',
        position: [-0.475, 9.336, 0.01],
        scale: -0.074,
        name: 'pin2',
      },
      {
        geometryPath: 'Pin3.geometry',
        materialPath: 'Metal',
        position: [-1.113, 9.336, 0.01],
        scale: -0.074,
        name: 'pin3',
      },
    ],
  },
  {
    category: 'cables',
    name: 'cable-1',
    path: null,
  },
];

export default poleTempalteSeeds;
