import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { Vector3 } from 'three';
import { store } from '@/client/common/utils/store';
import { setSelectedGeometry } from '@/client/editor/stores/blockType/blockTypeSlice';
import { setSelectedTool } from '@/client/editor/stores/tool/toolSlice';
import ToolName from '@/client/editor/types/ToolName';
import ExtendedWorld from './ExtendedWorld';
import findClosestBlock, { calculateDistance } from './helpers/findClosestBlock';
import Num3 from '@/client/editor/types/Num3';
import JoinPoles from '@/client/editor/use_cases/block/JoinPoles';
import { checkBlockExists, checkPartIndexExists, checkPosition } from './helpers/checks';
import VectorUtils from '@/client/editor/utils/vectorUtils';
import AddTool from '@/client/editor/controllers/tools/add/AddTool';
import { ToolInfo } from '@/client/editor/types/Tool';
import { waitForMeshCountChange } from './helpers/waitFor';
import { updateBlocks } from '@/client/editor/stores/block/blockActions';

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
  this.setup();

  const addTool = new AddTool(
    this.env.blockStore,
    this.env.services.factory,
    this.env.sceneService,
    this.env.sceneStore,
    this.env.update,
  );
  // const addBlock = new AddBlockToPlain(
  //   this.env.blockStore,
  //   this.env.services.factory,
  //   this.env.sceneStore,
  //   this.env.update,
  // );
  // const addBlockToPointerPos = new AddBlockToPointerPos(
  //   this.env.blockStore,
  //   this.env.services.factory,
  //   this.env.sceneService,
  //   this.env.sceneStore,
  // );

  const data = table.hashes() as SceneHash[];

  for (const row of data) {
    const pos = row.POS.split(',').map((num) => Number(num)) as Num3;

    this.env.sceneService.setUuid(row.ID);

    const block = this.env.blockStore.getBlockType(row.TYPE);

    if (!block) {
      throw new Error(`Block type ${row.TYPE} not found.`);
    }

    if (block.category === 'cables') {
      const block1IdAndPin = row.POS.split(':')[0];
      const block2IdAndPin = row.POS.split(':')[1];
      const block1 = this.env.blockStore.getBlock(block1IdAndPin.split('#')[0]);
      const block2 = this.env.blockStore.getBlock(block2IdAndPin.split('#')[0]);
      const part1 = `#${block1IdAndPin.split('#')[1]}`;
      const part2 = `#${block2IdAndPin.split('#')[1]}`;

      this.env.sceneService.setIntersection([
        {
          block: block1,
          partIndex: part1,
          meshes: [{ object: {}, distance: 1, point: [0, 0, 0] }],
        },
      ]);

      store.dispatch(setSelectedTool(ToolName.Cable));
      this.env.toolHelper.pointerDown({ blockId: block1.id });
      this.env.toolHelper.pointerUp();
      this.env.toolHelper.pointerMove({ point: new Vector3(0, 0, 0) });

      this.env.sceneService.setIntersection([
        {
          block: block2,
          partIndex: part2,
          meshes: [{ object: {}, distance: 1, point: [0, 0, 0] }],
        },
      ]);

      this.env.toolHelper.pointerDown({ blockId: block2.id });
      this.env.toolHelper.pointerUp();

      // joinPoles.join(block1, block2, [[`#${block1IdAndPin.split('#')[1]}`, `#${block2IdAndPin.split('#')[1]}`]]);
    } else {
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
        const intersectingParentMesh = this.env.sceneStore.getObj3d(parentBlockId);
        const intersectingParentPos = new Vector3();
        intersectingParentMesh.getWorldPosition(intersectingParentPos);
        const parentBlock = this.env.blockStore.getBlock(parentBlockId);
        const relativePos = row.POS.split(':')[1]
          ?.split(',')
          .map((p) => Number(p)) as Num3;

        this.env.sceneService.setIntersection([
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
      this.env.toolHelper.pointerEnter({ blockId: targetBlock, partIndex });
      store.dispatch(setSelectedGeometry(block.type));
      addTool.onPointerUp({ clientX: 0, clientY: 0, pos: new Vector3(...pos) } as ToolInfo);

      store.dispatch(updateBlocks({ blockUpdates: [{ select: null, slice: 'city' }] }));

      // const edit = this.env.update.getTransaction();
      // addBlock.perform(edit, new Vector3(...pos), row.TYPE);
      // edit.commit();
    }

    // else if (row.PARENT?.includes(':')) {
    //   const [parentId, partIndexOrName] = row.PARENT.split(':');

    //   store.dispatch(setSelectedTool(ToolName.Add));
    //   this.env.toolHelper.pointerEnter({ blockId: parentId, partIndex });
    //   store.dispatch(setSelectedGeometry(block.type));
    //   addTool.onPointerUp({ clientX: 0, clientY: 0, pos: new Vector3(...pos) } as ToolInfo);
    // } else {
    //   const edit = this.env.update.getTransaction();
    //   addBlockToPointerPos.perform(edit, row.PARENT, '#1', row.TYPE, 0, 0);
    //   edit.commit();
    // }
  }
});

export async function addTemplateToPosition(this: ExtendedWorld, template: string, x: number, y: number, z: number) {
  store.dispatch(setSelectedTool(ToolName.Add));
  store.dispatch(setSelectedGeometry(template));

  this.env.toolHelper.pointerMove({ point: new Vector3(x, y, z) });
  this.env.toolHelper.pointerDown();
  this.env.toolHelper.pointerUp();
}

Given('I have canvas with a block {string}', async function (this: ExtendedWorld, template: string) {
  this.setup();

  await addTemplateToPosition.call(this, template, 0, 0, 0);
});

When('I set next uuid to {string}', function (this: ExtendedWorld, id: string) {
  this.env.sceneService.setUuid(id);
});

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

Then(
  'I have block {string} at estimated position {string}',
  function (this: ExtendedWorld, blockId: string, posStr: string) {
    const block = checkBlockExists.call(this, blockId);
    const position = checkPosition.call(this, posStr);
    const distance = calculateDistance(position, block.position);

    assert.ok(
      distance < 0.5,
      `Block is not near position (${position.join(',')}), it is at postition ${block.position.join(',')}`,
    );
  },
);
