import { When } from '@cucumber/cucumber';
import ExtendedWorld from './ExtendedWorld';
import { setSelectedTool } from '@/client/editor/stores/tool/toolSlice';
import ToolName from '@/client/editor/types/ToolName';
import { store } from '@/client/common/utils/store';
import { setSelectedGeometry } from '@/client/editor/stores/template/templateSlice';
import { Vector3 } from 'three';
import findClosestBlock from './helpers/findClosestBlock';

When('I select tool {string}', function (this: ExtendedWorld, toolName: ToolName) {
  store.dispatch(setSelectedTool(toolName));
});

When('I execute tool', function (this: ExtendedWorld) {
  this.env.tool.onExecute();
});

When('I select template {string}', function (this: ExtendedWorld, templateName: string) {
  store.dispatch(setSelectedGeometry(templateName));
});

When('I press pointer', function (this: ExtendedWorld) {
  this.env.toolHelper.pointerDown();
});

When('I press pointer over block {string}', function (this: ExtendedWorld, blockId: string) {
  this.env.toolHelper.pointerDown({ blockId });
});

When('I press pointer at {float},{float},{float}', function (this: ExtendedWorld, x: number, y: number, z: number) {
  const blockWithDistance = findClosestBlock(this.env.blockStore.getBlocksAsArray(), [x, y, z]);

  this.env.toolHelper.pointerDown({ blockId: blockWithDistance?.[0].id });
});

When('I move pointer to {float},{float},{float}', function (this: ExtendedWorld, x: number, y: number, z: number) {
  this.env.toolHelper.pointerMove({ point: new Vector3(x, y, z) });
});

When('I examine block at {float},{float},{float}', function (this: ExtendedWorld, x: number, y: number, z: number) {
  const blockWithDistance = findClosestBlock(this.env.blockStore.getBlocksAsArray(), [x, y, z]);

  if (!blockWithDistance || blockWithDistance[1] > 1) {
    throw new Error(`Block was not found near position (${x},${y},${z})`);
  }

  this.env.storedBlockId = blockWithDistance[0].id;
});
