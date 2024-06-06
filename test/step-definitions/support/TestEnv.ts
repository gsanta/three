import TestStore from './TestStore';
import ToolHelper from './ToolHelper';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import { store, testMiddleware } from '@/client/common/utils/store';
import TestMeshFactory from './TestMeshFactory';
import { UpdateBlocks, clearBlockSlice, updateBlocks } from '@/client/editor/stores/block/blockSlice';
import { Mesh } from 'three';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import ToolService from '@/client/editor/services/ToolService';
import AddTool from '@/client/editor/controllers/tools/AddTool';
import CableTool from '@/client/editor/controllers/tools/CableTool';
import ColorTool from '@/client/editor/controllers/tools/ColorTool';
import EraseTool from '@/client/editor/controllers/tools/EraseTool';
import GroupTool from '@/client/group/GroupTool';
import RayTool from '@/client/editor/controllers/tools/RayTool';
import SelectTool from '@/client/editor/controllers/tools/SelectTool';
import ToolStore from '@/client/editor/stores/tool/ToolStore';
import TemplateStore from '@/client/editor/stores/template/TemplateStore';
import TestSceneService from './TestSceneService';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import ControllerService from '@/client/editor/services/controller/ControllerService';
import buildingTempalteSeeds from 'prisma/seed/buildingTemplateSeeds';
import lampTempalteSeeds from 'prisma/seed/lampTemplateSeeds';
import plantTempalteSeeds from 'prisma/seed/plantTemplateSeeds';
import poleTempalteSeeds from 'prisma/seed/poleTemplateSeeds';
import roadTempalteSeeds from 'prisma/seed/roadTemplateSeeds';
import { setTemplates } from '@/client/editor/stores/template/templateSlice';
import BlockType from '@/client/editor/types/BlockType';

type TestEnv = {
  controller: ControllerService;
  blockStore: BlockStore;
  meshFactory: TestMeshFactory;
  sceneService: TestSceneService;
  sceneStore: SceneStore;
  testScene: TestStore;
  tool: ToolService;
  toolHelper: ToolHelper;
  update: TransactionService;
  teardown(): void;
};

export const setupTestEnv = (): TestEnv => {
  const testStore = new TestStore();
  testStore.setup();
  const blockStore = new BlockStore(store);
  const meshFactory = new TestMeshFactory();
  const scene = new TestSceneService();
  const factoryService = new FactoryService(blockStore, scene);

  const update = new TransactionService(blockStore, store, scene);

  const sceneStore = new SceneStore();

  const templates = new TemplateStore(store);
  const toolStore = new ToolStore(store);

  const tool = new ToolService(
    [
      new AddTool(blockStore, factoryService, scene, sceneStore, toolStore, update),
      new SelectTool(blockStore, scene, sceneStore, toolStore, update),
      new GroupTool(blockStore, update, templates),
      new CableTool(blockStore, factoryService, scene, sceneStore, update),
      new EraseTool(blockStore, update),
      new RayTool(blockStore, update, sceneStore),
      new ColorTool(blockStore, update),
    ],
    toolStore,
  );

  const toolHelper = new ToolHelper(sceneStore, tool, testStore);

  testMiddleware.startListening({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    actionCreator: updateBlocks as any,
    effect: async (action) => {
      const payload = action.payload as UpdateBlocks;

      payload.forEach((u) => {
        if ('type' in u && 'block' in u && u.type === 'update') {
          testStore.setLastCreatedBlock(u.block);
        }

        if ('block' in u && u.block) {
          sceneStore.addMesh(meshFactory.create(u.block) as unknown as Mesh, u.block.id);
          testStore.setLastModifiedBlock(u.block);
        }
      });
    },
  });

  // TODO: used for tests right now, later it should come from db
  const seeds = [
    ...buildingTempalteSeeds,
    ...lampTempalteSeeds,
    ...plantTempalteSeeds,
    ...poleTempalteSeeds,
    ...roadTempalteSeeds,
  ];

  store.dispatch(setTemplates(seeds as BlockType[]));

  const teardown = () => {
    // testMiddleware.clearListeners();
    store.dispatch(clearBlockSlice());
    testStore.storedBlockId = undefined;
  };

  return {
    blockStore,
    controller: new ControllerService(update),
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
