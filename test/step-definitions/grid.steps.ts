import { Then } from '@cucumber/cucumber';
import ExtendedWorld from './ExtendedWorld';
import { checkGridPosition } from './helpers/checks';
import assert from 'assert';

type GridHash = {
  BLOCK: string;
  GRIDPOS?: string;
  GRIDINDEX?: string;
};

Then('the current grid scene is:', function (this: ExtendedWorld, table: { hashes(): GridHash[] }) {
  const data = table.hashes();
  const gridStore = this.getEnv().editorContext.gridStore;

  for (const row of data) {
    const gridPos = gridStore.getBlockGridPos(row.BLOCK);

    if (row.GRIDPOS) {
      const expectedGridPos = checkGridPosition.call(this, row.GRIDPOS);
      assert.equal(expectedGridPos[0], gridPos[0]);
      assert.equal(expectedGridPos[1], gridPos[1]);
    }

    if (row.GRIDINDEX) {
      const gridIndex = gridStore.getBlockGridIndex(row.BLOCK);

      assert.equal(row.GRIDINDEX, gridIndex);
    }
  }
});

Then("the grid at index '{int}' is empty", function (this: ExtendedWorld, gridIndex: number) {
  const blocks = this.getEnv().editorContext.gridStore.getBlocksAtGridIndex(gridIndex);

  assert.equal(blocks.length, 0);
});
