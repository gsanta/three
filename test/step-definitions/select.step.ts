import { store } from '@/client/common/utils/store';
import { setSelectedTool } from '@/client/editor/stores/tool/toolSlice';
import ToolName from '@/client/editor/types/ToolName';
import MeshUtils from '@/client/editor/utils/MeshUtils';
import { When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { Vector3 } from 'three';
import ExtendedWorld from './ExtendedWorld';
import findClosestBlock from './helpers/findClosestBlock';

function selectBlockAtPosition(this: ExtendedWorld, x: number, y: number, z: number, partName?: string) {
  store.dispatch(setSelectedTool(ToolName.Select));

  const blockWithDistance = findClosestBlock(this.env.blockStore.getBlocksAsArray(), [x, y, z]);

  if (!blockWithDistance || blockWithDistance[1] > 1) {
    throw new Error(`Block was not found near position (${x},${y},${z})`);
  }

  const block = blockWithDistance[0];

  if (!block) {
    throw new Error(`Block not found at position (${x},${y},${z})`);
  }

  const mesh = this.env.sceneStore.getObj3d(block.id);

  if (partName) {
    const partMesh = MeshUtils.findByName(mesh, partName);
    this.env.sceneService.setIntersection([{ object: partMesh, distance: 1, point: new Vector3() }]);
  }

  this.env.toolHelper.pointerMove({ point: new Vector3(x, y, z) });
  this.env.toolHelper.pointerDown({ blockId: block.id });
}

When('I select a block at position {float},{float},{float} with part {string}', selectBlockAtPosition);

When('I select a block at position {int},{int},{int}', function (this: ExtendedWorld, x: number, y: number, z: number) {
  selectBlockAtPosition.bind(this, x, y, z);
});

Then('block {string} is selected', function (this: ExtendedWorld, blockId: string) {
  const realBlockId = blockId === 'examined' ? this.env.testScene.storedBlockId || '' : blockId;

  const isSelected = this.env.blockStore.getSelectedRootBlockIds().includes(realBlockId);
  const isInSelectionMap = store.getState().block.present.selectedBlocks[realBlockId];

  assert.ok(isSelected);
  assert.ok(isInSelectionMap, `Block with id ${realBlockId} is not in the selection map.`);
});

Then('block {string} is not selected', function (this: ExtendedWorld, blockId: string) {
  const realBlockId = blockId === 'examined' ? this.env.testScene.storedBlockId || '' : blockId;

  const isNotSelected = !this.env.blockStore.getSelectedRootBlockIds().includes(realBlockId);
  const isNotInSelectionMap = !store.getState().block.present.selectedBlocks[realBlockId];

  assert.ok(isNotSelected);
  assert.ok(isNotInSelectionMap);
});

Then('no blocks are selected', function (this: ExtendedWorld) {
  const isEmpty = this.env.blockStore.getSelectedRootBlockIds().length == 0;

  const isSelectionMapEmpty = Object.keys(store.getState().block.present.selectedBlocks).length === 0;

  assert.ok(isEmpty);
  assert.ok(isSelectionMapEmpty, 'Selection map is not empty.');
});
