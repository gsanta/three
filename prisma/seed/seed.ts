import { PrismaClient } from '@prisma/client';
import roadTemplateSeeds from './block_types/roadTemplateSeeds';
import buildingTempalteSeeds from './block_types/buildingTemplateSeeds';
import lampTempalteSeeds from './block_types/lampTemplateSeeds';
import poleTempalteSeeds from './block_types/poleTemplateSeeds';
import plantTempalteSeeds from './block_types/plantTemplateSeeds';
import homeElectrics from './block_types/homeElectrics';
import electricityProviders from './block_types/electricityProviders';
import roomSeeds from './block_types/roomSeeds';
import furnitureSeeds from './block_types/furnitureSeeds';
import transformerSeeds from './block_types/transformerSeeds';
import blockCategories from './blockCategories';
import blockAddMethods from './blockAddMethods';
import blockAddMethodsOnCategories from './blockAddMethodsOnCategories';

const prisma = new PrismaClient();
const main = async () => {
  // for (const template of roadTemplateSeeds) {
  //   await prisma.blockType.upsert({
  //     where: { type: template.type },
  //     update: {},
  //     create: template,
  //   });
  // }

  // for (const template of buildingTempalteSeeds) {
  //   await prisma.blockType.upsert({
  //     where: { type: template.type },
  //     update: {},
  //     create: template,
  //   });
  // }

  // for (const template of lampTempalteSeeds) {
  //   await prisma.blockType.upsert({
  //     where: { type: template.type },
  //     update: {},
  //     create: template,
  //   });
  // }

  // for (const template of plantTempalteSeeds) {
  //   await prisma.blockType.upsert({
  //     where: { type: template.type },
  //     update: {},
  //     create: template,
  //   });
  // }

  // for (const template of homeElectrics) {
  //   await prisma.blockType.upsert({
  //     where: { type: template.type },
  //     update: {},
  //     create: template,
  //   });
  // }

  // for (const template of electricityProviders) {
  //   await prisma.blockType.upsert({
  //     where: { type: template.type },
  //     update: {},
  //     create: template,
  //   });
  // }

  // for (const seed of roomSeeds) {
  //   await prisma.blockType.upsert({
  //     where: { type: seed.type },
  //     update: {},
  //     create: seed,
  //   });
  // }

  // for (const seed of furnitureSeeds) {
  //   await prisma.blockType.upsert({
  //     where: { type: seed.type },
  //     update: {},
  //     create: seed,
  //   });
  // }

  for (const seed of blockCategories) {
    await prisma.blockCategory.upsert({
      where: { name: seed.name },
      update: {},
      create: seed,
    });
  }

  for (const seed of blockAddMethods) {
    await prisma.blockAddMethod.upsert({
      where: { name: seed.name },
      update: {},
      create: seed,
    });
  }

  for (const seed of blockAddMethodsOnCategories) {
    await prisma.blockAddMethodsOnCategories.upsert({
      where: {
        addMethodName_categoryName: {
          addMethodName: seed.addMethodName,
          categoryName: seed.categoryName,
        },
      },
      update: {},
      create: seed,
    });
  }

  for (const template of poleTempalteSeeds) {
    await prisma.blockType.upsert({
      where: { type: template.type },
      update: {},
      create: template,
    });
  }

  for (const seed of transformerSeeds) {
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
