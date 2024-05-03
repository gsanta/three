import { Vector3 } from 'three';
import { store } from '@/client/common/utils/store';
import { setSelectedTool } from '@/client/editor/features/tool/toolSlice';
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
        geometry: 'box',
        name: 'box',
        position: [0, 0.1, 5],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
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
      position: [0, 0.6, 5],
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
