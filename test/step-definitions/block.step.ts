import { Then, When } from '@cucumber/cucumber';
import ExtendedWorld from './ExtendedWorld';
import assert from 'assert';
import findClosestBlock from './helpers/findClosestBlock';
import { checkBlockExists, checkPartIndexExists, checkPositionCloseTo } from './helpers/checks';
import { waitForDirtyBlockUpdates, waitForMeshCountChange } from './helpers/waitFor';

When('I wait block count to increase by {int}', async function (this: ExtendedWorld, delta: number) {
  await waitForMeshCountChange(delta, this);
});

When('I wait for dirty blocks to update', async function (this: ExtendedWorld) {
  await waitForDirtyBlockUpdates(this);
});

Then('parent for block {string} is {string}', function (this: ExtendedWorld, childId: string, parentId: string) {
  const child = this.env.blockStore.getBlock(childId);
  const parent = this.env.blockStore.getBlock(parentId);

  assert.equal(child.parentConnection?.block, parent.id);

  const childFoundInParent = Boolean(parent.childConnections.find((currChild) => currChild.childBlock === childId));
  assert(childFoundInParent, `Parent did not have a child with id ${childId}`);
});

Then(
  'block {string} is in slot {string} of block {string}',
  function (this: ExtendedWorld, childId: string, partIndexOrName: string, parentId: string) {
    const partIndex = checkPartIndexExists.call(this, parentId, partIndexOrName);
    const child = this.env.blockStore.getBlock(childId);
    const parent = this.env.blockStore.getBlock(parentId);

    assert.equal(child.parentConnection?.part, partIndex);
    assert.equal(child.parentConnection?.block, parentId);

    assert.ok(parent.childConnections.find((connection) => connection.childBlock === child.id));
  },
);

Then(
  'slot {string} of block {string} is not occupied',
  function (this: ExtendedWorld, partIndex: string, blockId: string) {
    const block = this.env.blockStore.getBlock(blockId);

    assert.ok(!block.childConnections.find((connection) => connection.parentPart === partIndex));
  },
);

Then(
  'block {string} does not have a child {string}',
  function (this: ExtendedWorld, parentId: string, childId: string) {
    const parent = this.env.blockStore.getBlock(parentId);

    const hasChild = parent.childConnections.find((currChild) => currChild.childBlock === childId);
    assert.ok(!hasChild);
  },
);

Then('block {string} does not exist', function (this: ExtendedWorld, blockId: string) {
  const block = this.env.blockStore.getBlock(blockId);

  assert.ok(!block);
});

Then(
  'block at {float},{float},{float} does not exist',
  function (this: ExtendedWorld, x: number, y: number, z: number) {
    const blockWithDistance = findClosestBlock(this.env.blockStore.getBlocksAsArray(), [x, y, z]);

    if (blockWithDistance && blockWithDistance[1] < 0.5) {
      throw new Error(`Block was found near position (${x},${y},${z})`);
    }
  },
);

type BlockHash = {
  PARENT?: string;
  POSITION?: string;
};

Then(
  'I have a block {string} with properties',
  function (this: ExtendedWorld, blockId: string, table: { hashes(): BlockHash[] }) {
    const block = checkBlockExists.call(this, blockId);

    if (table.hashes().length !== 1) {
      throw new Error(`Table expected to have 1 row, but it has ${table.hashes().length}`);
    }

    const row = table.hashes()[0];

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

    if (row.POSITION) {
      checkPositionCloseTo.call(this, row.POSITION, block.position);
    }
  },
);
