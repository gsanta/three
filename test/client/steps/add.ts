import { store } from '@/client/common/utils/store';
import { setSelectedGeometry } from '@/client/editor/stores/template/templateSlice';
import ToolName from '@/client/editor/types/ToolName';
import { setSelectedTool, updateSelectTool } from '@/client/editor/stores/tool/toolSlice';
import { Vector3 } from 'three';
import TestEnv from '../support/TestEnv';

export const addTemplate = ({ templateName, where }: { templateName: string; where: Vector3 }, env: TestEnv) => {
  store.dispatch(setSelectedTool(ToolName.Add));
  store.dispatch(setSelectedGeometry(templateName));

  env.toolHelper.pointerMove(where);
  env.toolHelper.pointerDown();
};

export const addBlockToSlot = (
  { blockId, slotName, templateName }: { blockId?: string; slotName: string; templateName: string },
  env: TestEnv,
) => {
  env.update
    .getUpdate()
    .select(blockId || env.testScene.getLastModifiedBlock().id, slotName)
    .commit();

  store.dispatch(setSelectedTool(ToolName.Add));
  store.dispatch(updateSelectTool({ templateName }));

  env.tool.getAddTool().addToSlot();
};
