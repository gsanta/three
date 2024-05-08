import { Vector3 } from 'three';
import TestEnv, { setupTestEnv } from '../support/TestEnv';
import { addBlockToScene, addBlockToSlot } from '../steps/add';
import { eraseOneBlockByCategory } from '../steps/erase';

describe('Erase', () => {
  let env: TestEnv;

  beforeEach(() => {
    env = setupTestEnv();
  });

  afterEach(() => {
    env.teardown();
  });

  describe('when erasing a child', () => {
    it('removes the child and the parent-child relation', () => {
      addBlockToScene({ templateName: 'building-base-1', where: new Vector3(0, 0.1, 5) }, env);

      addBlockToSlot({ slotName: 'wall1', templateName: 'wall_door' }, env);

      const wall = env.blockStore.getBlocksAsArray().find((block) => block.category === 'walls');

      eraseOneBlockByCategory({ category: 'walls' }, env);

      const buildingBaseBlock = env.blockStore.getBlocksAsArray().find((block) => block.category === 'building-bases');

      expect(env.blockStore.getBlock(wall?.id)).toBeUndefined();
      expect(env.blockStore.getDecoration('walls', wall?.id)).toBeUndefined();
      expect(buildingBaseBlock?.children).toHaveLength(0);
    });
  });

  describe('when erasing a parent', () => {
    it("removes it with it's children", () => {
      addBlockToScene({ templateName: 'building-base-1', where: new Vector3(0, 0.1, 5) }, env);

      addBlockToSlot({ slotName: 'wall1', templateName: 'wall_door' }, env);

      addBlockToSlot({ slotName: 'wall2', templateName: 'wall_new' }, env);

      eraseOneBlockByCategory({ category: 'building-bases' }, env);

      expect(env.blockStore.getBlocksAsArray()).toHaveLength(0);
      expect(Object.keys(env.blockStore.getDecorations('walls'))).toHaveLength(0);
      expect(Object.keys(env.blockStore.getDecorations('building-bases'))).toHaveLength(0);
    });
  });
});
