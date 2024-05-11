import TestStore from './TestStore';
import ToolHelper from './ToolHelper';
import BlockStore from '@/client/editor/features/block/BlockStore';
import { store, testMiddleware } from '@/client/common/utils/store';
import TestMeshFactory from './TestMeshFactory';
import { UpdateBlocks, clearBlockSlice, updateBlocks } from '@/client/editor/features/block/blockSlice';
import { Mesh } from 'three';
import UpdateService from '@/client/editor/features/block/services/update/UpdateService';
import SceneStore from '@/client/editor/features/scene/SceneStore';
import ToolService from '@/client/editor/features/tool/service/ToolService';
import AddTool from '@/client/editor/features/block/use_cases/add/AddTool';
import CableTool from '@/client/editor/features/block/use_cases/cable/CableTool';
import ColorTool from '@/client/editor/features/block/use_cases/color/ColorTool';
import EraseTool from '@/client/editor/features/block/use_cases/erase/EraseTool';
import GroupTool from '@/client/editor/features/block/use_cases/group/GroupTool';
import RayTool from '@/client/editor/features/block/use_cases/ray/RayTool';
import SelectTool from '@/client/editor/features/block/use_cases/select/SelectTool';
import MoveBlock from '@/client/editor/use_cases/block/move/MoveBlock';
import ToolStore from '@/client/editor/features/tool/ToolStore';
import TemplateStore from '@/client/editor/features/template/TemplateStore';
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
  const move = new MoveBlock(blockStore, update, sceneStore);

  const templates = new TemplateStore(store);
  const toolStore = new ToolStore(store);

  const tool = new ToolService(
    [
      new AddTool(blockStore, sceneStore, toolStore, update),
      new SelectTool(blockStore, move, scene, sceneStore, update),
      new GroupTool(blockStore, update, templates),
      new CableTool(blockStore, sceneStore, update),
      new EraseTool(blockStore, update),
      new RayTool(blockStore, update, sceneStore),
      new ColorTool(blockStore, update),
    ],
    store,
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
