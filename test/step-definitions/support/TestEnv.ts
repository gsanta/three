import TestStore from './TestStore';
import ToolHelper from './ToolHelper';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import { store, testMiddleware } from '@/client/common/utils/store';
import TestMeshFactory from './TestMeshFactory';
import { clearBlockSlice, update } from '@/client/editor/stores/block/blockSlice';
import { Mesh } from 'three';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import ToolService from '@/client/editor/services/ToolService';
import AddTool from '@/client/editor/controllers/tools/add/AddTool';
import CableTool from '@/client/editor/controllers/tools/CableTool';
import ColorTool from '@/client/editor/controllers/tools/ColorTool';
import EraseTool from '@/client/editor/controllers/tools/EraseTool';
import RayTool from '@/client/editor/controllers/tools/RayTool';
import SelectTool from '@/client/editor/controllers/tools/SelectTool';
import ToolStore from '@/client/editor/stores/tool/ToolStore';
import TestSceneService from './TestSceneService';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import ControllerService from '@/client/editor/services/controller/ControllerService';
import buildingTempalteSeeds from 'prisma/seed/block_types/buildingTemplateSeeds';
import lampTempalteSeeds from 'prisma/seed/block_types/lampTemplateSeeds';
import plantTempalteSeeds from 'prisma/seed/block_types/plantTemplateSeeds';
import poleTempalteSeeds from 'prisma/seed/block_types/poleTemplateSeeds';
import roadTempalteSeeds from 'prisma/seed/block_types/roadTemplateSeeds';
import { setTemplates } from '@/client/editor/stores/blockType/blockTypeSlice';
import BlockType from '@/client/editor/types/BlockType';
import ElectricitySystemHook from '@/client/editor/services/electricity/ElectricitySystemHook';
import ElectricityStore from '@/client/editor/stores/electricity/ElectricityStore';
import { clearEditorSlice } from '@/client/editor/stores/editorSlice';
import homeElectrics from 'prisma/seed/block_types/homeElectrics';
import { resetNotifyOnRendered, updateBlocks } from '@/client/editor/stores/block/blockActions';
import { BlockState, UpdateBlocks } from '@/client/editor/stores/block/blockSlice.types';
import furnitureSeeds from 'prisma/seed/block_types/furnitureSeeds';
import roomSeeds from 'prisma/seed/block_types/roomSeeds';
import { PayloadAction } from '@reduxjs/toolkit';
import UpdateService from '@/client/editor/services/update/UpdateService';
import ModelMesh from './mesh_mocks/ModelMesh';

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
  const scene = new TestSceneService();
  const factoryService = new FactoryService(blockStore, scene);

  const electricityStore = new ElectricityStore();
  const electricitySystemHook = new ElectricitySystemHook(blockStore, electricityStore);

  const transactionService = new TransactionService(blockStore, store, scene, [electricitySystemHook]);

  const sceneStore = new SceneStore();

  const updateService = new UpdateService(blockStore, transactionService, sceneStore);

  const meshFactory = new TestMeshFactory(blockStore, sceneStore, updateService);

  const toolStore = new ToolStore(store);

  const tool = new ToolService(
    [
      new AddTool(blockStore, factoryService, scene, sceneStore, transactionService),
      new SelectTool(blockStore, scene, sceneStore, toolStore, transactionService),
      new CableTool(blockStore, factoryService, scene, sceneStore, transactionService),
      new EraseTool(blockStore, transactionService),
      new RayTool(blockStore, transactionService, sceneStore),
      new ColorTool(blockStore, transactionService),
    ],
    toolStore,
  );

  sceneStore.setToolService(tool);

  const toolHelper = new ToolHelper(sceneStore, tool, testStore);

  const updateBlocksListener = {
    actionCreator: updateBlocks,
    effect: async (action: { payload: UpdateBlocks; type: string }) => {
      const payload = action.payload as UpdateBlocks;

      payload.blockUpdates.forEach((u) => {
        if ('type' in u && 'block' in u && u.type === 'update') {
          testStore.setLastCreatedBlock(u.block);
        }

        if ('block' in u && u.block) {
          sceneStore.addMesh(meshFactory.create(u.block) as unknown as Mesh, u.block.id);
          tool.onRendered(u.block.id);
        }

        // if ('block' in u && u.block && u.block.isDirty) {
        //   setTimeout(() => {
        //     const mesh = sceneStore.getObj3d(u.block.id) as unknown as ModelMesh;
        //     mesh.render();
        //   }, 0);
        //   // tool.onRendered(u.block.id);

        //   // store.dispatch(resetNotifyOnRendered({ block: u.block.id }));
        // }
      });
    },
  };

  const unsubscribeUpdateBlockListener = testMiddleware.startListening(updateBlocksListener);

  const updateListener = {
    actionCreator: update,
    effect: async (action: PayloadAction<Partial<BlockState>>) => {
      Object.values(action.payload.blocks || {}).forEach((block) => {
        sceneStore.addMesh(meshFactory.create(block) as unknown as Mesh, block.id);
      });
    },
  };

  const unsubscribeUpdateListener = testMiddleware.startListening(updateListener);

  // TODO: used for tests right now, later it should come from db
  const seeds = [
    ...buildingTempalteSeeds,
    ...lampTempalteSeeds,
    ...plantTempalteSeeds,
    ...poleTempalteSeeds,
    ...roadTempalteSeeds,
    ...homeElectrics,
    ...roomSeeds,
    ...furnitureSeeds,
  ];

  store.dispatch(setTemplates(seeds as BlockType[]));

  const teardown = () => {
    // testMiddleware.clearListeners();
    store.dispatch(clearBlockSlice());
    store.dispatch(clearEditorSlice());
    testStore.storedBlockId = undefined;
    sceneStore.clear();
    unsubscribeUpdateListener();
    unsubscribeUpdateBlockListener();
  };

  return {
    blockStore,
    controller: new ControllerService(transactionService),
    meshFactory,
    sceneService: scene,
    sceneStore,
    services: {
      factory: factoryService,
    },
    testScene: testStore,
    tool,
    toolHelper,
    update: transactionService,
    teardown,
  };
};

export default TestEnv;
