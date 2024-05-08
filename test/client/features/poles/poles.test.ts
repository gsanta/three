import { store } from '@/client/common/utils/store';
import TestEnv, { setupTestEnv } from '../../support/TestEnv';
import { setSelectedTool } from '@/client/editor/features/tool/toolSlice';
import ToolName from '@/client/editor/features/tool/state/ToolName';
import { Vector3 } from 'three';
import { setSelectedGeometry } from '@/client/editor/features/template/templateSlice';
import Pole from '@/client/editor/features/block/types/Pole';

describe('JoinPoles', () => {
  let env: TestEnv;

  beforeEach(() => {
    env = setupTestEnv();
  });

  afterEach(() => {
    env.teardown();
  });

  const joinPoles = () => {
    store.dispatch(setSelectedTool(ToolName.Add));
    store.dispatch(setSelectedGeometry('pole'));

    env.toolHelper.pointerMove(new Vector3(0, 0.1, 5));
    env.toolHelper.pointerDown();

    env.toolHelper.pointerMove(new Vector3(0, 0.1, 10));
    env.toolHelper.pointerDown();

    store.dispatch(setSelectedTool(ToolName.Select));
    const poles = env.blockStore.getBlocksAsArray();
    env.toolHelper.pointerDown({ eventObjectName: poles[0].id });
    env.toolHelper.pointerDown({ eventObjectName: poles[1].id });

    store.dispatch(setSelectedTool(ToolName.Cable));
    env.tool.getCableTool().joinPoles();
  };

  describe('when joining two poles', () => {
    it('creates cables between them', () => {
      joinPoles();

      expect(env.blockStore.getBlocksAsArray()).toHaveLength(5);

      const cables = Object.values(env.blockStore.getDecorations('cables'));

      cables.forEach((cable) => {
        const pole1 = env.blockStore.getBlocks()[cable.end1?.device || ''];
        const pole2 = env.blockStore.getBlocks()[cable.end2?.device || ''];
        expect(cable.points[0]).toMatchMeshPosition({ block: pole1, env, meshName: cable.end1?.pin || '' });
        expect(cable.points[1]).toMatchMeshPosition({ block: pole2, env, meshName: cable.end2?.pin || '' });
      });
    });
  });

  describe('when deleting a pole', () => {
    it('removes the cables as well', () => {
      joinPoles();

      store.dispatch(setSelectedTool(ToolName.Erase));

      const poles = Object.values(env.blockStore.getDecorations('poles'));

      env.toolHelper.pointerDown({ eventObjectName: poles[0].id });

      expect(env.blockStore.getBlocksAsArray()).toHaveLength(1);
      expect(Object.values(env.blockStore.getDecorations('cables'))).toHaveLength(0);

      const block = env.blockStore.getBlocksAsArray()[0];
      const remainingPole = Object.values(env.blockStore.getDecorations('poles'))[0] as Pole;

      expect(block.dependents).toHaveLength(0);
      Object.values(remainingPole.pins).forEach((pin) => {
        expect(pin).toHaveLength(0);
      });
    });
  });
});
