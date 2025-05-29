import { When } from '@cucumber/cucumber';
import ExtendedWorld from './ExtendedWorld';
import { setSelectedTool } from '@/client/editor/stores/tool/toolSlice';
import ToolName from '@/client/editor/models/tool/ToolName';
import { store } from '@/client/common/utils/store';
import { setSelectedGeometry } from '@/client/editor/stores/blockType/blockTypeSlice';
import { Vector3 } from 'three';
import findClosestBlock from './helpers/findClosestBlock';
import { checkGridPosition, checkPartIndexExists, checkPosition } from './helpers/checks';
import TestSceneService from './support/TestSceneService';
import assert from 'assert';
import Grid from '@/client/editor/models/Grid';

When('I select tool {string}', function (this: ExtendedWorld, toolName: ToolName) {
  store.dispatch(setSelectedTool(toolName));
});

When('I select template {string}', function (this: ExtendedWorld, type: string) {
  assert.doesNotThrow(
    () => this.getEnv().editorContext.blockStore.getBlockType(type),
    `block type '${type}' does not exist`,
  );

  store.dispatch(setSelectedGeometry(type));
});

When('I press pointer', function (this: ExtendedWorld) {
  this.getEnv().toolHelper.pointerDown();
  this.getEnv().toolHelper.pointerUp();
});

When('I press pointer over block {string}', function (this: ExtendedWorld, blockId: string) {
  this.getEnv().toolHelper.pointerDown({ blockId });
  this.getEnv().toolHelper.pointerUp();
});

When(
  'I press pointer over block {string} and part {string} at position {string}',
  function (this: ExtendedWorld, blockId: string, partName: string, position: string) {
    const [x, y, z] = checkPosition.call(this, position);
    const block = this.getEnv().editorContext.blockStore.getBlock(blockId);

    if (!block) {
      throw new Error(`Block not found at position (${x},${y},${z})`);
    }

    (this.getEnv().editorContext.sceneService as TestSceneService).setIntersection([
      {
        block,
        partIndex: partName,
        meshes: [{ object: {}, distance: 1, point: [x, y, z] }],
      },
    ]);

    this.getEnv().toolHelper.pointerEnter({ blockId: block.id, partIndex: partName });
    this.getEnv().toolHelper.pointerDown({ blockId });
    this.getEnv().toolHelper.pointerUp();
  },
);

When('I press pointer at {float},{float},{float}', function (this: ExtendedWorld, x: number, y: number, z: number) {
  const blockWithDistance = findClosestBlock(this.getEnv().editorContext.blockStore.getBlocksAsArray(), [x, y, z]);

  this.getEnv().toolHelper.pointerDown({ blockId: blockWithDistance?.[0].id });
});

When('I move pointer to {string}', function (this: ExtendedWorld, position: string) {
  const [x, y, z] = checkPosition.call(this, position);

  this.getEnv().toolHelper.pointerMove({ point: new Vector3(x, y, z) });
});

When('I move pointer to grid position {string}', function (this: ExtendedWorld, position: string) {
  const [xGrid, zGrid] = checkGridPosition.call(this, position);

  const grid = new Grid(this.getEnv().editorContext.gridStore);

  const gridIndex = grid.gridPositionToGridIndex(xGrid, zGrid);

  const worldPos = grid.gridToWorldPos(gridIndex);

  this.getEnv().toolHelper.pointerMove({ point: new Vector3(worldPos[0], 0, worldPos[1]) });
});

When("I move pointer to grid index '{int}'", function (this: ExtendedWorld, gridIndex: number) {
  const grid = new Grid(this.getEnv().editorContext.gridStore);

  const worldPos = grid.gridToWorldPos(gridIndex);

  this.getEnv().toolHelper.pointerMove({ point: new Vector3(worldPos[0], 0, worldPos[1]) });
});

When('I examine block at {float},{float},{float}', function (this: ExtendedWorld, x: number, y: number, z: number) {
  const blockWithDistance = findClosestBlock(this.getEnv().editorContext.blockStore.getBlocksAsArray(), [x, y, z]);

  if (!blockWithDistance || blockWithDistance[1] > 1) {
    throw new Error(`Block was not found near position (${x},${y},${z})`);
  }

  this.getEnv().testScene.storedBlockId = blockWithDistance[0].id;
});

When('I hover over block {string} and part {string}', function (this: ExtendedWorld, blockId: string, name: string) {
  checkPartIndexExists.call(this, blockId, name);

  const block = this.getEnv().editorContext.blockStore.getBlock(blockId);

  if (!block) {
    throw new Error(`Could not find block with id ${blockId}`);
  }

  this.getEnv().toolHelper.pointerEnter({ blockId: block.id, partIndex: name });
});

When('I hover over block {string}', function (this: ExtendedWorld, blockId: string) {
  const block = this.getEnv().editorContext.blockStore.getBlock(blockId);

  if (!block) {
    throw new Error(`Could not find block with id ${blockId}`);
  }

  this.getEnv().toolHelper.pointerEnter({ blockId: block.id });
});

When('I drag pointer with delta {string}', function (this: ExtendedWorld, deltaStr: string) {
  const delta = checkPosition.call(this, deltaStr);

  this.getEnv().editorContext.tool.onDrag(new Vector3(...delta));
});

When('I end drag', function (this: ExtendedWorld) {
  this.getEnv().editorContext.tool.onDragEnd();
});
