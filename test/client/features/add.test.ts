import { Object3D, Vector3 } from 'three';
import { store } from '@/client/common/utils/store';
import { setSelectedTool, updateSelectTool } from '@/client/editor/features/tool/toolSlice';
import ToolName from '@/client/editor/features/tool/state/ToolName';
import TestEnv, { setupTestEnv } from '../support/TestEnv';
import { setSelectedGeometry } from '@/client/editor/features/template/templateSlice';

describe('Add', () => {
  let env: TestEnv;

  beforeEach(() => {
    env = setupTestEnv();
  });

  afterEach(() => {
    env.teardown();
  });

  describe('when adding a box', () => {
    it('is created where the user clicks', () => {
      store.dispatch(setSelectedTool(ToolName.Add));

      env.toolHelper.pointerMove(new Vector3(0, 0.1, 5));
      env.toolHelper.pointerDown();

      expect(Object.keys(env.blockStore.getBlocks())).toHaveLength(1);
      expect(Object.values(env.blockStore.getBlocks())[0]).toMatchObject({
        geometry: 'model',
        name: 'box',
        position: [0, 0.1, 5],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
      });
    });
  });

  const addToSlot = (blockId: string, slotName: string) => {
    const mesh = env.sceneStore.getObj3d(blockId);
    const childMesh = mesh.children.find((child) => child.name === slotName);

    env.sceneService.setIntersection([{ object: childMesh as Object3D, distance: 1, point: new Vector3() }]);

    env.toolHelper.pointerDown({ eventObjectName: blockId });
    env.tool.getAddTool().addToSlot();
  };

  describe('when adding blocks to slots', () => {
    it('makes the correct connection', () => {
      store.dispatch(setSelectedTool(ToolName.Add));
      store.dispatch(setSelectedGeometry('building-base-1'));

      env.toolHelper.pointerMove(new Vector3(0, 0.1, 5));
      env.toolHelper.pointerDown();

      store.dispatch(setSelectedTool(ToolName.Select));
      store.dispatch(updateSelectTool({ templateName: 'wall_new' }));

      let buildingBaseBlock = env.testScene.getLastCreatedBlock();

      addToSlot(buildingBaseBlock.id, 'wall1');

      const wall1Block = env.testScene.getLastCreatedBlock();

      addToSlot(buildingBaseBlock.id, 'wall2');

      const wall2Block = env.testScene.getLastCreatedBlock();

      expect(wall1Block).toMatchObject({
        parent: buildingBaseBlock.id,
        slotTarget: {
          blockId: buildingBaseBlock.id,
          slotName: 'wall1',
        },
      });

      expect(wall2Block).toMatchObject({
        parent: buildingBaseBlock.id,
        slotTarget: {
          blockId: buildingBaseBlock.id,
          slotName: 'wall2',
        },
      });

      buildingBaseBlock = env.blockStore.getBlock(buildingBaseBlock.id);

      expect(buildingBaseBlock).toMatchObject({
        children: [wall1Block.id, wall2Block.id],
        slotSources: [
          {
            blockId: wall1Block.id,
            slotName: 'wall1',
          },
          {
            blockId: wall2Block.id,
            slotName: 'wall2',
          },
        ],
      });
    });
  });

  it('can add a pole', () => {
    store.dispatch(setSelectedTool(ToolName.Add));
    store.dispatch(setSelectedGeometry('pole'));

    env.toolHelper.pointerMove(new Vector3(0, 0.1, 5));
    env.toolHelper.pointerDown();

    expect(Object.keys(env.blockStore.getBlocks())).toHaveLength(1);
    expect(Object.values(env.blockStore.getBlocks())[0]).toMatchObject({
      geometry: 'model',
      name: 'pole',
      position: [0, 0.1, 5],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    });

    expect(Object.keys(env.blockStore.getDecorations('poles'))).toHaveLength(1);
    expect(Object.values(env.blockStore.getDecorations('poles'))[0]).toMatchObject({
      category: 'poles',
      pins: {
        pin1: [],
        pin2: [],
        pin3: [],
      },
    });
  });
});
