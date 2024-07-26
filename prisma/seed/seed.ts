import { PrismaClient } from '@prisma/client';
import roadTemplateSeeds from './roadTemplateSeeds';
import buildingTempalteSeeds from './buildingTemplateSeeds';
import lampTempalteSeeds from './lampTemplateSeeds';
import poleTempalteSeeds from './poleTemplateSeeds';
import plantTempalteSeeds from './plantTemplateSeeds';
import homeElectrics from './homeElectrics';
import electricityProviders from './electricityProviders';
import roomSeeds from './roomSeeds';
import furnitureSeeds from './furnitureSeeds';

const prisma = new PrismaClient();
const main = async () => {
  for (const template of roadTemplateSeeds) {
    await prisma.blockType.upsert({
      where: { type: template.type },
      update: {},
      create: template,
    });
  }

  for (const template of buildingTempalteSeeds) {
    await prisma.blockType.upsert({
      where: { type: template.type },
      update: {},
      create: template,
    });
  }

  for (const template of lampTempalteSeeds) {
    await prisma.blockType.upsert({
      where: { type: template.type },
      update: {},
      create: template,
    });
  }

  for (const template of poleTempalteSeeds) {
    await prisma.blockType.upsert({
      where: { type: template.type },
      update: {},
      create: template,
    });
  }

  for (const template of plantTempalteSeeds) {
    await prisma.blockType.upsert({
      where: { type: template.type },
      update: {},
      create: template,
    });
  }

  for (const template of homeElectrics) {
    await prisma.blockType.upsert({
      where: { type: template.type },
      update: {},
      create: template,
    });
  }

  for (const template of electricityProviders) {
    await prisma.blockType.upsert({
      where: { type: template.type },
      update: {},
      create: template,
    });
  }

  for (const seed of roomSeeds) {
    await prisma.blockType.upsert({
      where: { type: seed.type },
      update: {},
      create: seed,
    });
  }

  for (const seed of furnitureSeeds) {
    await prisma.blockType.upsert({
      where: { type: seed.type },
      update: {},
      create: seed,
    });
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
