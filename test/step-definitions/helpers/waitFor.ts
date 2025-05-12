import ExtendedWorld from '../ExtendedWorld';
import ModelMesh from '../support/mesh_mocks/ModelMesh';

const MAX_WAIT_ITERATION = 5;

export const waitForDirtyBlockUpdates = async (world: ExtendedWorld) => {
  let iter = 0;

  const hasDirtyBlock = world
    .getEnv()
    .editorContext.blockStore.getBlocksAsArray()
    .find((block) => block.isDirty);

  if (!hasDirtyBlock) {
    return;
  }

  return new Promise<void>((resolve, reject) => {
    setInterval(() => {
      const dirtyBlocks = world
        .getEnv()
        .editorContext.blockStore.getBlocksAsArray()
        .filter((block) => block.isDirty);

      dirtyBlocks.forEach((block) => {
        const mesh = world.getEnv().editorContext.sceneStore.getObj3d(block.id) as unknown as ModelMesh;
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
