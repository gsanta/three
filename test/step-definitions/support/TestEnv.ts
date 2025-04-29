import TestStore from './TestStore';
import TestMeshFactory from './TestMeshFactory';
import { dispatchEditorData, fetchEditorData } from '@/client/editor/setupEditorData';
import { store, testMiddleware } from '@/client/common/utils/store';
import EditorContextType, { setupEditor } from '@/client/editor/setupEditor';
import { updateBlocks } from '@/client/editor/stores/block/blockActions';
import { UpdateBlocks } from '@/client/editor/stores/block/blockSlice.types';
import { Mesh } from 'three';
import ToolHelper from './ToolHelper';
import ModelMesh from './mesh_mocks/ModelMesh';
import TestSceneService from './TestSceneService';
import { clearBlockSlice } from '@/client/editor/stores/block/blockSlice';

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
  const { blockStore, sceneStore, tool, update } = editorContext;
  // const blockStore = new BlockStore(store);
  // const scene = new TestSceneService();
  // const factoryService = new FactoryService(blockStore, scene);

  // const electricityStore = new ElectricityStore();
  // const electricitySystemHook = new ElectricitySystemHook(blockStore, electricityStore);

  // const transactionService = new TransactionService(blockStore, store, scene, [electricitySystemHook]);

  // const sceneStore = new SceneStore();

  // const updateService = new UpdateService(blockStore, transactionService, sceneStore);

  // const toolStore = new ToolStore(store);

  // const tool = new ToolService(
  //   [
  //     new AddTool(blockStore, factoryService, scene, sceneStore, transactionService),
  //     new SelectTool(blockStore, scene, sceneStore, toolStore, transactionService),
  //     new CableTool(blockStore, factoryService, scene, sceneStore, transactionService),
  //     new EraseTool(blockStore, transactionService),
  //     new RayTool(blockStore, transactionService, sceneStore),
  //     new ColorTool(blockStore, transactionService),
  //   ],
  //   toolStore,
  // );

  // sceneStore.setToolService(tool);

  const toolHelper = new ToolHelper(sceneStore, tool, testStore);

  const meshFactory = new TestMeshFactory(blockStore, sceneStore, update);

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

        if ('block' in u && u.block) {
          // store.dispatch(resetNotifyOnRendered({ block: u.block.id }));
        }
      });

      setTrackedTimeout(() => {
        payload.blockUpdates.forEach((u) => {
          if ('block' in u && u.block) {
            sceneStore.addMesh(meshFactory.create(u.block) as unknown as Mesh, u.block.id);
            const mesh = sceneStore.getObj3d(u.block.id) as unknown as ModelMesh;
            mesh.render();
            tool.onRendered(u.block.id);
          }
        });

        (editorContext.sceneService as TestSceneService).resolveRender();
      });
    },
  };

  const unsubscribeUpdateBlockListener = testMiddleware.startListening(updateBlocksListener);

  // const updateListener = {
  //   actionCreator: update,
  //   effect: async (action: PayloadAction<Partial<BlockState>>) => {
  //     Object.values(action.payload.blocks || {}).forEach((block) => {
  //       sceneStore.addMesh(meshFactory.create(block) as unknown as Mesh, block.id);
  //     });
  //   },
  // };

  // const unsubscribeUpdateListener = testMiddleware.startListening(updateListener);

  // // TODO: used for tests right now, later it should come from db
  // const seeds = [
  //   ...buildingTempalteSeeds,
  //   ...lampTempalteSeeds,
  //   ...plantTempalteSeeds,
  //   ...poleTempalteSeeds,
  //   ...roadTempalteSeeds,
  //   ...homeElectrics,
  //   ...roomSeeds,
  //   ...furnitureSeeds,
  // ];

  // store.dispatch(setTemplates(seeds as BlockType[]));

  const teardown = () => {
    testMiddleware.clearListeners();
    timeouts.forEach((timeout) => {
      clearTimeout(timeout);
    });
    store.dispatch(clearBlockSlice());
    // store.dispatch(clearEditorSlice());
    // testStore.storedBlockId = undefined;
    // sceneStore.clear();
    // unsubscribeUpdateListener();
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
