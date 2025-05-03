import TestSceneService from '@/test/step-definitions/support/TestSceneService';
import { store } from '../common/utils/store';
import SceneStore from './ui/scene/SceneStore';
import SceneService from './ui/scene/service/SceneService';
import SceneServiceImpl from './ui/scene/service/SceneServiceImpl';
import ExportJson from './controllers/io/ExportJson';
import ImportJson from './controllers/io/ImportJson';
import AddTool from './controllers/tools/AddTool';
import EraseTool from './controllers/tools/EraseTool';
import RayTool from './controllers/tools/RayTool';
import SelectTool from './controllers/tools/SelectTool';
import ControllerService from './services/controller/ControllerService';
import ElectricitySystemHook from './services/electricity/ElectricitySystemHook';
import EraserService from './services/EraserService';
import FactoryService from './services/factory/FactoryService';
import ToolService from './services/ToolService';
import TransactionService from './services/transaction/TransactionService';
import UpdateService from './services/update/UpdateService';
import BlockStore from './stores/block/BlockStore';
import BlockCategoryStore from './stores/blockCategory/BlockCategoryStore';
import ElectricityStore from './stores/electricity/ElectricityStore';
import ToolStore from './stores/tool/ToolStore';
import ContextMenuController from './controllers/ContextMenuController';
import ConnectPoleToBuilding from './use_cases/block/add/ConnectPoleToBuilding';

type EditorContextType = {
  blockStore: BlockStore;
  blockCategoryStore: BlockCategoryStore;
  controller: ControllerService;
  eraser: EraserService;
  tool: ToolService;
  exporter: ExportJson;
  importer: ImportJson;
  sceneStore: SceneStore;
  sceneService: SceneService;
  transaction: TransactionService;
  update: UpdateService;

  contextMenuController: ContextMenuController;
};

export const isTestEnv = () => process.env.NODE_ENV === 'test';

export const setupEditor = () => {
  const sceneStore = new SceneStore();
  const toolStore = new ToolStore(store);
  const blockStore = new BlockStore(store);
  const blockCategoryStore = new BlockCategoryStore(store, blockStore);
  const scene = isTestEnv() ? new TestSceneService() : new SceneServiceImpl(blockStore, sceneStore);
  const factoryService = new FactoryService(blockStore, scene);

  const electricityStore = new ElectricityStore();
  const electricitySystemHook = new ElectricitySystemHook(blockStore, electricityStore);

  const transaction = new TransactionService(blockStore, store, scene, [electricitySystemHook]);

  // const addService = new AddService(blockStore, blockCategoryStore, factoryService, sceneStore, transaction);

  const updateService = new UpdateService(blockStore, transaction, sceneStore);

  const contextMenuController = new ContextMenuController(
    blockStore,
    new ConnectPoleToBuilding(blockStore, factoryService, sceneStore, scene, transaction),
  );

  const editorContext: EditorContextType = {
    blockCategoryStore: blockCategoryStore,
    blockStore: blockStore,
    controller: new ControllerService(transaction),
    eraser: new EraserService(blockStore, transaction),
    exporter: new ExportJson(store),
    importer: new ImportJson(store),
    sceneStore: sceneStore,
    sceneService: scene,
    tool: new ToolService(
      [
        new AddTool(blockStore, factoryService, sceneStore, scene, transaction),
        new SelectTool(blockStore, blockCategoryStore, scene, sceneStore, toolStore, transaction, scene),
        new EraseTool(blockStore, transaction),
        new RayTool(blockStore, transaction, sceneStore),
      ],
      toolStore,
    ),
    transaction,
    update: updateService,

    contextMenuController,
  };

  editorContext.sceneStore.setToolService(editorContext.tool);

  return editorContext;
};

export default EditorContextType;
