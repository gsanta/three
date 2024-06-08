import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { Vector3 } from 'three';
import { store } from '@/client/common/utils/store';
import { setSelectedGeometry } from '@/client/editor/stores/blockType/blockTypeSlice';
import { setSelectedTool, updateSelectTool } from '@/client/editor/stores/tool/toolSlice';
import ToolName from '@/client/editor/types/ToolName';
import ExtendedWorld from './ExtendedWorld';
import findClosestBlock from './helpers/findClosestBlock';
import { BlockState, update } from '@/client/editor/stores/block/blockSlice';
import AddBlock from '@/client/editor/use_cases/add/AddBlock';
import Num3 from '@/client/editor/types/Num3';
import AddBlockToSlot from '@/client/editor/use_cases/block/AddBlockToSlot';
import AddBlockToPointerPos from '@/client/editor/use_cases/block/AddBlockToPointerPos';

Given('I have an empty canvas', function (this: ExtendedWorld) {
  this.env.teardown();
});

type SceneHash = {
  ID: string;
  PARENT: string;
  POS: string;
  TYPE: string;
};

Given('I have a scene with:', async function (this: ExtendedWorld, table: any) {
  this.env.teardown();

  const addBlock = new AddBlock(this.env.blockStore, this.env.services.factory, this.env.sceneStore, this.env.update);
  const addBlockToSlot = new AddBlockToSlot(
    this.env.blockStore,
    this.env.services.factory,
    this.env.sceneStore,
    this.env.update,
  );
  const addBlockToPointerPos = new AddBlockToPointerPos(
    this.env.blockStore,
    this.env.services.factory,
    this.env.sceneService,
    this.env.sceneStore,
    this.env.update,
  );

  const data = table.hashes() as SceneHash[];

  data.forEach((row) => {
    const pos = row.POS.split(',').map((num) => Number(num)) as Num3;

    this.env.sceneService.setUuid(row.ID);

    if (row.PARENT === '-') {
      addBlock.perform(new Vector3(...pos), row.TYPE);
    } else if (row.PARENT.includes(':')) {
      const [parentId, partIndex] = row.PARENT.split(':');
      addBlockToSlot.perform(parentId, partIndex, row.TYPE);
    } else {
      const intersectingParent = row.POS.split(':')[0];
      const intersectingParentMesh = this.env.sceneStore.getObj3d(intersectingParent);
      const intersectingParentPos = this.env.blockStore.getBlock(intersectingParent).position;
      const relativePos = row.POS.split(':')[1]
        ?.split(',')
        .map((p) => Number(p)) as Num3;

      this.env.sceneService.setIntersection([
        {
          object: intersectingParentMesh,
          distance: 1,
          point: new Vector3(...intersectingParentPos).add(new Vector3(...relativePos)),
        },
      ]);
      addBlockToPointerPos.perform(row.PARENT, '#1', row.TYPE, 0, 0);
    }
  });

  // const data = (await import('../data/house.json')) as unknown as Partial<BlockState>;
  // store.dispatch(update(data));
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

    if (!blockWithDistance) {
      throw new Error(`Block ${blockName} was nof found`);
    }

    if (!blockWithDistance || blockWithDistance[1] > 1) {
      throw new Error(
        `Block was not found near position (${x},${y},${z}), nearest is at postition ${blockWithDistance[0].position}`,
      );
    }

    assert.equal(blockWithDistance[0].type, blockName);
  },
);
