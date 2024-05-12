import TestStore from './TestStore';
import ToolHelper from './ToolHelper';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import { store, testMiddleware } from '@/client/common/utils/store';
import TestMeshFactory from './TestMeshFactory';
import { UpdateBlocks, clearBlockSlice, updateBlocks } from '@/client/editor/stores/block/blockSlice';
import { Mesh } from 'three';
import UpdateService from '@/client/editor/services/update/UpdateService';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import ToolService from '@/client/editor/services/ToolService';
import AddTool from '@/client/editor/controllers/tools/AddTool';
import CableTool from '@/client/editor/controllers/tools/CableTool';
import ColorTool from '@/client/editor/controllers/tools/ColorTool';
import EraseTool from '@/client/editor/controllers/tools/EraseTool';
import GroupTool from '@/client/group/GroupTool';
import RayTool from '@/client/editor/controllers/tools/RayTool';
import SelectTool from '@/client/editor/controllers/tools/SelectTool';
import MoveBlock from '@/client/editor/use_cases/block/move/MoveBlock';
import ToolStore from '@/client/editor/stores/tool/ToolStore';
import TemplateStore from '@/client/editor/stores/template/TemplateStore';
import TestSceneService from './TestSceneService';

type TestEnv = {
  meshFactory: TestMeshFactory;
  blockStore: BlockStore;
  sceneService: TestSceneService;
  sceneStore: SceneStore;
  testScene: TestStore;
  tool: ToolService;
  toolHelper: ToolHelper;
  update: UpdateService;
  teardown(): void;
};

export const setupTestEnv = (): TestEnv => {
  const testStore = new TestStore();
  testStore.setup();
  const blockStore = new BlockStore(store);
  const meshFactory = new TestMeshFactory();
  const update = new UpdateService(blockStore, store);

  const scene = new TestSceneService();

  const sceneStore = new SceneStore();

  const templates = new TemplateStore(store);
  const toolStore = new ToolStore(store);

  const tool = new ToolService(
    [
      new AddTool(blockStore, sceneStore, toolStore, update),
      new SelectTool(blockStore, scene, sceneStore, toolStore, update),
      new GroupTool(blockStore, update, templates),
      new CableTool(blockStore, sceneStore, update),
      new EraseTool(blockStore, update),
      new RayTool(blockStore, update, sceneStore),
      new ColorTool(blockStore, update),
    ],
    store,
    toolStore,
  );

  const toolHelper = new ToolHelper(tool, testStore);

  const listener = testMiddleware.startListening({
    actionCreator: updateBlocks as any,
    effect: async (action) => {
      const payload = action.payload as UpdateBlocks;

      payload.forEach((u) => {
        if ('type' in u && u.type === 'create') {
          testStore.setLastCreatedBlock(u.block);
        }

        if ('block' in u && u.block) {
          sceneStore.addMesh(meshFactory.create(u.block) as unknown as Mesh, u.block.id);
          testStore.setLastModifiedBlock(u.block);
        }
      });
    },
  });

  const teardown = () => {
    testMiddleware.clearListeners();
    store.dispatch(clearBlockSlice());
  };

  return {
    blockStore,
    meshFactory,
    sceneService: scene,
    sceneStore,
    testScene: testStore,
    tool,
    toolHelper,
    update,
    teardown,
  };
};

export default TestEnv;
