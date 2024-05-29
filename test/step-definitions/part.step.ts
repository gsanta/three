import { Then } from '@cucumber/cucumber';
import ExtendedWorld from './ExtendedWorld';
import assert from 'assert';

function getPartDetail(this: ExtendedWorld, partRef: string, blockId: string) {
  const realBlockId = blockId === 'examined' ? this.env.testScene.storedBlockId || '' : blockId;

  const block = this.env.blockStore.getBlock(realBlockId);

  if (!block) {
    throw new Error(`Block with id ${realBlockId} does not exist`);
  }

  const partDetail = block.partDetails[partRef];

  return partDetail;
}

Then('part {string} of block {string} is visible', function (this: ExtendedWorld, partRef: string, blockId: string) {
  const partDetail = getPartDetail.call(this, partRef, blockId);

  assert.ok(Boolean(partDetail?.isHidden) === false, 'Part is not visible');
});

Then('part {string} of block {string} is hidden', function (this: ExtendedWorld, partRef: string, blockId: string) {
  const partDetail = getPartDetail.call(this, partRef, blockId);

  assert.ok(partDetail?.isHidden, 'Part is not hidden');
});
