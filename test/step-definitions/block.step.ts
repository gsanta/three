import { Then, When } from '@cucumber/cucumber';
import ExtendedWorld from './ExtendedWorld';
import assert from 'assert';
import findClosestBlock, { calculateDistance } from './helpers/findClosestBlock';
import { checkBlockExists, checkPosition, checkPositionCloseTo } from './helpers/checks';
import { waitForDirtyBlockUpdates } from './helpers/waitFor';
import { toRadian } from '@/client/editor/utils/mathUtils';

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
      const rotationInRad = row.ROTATION.split(',')
        .map((num) => toRadian(Number(num)))
        .join(', ');
      checkPositionCloseTo.call(this, rotationInRad, block.rotation);
    }
  });
});

Then(
  'I have a block {string} at estimated position {float},{float},{float}',
  function (this: ExtendedWorld, blockName: string, x: number, y: number, z: number) {
    const blockWithDistance = findClosestBlock(this.env?.editorContext.blockStore.getBlocksAsArray() || [], [x, y, z]);

    if (!blockWithDistance) {
      throw new Error(`Block ${blockName} was nof found`);
    }

    if (!blockWithDistance || blockWithDistance[1] > 1) {
      throw new Error(
        `Block was not found near position (${x},${y},${z}), nearest is at postition ${blockWithDistance[0].position}`,
      );
    }

    assert.equal(blockWithDistance[0].type, blockName);
  },
);

Then(
  'I have block {string} at estimated position {string}',
  function (this: ExtendedWorld, blockId: string, posStr: string) {
    const block = checkBlockExists.call(this, blockId);
    const position = checkPosition.call(this, posStr);
    const distance = calculateDistance(position, block.position);

    assert.ok(
      distance < 0.5,
      `Block is not near position (${position.join(',')}), it is at postition ${block.position.join(',')}`,
    );
  },
);

When('I wait block {string} to exist', async function (this: ExtendedWorld, blockId: string) {
  let iter = 0;
  let interval: ReturnType<typeof setInterval>;

  return new Promise<void>((resolve, reject) => {
    interval = setInterval(() => {
      try {
        this.env?.editorContext.blockStore.getBlock(blockId);
        clearInterval(interval);
        resolve();
      } catch {}

      iter += 1;

      if (iter === 5) {
        reject(`Block ${blockId} does not exist`);
      }
    }, 1);
  });
});

type IHaveABlockWithSharedChildConnectionsHash = {
  BLOCK: string;
};

Then(
  'I have a block {string} with shared child connections',
  function (this: ExtendedWorld, blockId: string, table: { hashes(): IHaveABlockWithSharedChildConnectionsHash[] }) {
    const data = table.hashes();
    const blockStore = this.getEnv().editorContext.blockStore;

    const block = blockStore.getBlock(blockId);

    if (block.conduitConnections.length !== data.length) {
      assert.fail(
        `Expected block ${blockId} to have ${data.length} shared child connections, got ${block.conduitConnections.length}`,
      );
    }

    for (const row of data) {
      if (!block.conduitConnections.find((conn) => conn.block !== row.BLOCK))
        assert.fail(`Block with id '${row.BLOCK}' does not exist in shared child connections for ${block.id}`);
    }
  },
);
