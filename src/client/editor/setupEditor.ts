import TestSceneService from '@/test/step-definitions/support/TestSceneService';
import { store } from '../common/utils/store';
import SceneStore from './ui/scene/SceneStore';
import SceneService from './ui/scene/service/SceneService';
import SceneServiceImpl from './ui/scene/service/SceneServiceImpl';
import ExportJson from './controllers/io/ExportJson';
import ImportJson from './controllers/io/ImportJson';
import ControllerService from './services/controller/ControllerService';
import EraserService from './services/EraserService';
import FactoryService from './services/factory/FactoryService';
import ToolService from './services/ToolService';
import TransactionService from './services/transaction/TransactionService';
import UpdateService from './services/update/UpdateService';
import BlockStore from './stores/block/BlockStore';
import BlockCategoryStore from './stores/blockCategory/BlockCategoryStore';
import ToolStore from './stores/tool/ToolStore';
import ContextMenuController from './controllers/ContextMenuController';
import ConnectPoleToBuilding from './use_cases/block/add/ConnectPoleToBuilding';
import GridStore from './stores/grid/GridStore';
import GameController from './controllers/GameController';
import GameStore from './stores/game/GameStore';
import DeleteAction from './stores/blockCategory/actions/DeleteAction';
import JoinCableAction from './stores/blockCategory/actions/JoinCableAction';
import AddTool from './controllers/tools/AddTool';
import EraseTool from './controllers/tools/EraseTool';
import JoinTool from './controllers/tools/JoinTool';
import MoveTool from './controllers/tools/MoveTool';
import RayTool from './controllers/tools/RayTool';
import SelectTool from './controllers/tools/SelectTool';
import CableConnector from './services/CableConnector';
import { ConnectPoleFactory } from './use_cases/connecting/ConnectPole';
import BlockTypeSelectorService from './services/BlockTypeSelectorService';
import BlockTypeStore from './stores/blockType/BlockTypeStore';
import UndergroundCableTool from './controllers/tools/UndergroundCableTool';
import CableDrawingService from './services/CableDrawingService';

type EditorContextType = {
  blockStore: BlockStore;
  blockCategoryStore: BlockCategoryStore;
  blockTypeSelectorService: BlockTypeSelectorService;
  cableDrawingService: CableDrawingService;
  controller: ControllerService;
  eraser: EraserService;
  gridStore: GridStore;
  tool: ToolService;
  exporter: ExportJson;
  importer: ImportJson;
  sceneStore: SceneStore;
  sceneService: SceneService;
  update: UpdateService;

  controllers: {
    game: GameController;
  };

  contextMenuController: ContextMenuController;
};

export const isTestEnv = () => process.env.NODE_ENV === 'test';

export const setupEditor = () => {
  const gameStore = new GameStore(store);
  const blockStore = new BlockStore(store);
  const gridStore = new GridStore(blockStore, store);
  const sceneStore = new SceneStore();
  const toolStore = new ToolStore(store);
  const blockTypeStore = new BlockTypeStore(store);

  const sceneService = isTestEnv() ? new TestSceneService() : new SceneServiceImpl(blockStore, sceneStore);
  const factoryService = new FactoryService(blockTypeStore, sceneService);

  const transaction = new TransactionService(blockStore, store, sceneService, []);

  const toolService = new ToolService(sceneService, toolStore);

  const blockCategoryStore = new BlockCategoryStore(store, blockStore, {
    'delete-action': new DeleteAction(new EraserService(blockStore, transaction)),
    'join-cable-action': new JoinCableAction(toolService),
  });

  const updateService = new UpdateService(blockStore, transaction, sceneStore);

  const contextMenuController = new ContextMenuController(
    blockStore,
    new ConnectPoleToBuilding(blockStore, factoryService, sceneStore, sceneService, transaction),
  );

  const gameController = new GameController(blockStore, gameStore, gridStore, sceneStore, store);

  const cableConnector = new CableConnector({
    poles: new ConnectPoleFactory(blockStore, factoryService, sceneService, sceneStore, transaction),
  });

  const cableDrawingService = new CableDrawingService(
    blockStore,
    factoryService,
    gridStore,
    sceneService,
    sceneStore,
    transaction,
  );

  toolService.setTools([
    new AddTool(blockStore, blockTypeStore, factoryService, gridStore, sceneStore, sceneService, transaction),
    new JoinTool(blockStore, blockCategoryStore, cableConnector, gridStore, sceneService, transaction),
    new MoveTool(blockStore, gameStore, gridStore, sceneService, transaction),
    new SelectTool(blockStore, blockCategoryStore, sceneService, sceneStore, toolStore, transaction, sceneService),
    new EraseTool(blockStore, sceneService, transaction),
    new RayTool(blockStore, transaction, sceneStore),
    new UndergroundCableTool(blockStore, blockTypeStore, cableDrawingService, sceneService, transaction),
  ]);

  const blockTypeSelectorService = new BlockTypeSelectorService(blockTypeStore);

  const editorContext: EditorContextType = {
    blockCategoryStore: blockCategoryStore,
    blockStore: blockStore,
    blockTypeSelectorService,
    cableDrawingService,
    controller: new ControllerService(transaction),
    eraser: new EraserService(blockStore, transaction),
    exporter: new ExportJson(store),
    gridStore: gridStore,
    importer: new ImportJson(store),
    sceneStore: sceneStore,
    sceneService: sceneService,
    tool: toolService,
    update: updateService,

    controllers: {
      game: gameController,
    },

    contextMenuController,
  };

  editorContext.sceneStore.setToolService(editorContext.tool);

  transaction.setEditorContext(editorContext);

  return editorContext;
};

export default EditorContextType;
