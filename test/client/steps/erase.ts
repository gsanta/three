import { store } from '@/client/common/utils/store';
import ToolName from '@/client/editor/features/tool/state/ToolName';
import { setSelectedTool } from '@/client/editor/features/tool/toolSlice';
import TestEnv from '../support/TestEnv';
import BlockCategory from '@/client/editor/types/BlockCategory';

export const eraseBlockById = ({ blockId }: { blockId: string }, env: TestEnv) => {
  store.dispatch(setSelectedTool(ToolName.Erase));
  env.toolHelper.pointerDown({ eventObjectName: blockId });
};

export const eraseOneBlockByCategory = ({ category }: { category: BlockCategory }, env: TestEnv) => {
  const foundBlock = env.blockStore.getBlocksAsArray().find((block) => block.category === category);

  if (!foundBlock) {
    throw new Error(`Block with category "${category}" not found`);
  }

  eraseBlockById({ blockId: foundBlock.id }, env);
};
