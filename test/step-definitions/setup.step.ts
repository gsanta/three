import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { Vector3 } from 'three';
import { store } from '@/client/common/utils/store';
import { setSelectedGeometry } from '@/client/editor/stores/template/templateSlice';
import { setSelectedTool, updateSelectTool } from '@/client/editor/stores/tool/toolSlice';
import ToolName from '@/client/editor/types/ToolName';
import ExtendedWorld from './ExtendedWorld';
import findClosestBlock from './helpers/findClosestBlock';

Given('I have an empty canvas', function (this: ExtendedWorld) {
  this.env.teardown();
});

export function addTemplateToPosition(this: ExtendedWorld, template: string, x: number, y: number, z: number) {
  store.dispatch(setSelectedTool(ToolName.Add));
  store.dispatch(setSelectedGeometry(template));

  this.env.toolHelper.pointerMove({ point: new Vector3(x, y, z) });
  this.env.toolHelper.pointerDown();
}

Given('I have canvas with a block {string}', function (this: ExtendedWorld, template: string) {
  this.env.teardown();

  addTemplateToPosition.call(this, template, 0, 0, 0);
});

When('I add template {string} at position {int},{int},{int}', addTemplateToPosition);

export function addTemplateWithIdToPosition(
  this: ExtendedWorld,
  template: string,
  id: string,
  x: number,
  y: number,
  z: number,
) {
  this.env.sceneService.setUuid(id);
  addTemplateToPosition.call(this, template, x, y, z);
}

When('I add template {string} with id {string} at position {int},{int},{int}', addTemplateWithIdToPosition);

When('I add template {string} to the selected part', function (this: ExtendedWorld, template: string) {
  store.dispatch(setSelectedTool(ToolName.Add));
  store.dispatch(updateSelectTool({ templateName: template }));

  this.env.tool.getAddTool().addToSlot();
});

When(
  'I add template {string} with id {string} to the selected part',
  function (this: ExtendedWorld, template: string, id: string) {
    this.env.sceneService.setUuid(id);
    store.dispatch(setSelectedTool(ToolName.Add));
    store.dispatch(updateSelectTool({ templateName: template }));

    this.env.tool.getAddTool().addToSlot();
  },
);

Then(
  'I have a block {string} at estimated position {float},{float},{float}',
  function (this: ExtendedWorld, blockName: string, x: number, y: number, z: number) {
    const blockWithDistance = findClosestBlock(this.env.blockStore.getBlocksAsArray(), [x, y, z]);

    if (!blockWithDistance || blockWithDistance[1] > 1) {
      throw new Error(`Block was not found near position (${x},${y},${z})`);
    }

    assert.equal(blockWithDistance[0].name, blockName);
  },
);
