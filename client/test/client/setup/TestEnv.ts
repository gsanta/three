import { EditorContextType } from '@/app/editor/EditorContext';
import TestScene from './TestScene';
import ToolHelper from './ToolHelper';
import TestSetup from './TestSetup';
import BlockStore from '@/client/editor/features/block/BlockStore';
import { store } from '@/client/common/utils/store';

type TestEnv = {
  scene: TestScene;
  toolHelper: ToolHelper;
  context: EditorContextType;
  blockStore: BlockStore;
};

export const setupTestEnv = (): TestEnv => {
  const testSetup = new TestSetup();
  const scene = new TestScene();
  scene.setup();
  const context = testSetup.setup();
  const toolHelper = new ToolHelper(context, scene);
  const blockStore = new BlockStore(store);

  return {
    scene,
    context,
    toolHelper,
    blockStore,
  };
};

export default TestEnv;
