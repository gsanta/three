import { EditorContextType } from '@/app/editor/EditorContext';
import TestScene from './TestScene';
import ToolHelper from './ToolHelper';
import TestSetup from './TestSetup';
import BlockStore from '@/client/editor/features/block/BlockStore';
import { store, testMiddleware } from '@/client/common/utils/store';
import TestMeshFactory from './TestMeshFactory';
import { UpdateBlocks, updateBlocks } from '@/client/editor/features/block/blockSlice';
import { Mesh } from 'three';

type TestEnv = {
  scene: TestScene;
  toolHelper: ToolHelper;
  context: EditorContextType;
  blockStore: BlockStore;
  meshFactory: TestMeshFactory;
  teardown(): void;
};

export const setupTestEnv = (): TestEnv => {
  const testSetup = new TestSetup();
  const scene = new TestScene();
  scene.setup();
  const context = testSetup.setup();
  const toolHelper = new ToolHelper(context, scene);
  const blockStore = new BlockStore(store);
  const meshFactory = new TestMeshFactory();

  testMiddleware.startListening({
    actionCreator: updateBlocks as any,
    effect: async (action) => {
      const payload = action.payload as UpdateBlocks;

      payload.forEach((update) => {
        if ('block' in update) {
          context.scene.addMesh(meshFactory.create(update.block) as unknown as Mesh, update.block.id);
        }
      });
    },
  });

  const teardown = () => {
    testMiddleware.clearListeners();
  };

  return {
    blockStore,
    context,
    meshFactory,
    scene,
    toolHelper,
    teardown,
  };
};

export default TestEnv;
