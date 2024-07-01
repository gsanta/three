import { Then } from '@cucumber/cucumber';
import ExtendedWorld from './ExtendedWorld';
import assert from 'assert';
import findClosestBlock from './helpers/findClosestBlock';

Then('parent for block {string} is {string}', function (this: ExtendedWorld, childId: string, parentId: string) {
  const child = this.env.blockStore.getBlock(childId);
  const parent = this.env.blockStore.getBlock(parentId);

  assert.equal(child.parent, parent.id);

  const childFoundInParent = Boolean(parent.children.find((currChildId) => currChildId === childId));
  assert(childFoundInParent, `Parent did not have a child with id ${childId}`);
});

Then(
  'block {string} is in slot {string} of block {string}',
  function (this: ExtendedWorld, childId: string, parentPart: string, parentId: string) {
    const child = this.env.blockStore.getBlock(childId);
    const parent = this.env.blockStore.getBlock(parentId);

    assert.equal(child.place, parentPart);
    assert.equal(child.parent, parentId);

    assert(parent.partDetails[parentPart]?.connectedTo?.blockId, child.id);
  },
);

Then(
  'slot {string} of block {string} is not occupied',
  function (this: ExtendedWorld, partIndex: string, blockId: string) {
    const block = this.env.blockStore.getBlock(blockId);

    assert(block.partDetails[partIndex]?.connectedTo === undefined);
  },
);

Then(
  'block {string} does not have a child {string}',
  function (this: ExtendedWorld, parentId: string, childId: string) {
    const parent = this.env.blockStore.getBlock(parentId);

    const hasChild = parent.children.find((currChildId) => currChildId === childId);
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
