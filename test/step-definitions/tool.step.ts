import { When } from '@cucumber/cucumber';
import ExtendedWorld from './ExtendedWorld';
import { setSelectedTool } from '@/client/editor/stores/tool/toolSlice';
import ToolName from '@/client/editor/models/ToolName';
import { store } from '@/client/common/utils/store';
import { setSelectedGeometry } from '@/client/editor/stores/blockType/blockTypeSlice';
import { Vector3 } from 'three';
import findClosestBlock from './helpers/findClosestBlock';
import { checkPartIndexExists, checkPosition } from './helpers/checks';
import { BlockIntersection } from '@/client/editor/use_cases/IntersectMesh';
import Num3 from '@/client/editor/models/Num3';
import TestSceneService from './support/TestSceneService';

When('I select tool {string}', function (this: ExtendedWorld, toolName: ToolName) {
  store.dispatch(setSelectedTool(toolName));
});

When('I execute tool', function (this: ExtendedWorld) {
  this.getEnv().tool.onExecute();
});

When('I select template {string}', function (this: ExtendedWorld, templateName: string) {
  store.dispatch(setSelectedGeometry(templateName));
});

When('I press pointer', function (this: ExtendedWorld) {
  this.getEnv().toolHelper.pointerDown();
  this.getEnv().toolHelper.pointerUp();
});

When('I press pointer over block {string}', function (this: ExtendedWorld, blockId: string) {
  this.getEnv().toolHelper.pointerDown({ blockId });
  this.getEnv().toolHelper.pointerUp();
});

type IntersectionHash = {
  BLOCK: string;
  PART: string;
  POSITION: string;
  B_BOX_CENTER: string;
};

When('I have an intersection with:', function (this: ExtendedWorld, table: any) {
  const data = table.hashes() as IntersectionHash[];

  const intersections: BlockIntersection[] = [];
  data.forEach((row) => {
    const block = this.getEnv().blockStore.getBlock(row.BLOCK);
    const entry = Object.entries(block.partDetails).find(([, val]) => val?.name === row.PART);

    if (!entry?.[0]) {
      throw new Error(`Part with name ${row.PART} not found for block ${block.id}`);
    }

    const point = row.POSITION ? checkPosition.call(this, row.POSITION) : ([0, 0, 0] as Num3);
    const boungingBoxCenter = checkPosition.call(this, row.B_BOX_CENTER);

    const partIndex = entry?.[0];

    intersections.push({
      block,
      partIndex,
      partInfo: block.partDetails[partIndex],
      meshes: [
        {
          distance: 1,
          point,
          object: {
            boungingBox: {
              center: boungingBoxCenter,
            },
          },
        },
      ],
    });
  });

  this.getEnv().sceneService.setIntersection(intersections);
});

When(
  'I press pointer over block {string} and part {string} at position {string}',
  function (this: ExtendedWorld, blockId: string, partName: string, position: string) {
    const [x, y, z] = checkPosition.call(this, position);
    const block = this.getEnv().editorContext.blockStore.getBlock(blockId);

    if (!block) {
      throw new Error(`Block not found at position (${x},${y},${z})`);
    }

    const partIndex = checkPartIndexExists.call(this, block.id, partName);
    (this.getEnv().editorContext.sceneService as TestSceneService).setIntersection([
      {
        block,
        partIndex: partIndex,
        meshes: [{ object: {}, distance: 1, point: [x, y, z] }],
      },
    ]);

    this.getEnv().toolHelper.pointerEnter({ blockId: block.id, partIndex: partIndex });
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

When('I examine block at {float},{float},{float}', function (this: ExtendedWorld, x: number, y: number, z: number) {
  const blockWithDistance = findClosestBlock(this.getEnv().editorContext.blockStore.getBlocksAsArray(), [x, y, z]);

  if (!blockWithDistance || blockWithDistance[1] > 1) {
    throw new Error(`Block was not found near position (${x},${y},${z})`);
  }

  this.getEnv().testScene.storedBlockId = blockWithDistance[0].id;
});

When(
  'I hover over block {string} and part {string}',
  function (this: ExtendedWorld, blockId: string, partIndexOrName: string) {
    const partIndex = checkPartIndexExists.call(this, blockId, partIndexOrName);

    const block = this.getEnv().editorContext.blockStore.getBlock(blockId);

    if (!block) {
      throw new Error(`Could not find block with id ${blockId}`);
    }

    this.getEnv().toolHelper.pointerEnter({ blockId: block.id, partIndex: partIndex });
  },
);

When('I drag pointer with delta {string}', function (this: ExtendedWorld, deltaStr: string) {
  const delta = checkPosition.call(this, deltaStr);

  this.getEnv().editorContext.tool.onDrag(new Vector3(...delta));
});

When('I end drag', function (this: ExtendedWorld) {
  this.getEnv().editorContext.tool.onDragEnd();
});
