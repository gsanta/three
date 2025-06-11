import { PrismaClient } from '@prisma/client';
import roadSeeds from './block_types/roadSeeds';
import poleSeeds from './block_types/poleSeeds';
import transformerSeeds from './block_types/transformerSeeds';
import blockCategories from './blockCategories';
import blockAddMethodsSeeds from './blockAddMethodsSeeds';
import blockAddMethodsOnCategoriesSeeds from './blockAddMethodsOnCategoriesSeeds';
import houseSeeds from './block_types/houseSeeds';
import blockContextMenuActionSeeds from './blockContextMenuActionSeeds';
import blockContextMenuActionOnCategoriesSeeds from './blockContextMenuActionOnCategoriesSeeds';
import weatherHeadSeeds from './block_types/weatherHeadSeeds';
import humanSeeds from './block_types/humanSeeds';
import cableSeeds from './block_types/cableSeeds';
import plantSeeds from './block_types/plantSeeds';

const prisma = new PrismaClient();
const main = async () => {
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

  for (const seed of blockAddMethodsSeeds) {
    await prisma.blockAddMethod.upsert({
      where: { name: seed.name },
      update: {},
      create: seed,
    });
  }

  for (const seed of blockAddMethodsOnCategoriesSeeds) {
    await prisma.blockAddMethodsOnCategories.upsert({
      where: {
        addMethodName_sourceCategoryName: {
          addMethodName: seed.addMethodName,
          sourceCategoryName: seed.sourceCategoryName,
        },
      },
      update: {},
      create: seed,
    });
  }

  for (const seed of blockContextMenuActionSeeds) {
    await prisma.blockContextMenuAction.upsert({
      where: { name: seed.name },
      update: {},
      create: seed,
    });
  }

  for (const seed of blockContextMenuActionOnCategoriesSeeds) {
    await prisma.blockContextMenuActionOnCategories.upsert({
      where: {
        contextMenuActionName_categoryName_categoryName2: {
          contextMenuActionName: seed.contextMenuActionName,
          categoryName: seed.categoryName,
          categoryName2: seed.categoryName2,
        },
      },
      update: {},
      create: seed,
    });
  }

  for (const cable of cableSeeds) {
    await prisma.blockType.upsert({
      where: { type: cable.type },
      update: {},
      create: cable,
    });
  }

  for (const template of plantSeeds) {
    await prisma.blockType.upsert({
      where: { type: template.type },
      update: {},
      create: template,
    });
  }

  for (const template of roadSeeds) {
    await prisma.blockType.upsert({
      where: { type: template.type },
      update: {},
      create: template,
    });
  }

  for (const template of poleSeeds) {
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

  for (const seed of houseSeeds) {
    await prisma.blockType.upsert({
      where: { type: seed.type },
      update: {},
      create: seed,
    });
  }

  for (const seed of weatherHeadSeeds) {
    await prisma.blockType.upsert({
      where: { type: seed.type },
      update: {},
      create: seed,
    });
  }

  for (const seed of humanSeeds) {
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
