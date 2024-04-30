import { store } from '@/client/common/utils/store';
import TestEnv, { setupTestEnv } from './setup/TestEnv';
import { setSelectedTool } from '@/client/editor/features/tool/toolSlice';
import ToolName from '@/client/editor/features/tool/state/ToolName';
import { Vector3 } from 'three';
import { setSelectedGeometry } from '@/client/editor/features/template/templateSlice';

describe('JoinPoles', () => {
  let env: TestEnv;

  beforeEach(() => {
    env = setupTestEnv();
  });

  describe('when joining two poles', () => {
    it('creates cables between them', () => {
      store.dispatch(setSelectedTool(ToolName.Add));
      store.dispatch(setSelectedGeometry('pole'));

      env.toolHelper.pointerMove(new Vector3(0, 0.1, 5));
      env.toolHelper.pointerDown();

      env.toolHelper.pointerMove(new Vector3(0, 0.1, 10));
      env.toolHelper.pointerDown();

      store.dispatch(setSelectedTool(ToolName.Select));
      const poles = env.blockStore.getBlocksAsArray();
      env.toolHelper.pointerDown({ eventObjectName: poles[0] });
      env.toolHelper.pointerDown({ eventObjectName: poles[1] });

      store.dispatch(setSelectedTool(ToolName.Cable));
      env.context.tool.getCableTool().joinPoles();
    });
  });
});
