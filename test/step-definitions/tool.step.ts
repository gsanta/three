import { When } from '@cucumber/cucumber';
import ExtendedWorld from './ExtendedWorld';
import { setSelectedTool } from '@/client/editor/stores/tool/toolSlice';
import ToolName from '@/client/editor/types/ToolName';
import { store } from '@/client/common/utils/store';
import { setSelectedGeometry } from '@/client/editor/stores/blockType/blockTypeSlice';
import { Vector3 } from 'three';
import findClosestBlock from './helpers/findClosestBlock';
import MeshUtils from '@/client/editor/utils/MeshUtils';
import { checkPosition } from './helpers/checks';

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

When(
  'I press pointer over block {string} and part {string} at position {string}',
  function (this: ExtendedWorld, blockId: string, partName: string, position: string) {
    const [x, y, z] = checkPosition.call(this, position);
    const block = this.env.blockStore.getBlock(blockId);

    if (!block) {
      throw new Error(`Block not found at position (${x},${y},${z})`);
    }

    const mesh = this.env.sceneStore.getObj3d(block.id);

    const partMesh = MeshUtils.findByName(mesh, partName);
    this.env.sceneService.setIntersection([{ object: partMesh, distance: 1, point: new Vector3(x, y, z) }]);

    this.env.toolHelper.pointerDown({ blockId });
  },
);

When('I press pointer at {float},{float},{float}', function (this: ExtendedWorld, x: number, y: number, z: number) {
  const blockWithDistance = findClosestBlock(this.env.blockStore.getBlocksAsArray(), [x, y, z]);

  this.env.toolHelper.pointerDown({ blockId: blockWithDistance?.[0].id });
});

When('I move pointer to {string}', function (this: ExtendedWorld, position: string) {
  const [x, y, z] = checkPosition.call(this, position);

  this.env.toolHelper.pointerMove({ point: new Vector3(x, y, z) });
});

When('I examine block at {float},{float},{float}', function (this: ExtendedWorld, x: number, y: number, z: number) {
  const blockWithDistance = findClosestBlock(this.env.blockStore.getBlocksAsArray(), [x, y, z]);

  if (!blockWithDistance || blockWithDistance[1] > 1) {
    throw new Error(`Block was not found near position (${x},${y},${z})`);
  }

  this.env.testScene.storedBlockId = blockWithDistance[0].id;
});

When(
  'I hover over block {string} and part {string}',
  function (this: ExtendedWorld, blockId: string, partIndex: string) {
    const block = this.env.blockStore.getBlock(blockId);

    if (!block) {
      throw new Error(`Could not find block with id ${blockId}`);
    }

    const part = block.parts.find((p) => p.index === partIndex);

    if (!part) {
      throw new Error(`Could not find part with index ${partIndex}`);
    }

    this.env.toolHelper.pointerEnter({ blockId: block.id, partIndex: part.index });
  },
);

When('I drag pointer with delta {string}', function (this: ExtendedWorld, deltaStr: string) {
  const delta = checkPosition.call(this, deltaStr);

  this.env.tool.onDrag(new Vector3(...delta));
});

When('I end drag', function (this: ExtendedWorld) {
  this.env.tool.onDragEnd();
});
