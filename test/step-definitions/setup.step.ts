import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { Vector3 } from 'three';
import { store } from '@/client/common/utils/store';
import { setSelectedGeometry } from '@/client/editor/stores/template/templateSlice';
import { setSelectedTool, updateSelectTool } from '@/client/editor/stores/tool/toolSlice';
import ToolName from '@/client/editor/types/ToolName';
import ExtendedWorld from './ExtendedWorld';
import MeshUtils from '@/client/editor/utils/MeshUtils';
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

When(
  'I select a block at position {int},{int},{int} with part {string}',
  function (this: ExtendedWorld, x: number, y: number, z: number, partName: string) {
    store.dispatch(setSelectedTool(ToolName.Select));

    const block = this.env.blockStore
      .getBlocksAsArray()
      .find((currBlock) => currBlock.position[0] === x && currBlock.position[1] === y && currBlock.position[2] === z);

    if (!block) {
      throw new Error(`Block not found at position (${x},${y},${z})`);
    }

    const mesh = this.env.sceneStore.getObj3d(block.id);

    const partMesh = MeshUtils.findByName(mesh, partName);
    this.env.sceneService.setIntersection([{ object: partMesh, distance: 1, point: new Vector3() }]);

    this.env.toolHelper.pointerMove({ point: new Vector3(x, y, z) });
    this.env.toolHelper.pointerDown({ blockId: block.id });
  },
);

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
