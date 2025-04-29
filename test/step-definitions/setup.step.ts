import { After, Before, Given, Then, When } from '@cucumber/cucumber';
import { Vector3 } from 'three';
import { store } from '@/client/common/utils/store';
import { setSelectedGeometry } from '@/client/editor/stores/blockType/blockTypeSlice';
import { setSelectedTool } from '@/client/editor/stores/tool/toolSlice';
import ToolName from '@/client/editor/models/ToolName';
import ExtendedWorld from './ExtendedWorld';
import Num3 from '@/client/editor/models/Num3';
import { checkPartIndexExists } from './helpers/checks';
import VectorUtils from '@/client/editor/utils/vectorUtils';
import { ToolInfo } from '@/client/editor/models/Tool';
import { updateBlocks } from '@/client/editor/stores/block/blockActions';
import TestSceneService from './support/TestSceneService';
import { iWaitForMeshToExist } from './mesh.step';
import assert from 'assert';

Before(function (this: ExtendedWorld) {
  return this.setup();
});

After(function (this: ExtendedWorld) {
  return this.env?.teardown();
});

Given('I have an empty canvas', function (this: ExtendedWorld) {
  this.setup();
});

type SceneHash = {
  ID: string;
  PARENT: string;
  POS: string;
  TYPE: string;
};

Given('I have a scene with:', async function (this: ExtendedWorld, table: any) {
  const sceneService = this.getEnv().editorContext.sceneService as TestSceneService;
  const blockStore = this.getEnv().editorContext.blockStore;
  const sceneStore = this.getEnv().editorContext.sceneStore;
  const tool = this.getEnv().editorContext.tool;

  const addTool = tool.getAddTool();

  const data = table.hashes() as SceneHash[];

  for (const row of data) {
    const pos = row.POS.split(',').map((num) => Number(num)) as Num3;

    if (row.ID) {
      sceneService.setNextUuid(row.ID);
    }

    const block = blockStore.getBlockType(row.TYPE);

    if (!block) {
      throw new Error(`Block type ${row.TYPE} not found.`);
    }

    let parentBlockId: string | undefined;
    let partIndexOrName: string | undefined;

    if (row.PARENT && row.PARENT.includes(':')) {
      [parentBlockId, partIndexOrName] = row.PARENT.split(':');
    } else if (row.PARENT && row.PARENT !== '-') {
      parentBlockId = row.PARENT;
    }

    let partIndex: string | undefined = undefined;

    if (parentBlockId && partIndexOrName) {
      partIndex = checkPartIndexExists.call(this, parentBlockId, partIndexOrName);
    }

    const targetBlock = parentBlockId;

    if (parentBlockId) {
      const intersectingParentMesh = sceneStore.getObj3d(parentBlockId);
      const intersectingParentPos = new Vector3();
      intersectingParentMesh.getWorldPosition(intersectingParentPos);
      const parentBlock = blockStore.getBlock(parentBlockId);
      const relativePos = row.POS.split(':')[1]
        ?.split(',')
        .map((p) => Number(p)) as Num3;

      sceneService.setIntersection([
        {
          meshes: [
            {
              object: {},
              distance: 1,
              point: VectorUtils.add(intersectingParentPos.toArray(), relativePos || [0, 0, 0]),
            },
          ],
          block: parentBlock,
        },
      ]);
    }

    store.dispatch(setSelectedTool(ToolName.Add));
    this.getEnv().toolHelper.pointerEnter({ blockId: targetBlock, partIndex });
    store.dispatch(setSelectedGeometry(block.type));
    addTool.onPointerUp({ clientX: 0, clientY: 0, pos: new Vector3(...pos) } as ToolInfo);

    store.dispatch(updateBlocks({ blockUpdates: [{ select: [], slice: 'city' }] }));

    await iWaitForMeshToExist.call(this, row.ID);
  }
});

export async function addTemplateToPosition(this: ExtendedWorld, template: string, x: number, y: number, z: number) {
  store.dispatch(setSelectedTool(ToolName.Add));
  store.dispatch(setSelectedGeometry(template));

  this.getEnv().toolHelper.pointerMove({ point: new Vector3(x, y, z) });
  this.getEnv().toolHelper.pointerDown();
  this.getEnv().toolHelper.pointerUp();
}

When('I set next uuids to:', function (this: ExtendedWorld, table: any) {
  const data = table.hashes() as {
    UUID: string;
  }[];

  for (const row of data) {
    (this.getEnv().editorContext.sceneService as TestSceneService).setNextUuid(row.UUID);
  }
});

type BlockHash = {
  BLOCK: string;
};

Then('My current scene is', function (this: ExtendedWorld, table: { hashes(): BlockHash[] }) {
  const data = table.hashes();
  const blockStore = this.getEnv().editorContext.blockStore;

  const blocksArray = this.getEnv().editorContext.blockStore.getBlocksAsArray();
  if (blocksArray.length !== data.length) {
    assert.fail(`Expected to have ${data.length} blocks in scene, got ${blocksArray.length}`);
  }

  for (const row of data) {
    if (!blockStore.getBlock(row.BLOCK)) assert.fail(`Block with id '${row.BLOCK}' does not exist in scene`);
  }
});
