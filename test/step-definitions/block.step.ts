import { Then, When } from '@cucumber/cucumber';
import ExtendedWorld from './ExtendedWorld';
import assert from 'assert';
import findClosestBlock from './helpers/findClosestBlock';
import { checkBlockExists, checkPositionCloseTo } from './helpers/checks';
import { waitForDirtyBlockUpdates } from './helpers/waitFor';

When('I wait for dirty blocks to update', async function (this: ExtendedWorld) {
  await waitForDirtyBlockUpdates(this);
});

Then('block {string} does not exist', function (this: ExtendedWorld, blockId: string) {
  const block = this.getEnv().editorContext.blockStore.getBlock(blockId);

  assert.ok(!block);
});

Then(
  'block at {float},{float},{float} does not exist',
  function (this: ExtendedWorld, x: number, y: number, z: number) {
    const blockWithDistance = findClosestBlock(this.getEnv().editorContext.blockStore.getBlocksAsArray(), [x, y, z]);

    if (blockWithDistance && blockWithDistance[1] < 0.5) {
      throw new Error(`Block was found near position (${x},${y},${z})`);
    }
  },
);

type BlockHash = {
  BLOCK: string;
  PARENT?: string;
  POSITION?: string;
  PARENT1?: string;
  PARENT2?: string;
  ROTATION?: string;
};

Then('I have blocks with properties', function (this: ExtendedWorld, table: { hashes(): BlockHash[] }) {
  const rows = table.hashes();

  rows.forEach((row) => {
    const blockId = row.BLOCK;

    const block = checkBlockExists.call(this, blockId);

    if (row.PARENT) {
      assert.ok(
        row.PARENT === block.parentConnection?.block,
        `Parent does not match, it was ${block.parentConnection}`,
      );

      const parent = checkBlockExists.call(this, block.parentConnection.block);
      assert.ok(
        parent.childConnections.find((child) => child.childBlock === blockId),
        `Parent does not include ${blockId} as a child`,
      );
    }

    [row.PARENT1, row.PARENT2].forEach((val, index) => {
      if (val) {
        assert.ok(
          block.multiParentConnections.find((parent) => parent.block === val),
          `Expected parent for PARENT${index + 1} '${row.PARENT1}' was not found in the list of parents`,
        );
      }
    });

    if (row.POSITION) {
      checkPositionCloseTo.call(this, row.POSITION, block.position);
    }

    if (row.ROTATION) {
      checkPositionCloseTo.call(this, row.ROTATION, block.rotation);
    }
  });
});
