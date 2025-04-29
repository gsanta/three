import { When } from '@cucumber/cucumber';
import ExtendedWorld from './ExtendedWorld';
import { checkPartMeshExists } from './helpers/checks';
import { Vector3 } from 'three';

When(
  'I store world position for part {string} of block {string}',
  function (this: ExtendedWorld, partIndex: string, blockId: string) {
    const partMesh = checkPartMeshExists.call(this, blockId, partIndex);

    const position = new Vector3();
    partMesh.getWorldPosition(position);

    this.env?.testScene.addTestData('position', position);
  },
);

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

When('I wait mesh {string} to exist', async function (this: ExtendedWorld, blockId: string) {
  await iWaitForMeshToExist.call(this, blockId);
});
