import { store } from '@/client/common/utils/store';
import { setSelectedTool } from '@/client/editor/stores/tool/toolSlice';
import ToolName from '@/client/editor/models/tool/ToolName';
import { When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { Vector3 } from 'three';
import ExtendedWorld from './ExtendedWorld';
import findClosestBlock from './helpers/findClosestBlock';
import BlockData from '@/client/editor/models/block/BlockData';
import TestSceneService from './support/TestSceneService';

function selectBlockAtPosition(this: ExtendedWorld, x: number, y: number, z: number, partIndex?: string) {
  store.dispatch(setSelectedTool(ToolName.Select));

  const blockWithDistance = findClosestBlock(this.getEnv().editorContext.blockStore.getBlocksAsArray(), [x, y, z]);

  let block: BlockData | undefined = undefined;

  if (blockWithDistance && blockWithDistance[1] < 1) {
    block = blockWithDistance[0];
  }

  if (partIndex && block) {
    (this.getEnv().editorContext.sceneService as TestSceneService).setIntersection([
      {
        block,
        partIndex: partIndex,
        meshes: [{ object: {}, distance: 1, point: [0, 0, 0] }],
      },
    ]);
  }

  this.getEnv().toolHelper.pointerMove({ point: new Vector3(x, y, z) });
  this.getEnv().toolHelper.pointerDown({ blockId: block?.id });
  this.getEnv().toolHelper.pointerUp();
}

When('I select a block at position {float},{float},{float} with part {string}', selectBlockAtPosition);

When(
  'I select a block at position {float},{float},{float}',
  function (this: ExtendedWorld, x: number, y: number, z: number) {
    selectBlockAtPosition.bind(this, x, y, z)();
  },
);

Then('block {string} is selected', function (this: ExtendedWorld, blockId: string) {
  const realBlockId = blockId === 'examined' ? this.getEnv().testScene.storedBlockId || '' : blockId;

  const isSelected = this.getEnv().editorContext.blockCategoryStore.getSelectedRootBlockIds().includes(realBlockId);
  const isInSelectionMap = store.getState().blockCategory.selectedBlocks[realBlockId];

  assert.ok(isSelected);
  assert.ok(isInSelectionMap, `Block with id ${realBlockId} is not in the selection map.`);
});

Then('block {string} is not selected', function (this: ExtendedWorld, blockId: string) {
  const realBlockId = blockId === 'examined' ? this.getEnv().testScene.storedBlockId || '' : blockId;

  const isNotSelected = !this.getEnv().editorContext.blockCategoryStore.getSelectedRootBlockIds().includes(realBlockId);
  const isNotInSelectionMap = !store.getState().blockCategory.selectedBlocks[realBlockId];

  assert.ok(isNotSelected);
  assert.ok(isNotInSelectionMap);
});

Then('no blocks are selected', function (this: ExtendedWorld) {
  const isEmpty = this.getEnv().editorContext.blockCategoryStore.getSelectedRootBlockIds().length == 0;
  const isSelectedBlocksEmpty =
    Object.keys(this.getEnv().editorContext.blockCategoryStore.getSelectedBlocks()).length == 0;

  const isSelectionEmptyInBlockSlice = store.getState().block.present.selectedBlocks.length === 0;

  assert.ok(isEmpty);
  assert.ok(isSelectionEmptyInBlockSlice, 'selectedBlocks is not empty in blockSlice.');
  assert.ok(isSelectedBlocksEmpty, 'isSelectedBlocksEmpty is not empty in blockCategoryStore.');
});
