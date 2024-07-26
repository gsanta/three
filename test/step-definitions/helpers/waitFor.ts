import ExtendedWorld from '../ExtendedWorld';

const MAX_WAIT_ITERATION = 5;

export const waitForMesh = async (id: string, world: ExtendedWorld) => {
  let iter = 0;
  return new Promise<void>((resolve, reject) => {
    setInterval(() => {
      try {
        world.env.sceneStore.getObj3d(id);
        resolve();
      } catch {
        iter += 1;

        if (iter === MAX_WAIT_ITERATION) {
          reject();
        }
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
