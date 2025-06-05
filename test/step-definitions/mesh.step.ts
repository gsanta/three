import { When } from '@cucumber/cucumber';
import ExtendedWorld from './ExtendedWorld';

export async function iWaitForMeshToExist(this: ExtendedWorld, blockId: string) {
  let iter = 0;
  let interval: ReturnType<typeof setInterval>;

  return new Promise<void>((resolve, reject) => {
    interval = setInterval(() => {
      try {
        this.env?.editorContext.sceneStore.getObj3d(blockId);
        clearInterval(interval);
        resolve();
      } catch {}

      iter += 1;

      if (iter === 5) {
        reject(`Block ${blockId} does not exist`);
      }
    }, 1);
  });
}

export async function iWaitForMeshNotToExist(this: ExtendedWorld, blockId: string) {
  let iter = 0;
  let interval: ReturnType<typeof setInterval>;

  return new Promise<void>((resolve, reject) => {
    interval = setInterval(() => {
      try {
        this.env?.editorContext.sceneStore.getObj3d(blockId);
      } catch {
        clearInterval(interval);
        resolve();
      }

      iter += 1;

      if (iter === 5) {
        reject(`Block ${blockId} still exists`);
      }
    }, 1);
  });
}

When('I wait mesh {string} to exist', async function (this: ExtendedWorld, blockId: string) {
  await iWaitForMeshToExist.call(this, blockId);
});

When('I wait mesh {string} not to exist', async function (this: ExtendedWorld, blockId: string) {
  await iWaitForMeshNotToExist.call(this, blockId);
});

When(
  'I wait meshes to render',
  async function (
    this: ExtendedWorld,
    table: {
      hashes(): {
        BLOCK: string;
      }[];
    },
  ) {
    return new Promise<void>((resolve, reject) => {
      const idsToRender = table.hashes().map((row) => row.BLOCK);

      const timeoutToken = setTimeout(() => reject(`Some meshes did not render ${idsToRender.join(', ')}`));

      const unsubscribe = this.getEnv().editorContext.sceneService.subscribeMeshRendered((blockId) => {
        idsToRender.splice(idsToRender.indexOf(blockId), 1);

        if (idsToRender.length === 0) {
          unsubscribe();
          clearTimeout(timeoutToken);
          resolve();
        }
      });
    });
  },
);
