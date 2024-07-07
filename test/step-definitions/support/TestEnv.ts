import TestStore from './TestStore';
import ToolHelper from './ToolHelper';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import { store, testMiddleware } from '@/client/common/utils/store';
import TestMeshFactory from './TestMeshFactory';
import { UpdateBlocks, clearBlockSlice, update, updateBlocks } from '@/client/editor/stores/block/blockSlice';
import { Mesh } from 'three';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import ToolService from '@/client/editor/services/ToolService';
import AddTool from '@/client/editor/controllers/tools/add/AddTool';
import CableTool from '@/client/editor/controllers/tools/CableTool';
import ColorTool from '@/client/editor/controllers/tools/ColorTool';
import EraseTool from '@/client/editor/controllers/tools/EraseTool';
import GroupTool from '@/client/group/GroupTool';
import RayTool from '@/client/editor/controllers/tools/RayTool';
import SelectTool from '@/client/editor/controllers/tools/SelectTool';
import ToolStore from '@/client/editor/stores/tool/ToolStore';
import TemplateStore from '@/client/editor/stores/blockType/TemplateStore';
import TestSceneService from './TestSceneService';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import ControllerService from '@/client/editor/services/controller/ControllerService';
import buildingTempalteSeeds from 'prisma/seed/buildingTemplateSeeds';
import lampTempalteSeeds from 'prisma/seed/lampTemplateSeeds';
import plantTempalteSeeds from 'prisma/seed/plantTemplateSeeds';
import poleTempalteSeeds from 'prisma/seed/poleTemplateSeeds';
import roadTempalteSeeds from 'prisma/seed/roadTemplateSeeds';
import { setTemplates } from '@/client/editor/stores/blockType/blockTypeSlice';
import BlockType from '@/client/editor/types/BlockType';
import ElectricitySystemHook from '@/client/editor/services/electricity/ElectricitySystemHook';
import ElectricityStore from '@/client/editor/stores/electricity/ElectricityStore';
import { clearEditorSlice } from '@/client/editor/stores/editorSlice';

type TestEnv = {
  controller: ControllerService;
  blockStore: BlockStore;
  meshFactory: TestMeshFactory;
  sceneService: TestSceneService;
  sceneStore: SceneStore;
  services: {
    factory: FactoryService;
  };
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

  const electricityStore = new ElectricityStore();
  const electricitySystemHook = new ElectricitySystemHook(blockStore, electricityStore);

  const updateService = new TransactionService(blockStore, store, scene, [electricitySystemHook]);

  const sceneStore = new SceneStore();

  const templates = new TemplateStore(store);
  const toolStore = new ToolStore(store);

  const tool = new ToolService(
    [
      new AddTool(blockStore, factoryService, scene, sceneStore, updateService),
      new SelectTool(blockStore, scene, sceneStore, toolStore, updateService),
      new GroupTool(blockStore, updateService, templates),
      new CableTool(blockStore, factoryService, scene, sceneStore, updateService),
      new EraseTool(blockStore, updateService),
      new RayTool(blockStore, updateService, sceneStore),
      new ColorTool(blockStore, updateService),
    ],
    toolStore,
  );

  const toolHelper = new ToolHelper(sceneStore, tool, testStore);

  testMiddleware.startListening({
    actionCreator: updateBlocks,
    effect: async (action) => {
      const payload = action.payload as UpdateBlocks;

      payload.forEach((u) => {
        if ('type' in u && 'block' in u && u.type === 'update') {
          testStore.setLastCreatedBlock(u.block);
        }

        if ('block' in u && u.block) {
          sceneStore.addMesh(meshFactory.create(u.block, sceneStore) as unknown as Mesh, u.block.id);
          testStore.setLastModifiedBlock(u.block);
        }
      });
    },
  });

  testMiddleware.startListening({
    actionCreator: update,
    effect: async (action) => {
      Object.values(action.payload.blocks || {}).forEach((block) => {
        sceneStore.addMesh(meshFactory.create(block, sceneStore) as unknown as Mesh, block.id);
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
    store.dispatch(clearEditorSlice());
    testStore.storedBlockId = undefined;
  };

  return {
    blockStore,
    controller: new ControllerService(updateService),
    meshFactory,
    sceneService: scene,
    sceneStore,
    services: {
      factory: factoryService,
    },
    testScene: testStore,
    tool,
    toolHelper,
    update: updateService,
    teardown,
  };
};

export default TestEnv;
