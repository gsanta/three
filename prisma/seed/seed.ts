import { PrismaClient } from '@prisma/client';
import roadTemplateSeeds from './roadTemplateSeeds';
import buildingTempalteSeeds from './buildingTemplateSeeds';
import lampTempalteSeeds from './lampTemplateSeeds';
import poleTempalteSeeds from './poleTemplateSeeds';
import plantTempalteSeeds from './plantTemplateSeeds';

const prisma = new PrismaClient();
const main = async () => {
  for (const template of roadTemplateSeeds) {
    await prisma.blockTemplate.upsert({
      where: { type: template.type },
      update: {},
      create: template,
    });
  }

  for (const template of buildingTempalteSeeds) {
    await prisma.blockTemplate.upsert({
      where: { type: template.type },
      update: {},
      create: template,
    });
  }

  for (const template of lampTempalteSeeds) {
    await prisma.blockTemplate.upsert({
      where: { type: template.type },
      update: {},
      create: template,
    });
  }

  for (const template of poleTempalteSeeds) {
    await prisma.blockTemplate.upsert({
      where: { type: template.type },
      update: {},
      create: template,
    });
  }

  for (const template of plantTempalteSeeds) {
    await prisma.blockTemplate.upsert({
      where: { type: template.type },
      update: {},
      create: template,
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
