import TestStore from './TestStore';
import TestMeshFactory from './TestMeshFactory';
import { dispatchEditorData, fetchEditorData } from '@/client/editor/setupEditorData';
import { store, testMiddleware } from '@/client/common/utils/store';
import EditorContextType, { setupEditor } from '@/client/editor/setupEditor';
import { clearAll, updateBlocks } from '@/client/editor/stores/block/blockActions';
import { UpdateBlocks } from '@/client/editor/stores/block/blockSlice.types';
import { Mesh } from 'three';
import ToolHelper from './ToolHelper';
import ModelMesh from './mesh_mocks/ModelMesh';

type TestEnv = {
  editorContext: EditorContextType;
  testScene: TestStore;
  toolHelper: ToolHelper;
  teardown(): void;
};

export const setupTestEnv = async (): Promise<TestEnv> => {
  const data = await fetchEditorData();

  dispatchEditorData(data, store.dispatch);

  const testStore = new TestStore();
  testStore.setup();

  const editorContext = setupEditor();
  const { blockStore, gridStore, sceneStore, tool, sceneService, update } = editorContext;

  const toolHelper = new ToolHelper(blockStore, gridStore, sceneStore, tool, testStore);

  const meshFactory = new TestMeshFactory(blockStore, sceneStore, sceneService, update);

  const timeouts: ReturnType<typeof setTimeout>[] = [];

  function setTrackedTimeout(callback: () => void) {
    const timeout = setTimeout(() => {
      callback();
      // Remove the timeout from the array after it runs
      const index = timeouts.indexOf(timeout);
      if (index !== -1) {
        timeouts.splice(index, 1);
      }
    }, 0);
    timeouts.push(timeout);
    return timeout;
  }

  const updateBlocksListener = {
    actionCreator: updateBlocks,
    effect: async (action: { payload: UpdateBlocks; type: string }) => {
      const payload = action.payload as UpdateBlocks;

      payload.blockUpdates.forEach((u) => {
        if ('type' in u && 'block' in u && u.type === 'update') {
          testStore.setLastCreatedBlock(u.block);
        }
      });

      setTrackedTimeout(() => {
        payload.blockUpdates.forEach((u) => {
          if ('block' in u && u.block) {
            sceneStore.addMesh(meshFactory.create(u.block) as unknown as Mesh, u.block.id);
            const mesh = sceneStore.getObj3d(u.block.id) as unknown as ModelMesh;
            mesh.render();

            editorContext.sceneService.onMeshRendered(u.block.id);
          }
        });
      });
    },
  };

  const unsubscribeUpdateBlockListener = testMiddleware.startListening(updateBlocksListener);

  const teardown = () => {
    testMiddleware.clearListeners();
    timeouts.forEach((timeout) => {
      clearTimeout(timeout);
    });
    store.dispatch(clearAll());
    unsubscribeUpdateBlockListener();
  };

  return {
    editorContext,
    testScene: testStore,
    toolHelper,
    teardown,
  };
};

export default TestEnv;
