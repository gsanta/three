import ExtendedWorld from '../ExtendedWorld';
import ModelMesh from '../support/mesh_mocks/ModelMesh';

const MAX_WAIT_ITERATION = 5;

export const waitForDirtyBlockUpdates = async (world: ExtendedWorld) => {
  let iter = 0;

  const hasDirtyBlock = world.env.blockStore.getBlocksAsArray().find((block) => block.isDirty);

  if (!hasDirtyBlock) {
    return;
  }

  return new Promise<void>((resolve, reject) => {
    setInterval(() => {
      const dirtyBlocks = world.env.blockStore.getBlocksAsArray().filter((block) => block.isDirty);

      dirtyBlocks.forEach((block) => {
        const mesh = world.env.sceneStore.getObj3d(block.id) as unknown as ModelMesh;
        mesh.render();
      });

      if (dirtyBlocks.length === 0) {
        resolve();
      }
      iter += 1;

      if (iter === MAX_WAIT_ITERATION) {
        reject(`Dirty blocks are still present`);
      }
    }, 1);
  });
};

export const waitForMeshCountChange = async (delta: number, world: ExtendedWorld) => {
  let iter = 0;

  const currentCount = world.env.sceneStore.getAllObj3d().size;

  return new Promise<void>((resolve, reject) => {
    setInterval(() => {
      const newCount = world.env.sceneStore.getAllObj3d().size;
      if (currentCount + delta === newCount) {
        resolve();
      }
      iter += 1;

      if (iter === MAX_WAIT_ITERATION) {
        reject(`Mesh count did not change by ${delta} it changed by ${newCount - currentCount}`);
      }
    }, 1);
  });
};

export const waitForRenderNotification = async (blockId: string, world: ExtendedWorld) => {
  let iter = 0;

  return new Promise<void>((resolve, reject) => {
    setInterval(() => {
      const block = world.env.blockStore.getBlock(blockId);

      if (block?.notifyOnRender === false) {
        resolve();
      }
      iter += 1;

      if (iter === MAX_WAIT_ITERATION) {
        reject('Mesh notifyOnRender was never set to false');
      }
    }, 1);
  });
};
