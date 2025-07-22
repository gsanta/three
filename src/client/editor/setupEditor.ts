import TestSceneService from '@/test/step-definitions/support/TestSceneService';
import { store } from '../common/utils/store';
import SceneStore from './ui/scene/SceneStore';
import SceneService from './ui/scene/service/SceneService';
import SceneServiceImpl from './ui/scene/service/SceneServiceImpl';
import Serializer from './controllers/serializer/Serializer';
import EraserService from './services/EraserService';
import FactoryService from './services/factory/FactoryService';
import ToolService from './services/ToolService';
import TransactionService from './services/transaction/TransactionService';
import UpdateService from './services/update/UpdateService';
import BlockStore from './stores/block/BlockStore';
import BlockCategoryStore from './stores/blockCategory/BlockCategoryStore';
import ToolStore from './stores/tool/ToolStore';
import GridStore from './stores/grid/GridStore';
import GameController from './controllers/GameController';
import GameStore from './stores/game/GameStore';
import DeleteAction from './stores/blockCategory/actions/DeleteAction';
import JoinCableAction from './stores/blockCategory/actions/JoinCableAction';
import AddTool from './controllers/tools/AddTool';
import EraseTool from './controllers/tools/EraseTool';
import MoveTool from './controllers/tools/MoveTool';
import RayTool from './controllers/tools/RayTool';
import SelectTool from './controllers/tools/SelectTool';
import BlockTypeSelectorService from './services/BlockTypeSelectorService';
import BlockTypeStore from './stores/blockType/BlockTypeStore';
import CableTool from './controllers/tools/CableTool';
import CableDrawingService from './services/CableDrawingService';
import BlockSerializer from './stores/block/BlockSerializer';
import GameSerializer from './stores/game/GameSerializer';
import GridSerializer from './stores/grid/GridSerializer';
import BuildService from './services/BuildService';
import AddService from './controllers/tools/AddService';
import HistoryController from './controllers/HistoryController';

type EditorContextType = {
  blockStore: BlockStore;
  blockCategoryStore: BlockCategoryStore;
  blockTypeSelectorService: BlockTypeSelectorService;
  buildService: BuildService;
  cableDrawingService: CableDrawingService;
  eraser: EraserService;
  gridStore: GridStore;
  tool: ToolService;
  sceneStore: SceneStore;
  sceneService: SceneService;
  serializer: Serializer;
  update: UpdateService;

  controllers: {
    game: GameController;
  };
};

export const isTestEnv = () => process.env.NODE_ENV === 'test';

export const setupEditor = () => {
  const historyController = new HistoryController(store);
  const gameStore = new GameStore(store);
  const blockStore = new BlockStore(store);
  const gridStore = new GridStore(blockStore, store);
  const sceneStore = new SceneStore();
  const toolStore = new ToolStore(store);
  const blockTypeStore = new BlockTypeStore(store);

  const transactionService = new TransactionService(blockStore, store, []);

  const sceneService = isTestEnv()
    ? new TestSceneService(blockStore, transactionService)
    : new SceneServiceImpl(blockStore, sceneStore);
  const factoryService = new FactoryService(blockTypeStore, sceneService);

  const toolService = new ToolService(sceneService, toolStore);

  const blockCategoryStore = new BlockCategoryStore(store, blockStore, {
    'delete-action': new DeleteAction(new EraserService(blockStore, transactionService)),
    'join-cable-action': new JoinCableAction(toolService),
  });

  const updateService = new UpdateService(blockStore, transactionService, sceneStore);

  const serializer = new Serializer(
    store,
    new BlockSerializer(store),
    new GameSerializer(store),
    new GridSerializer(store),
  );

  const gameController = new GameController(
    blockStore,
    gameStore,
    gridStore,
    sceneStore,
    serializer,
    store,
    transactionService,
  );

  const buildService = new BuildService(blockStore, blockTypeStore, gameStore, gridStore);

  const addService = new AddService(
    blockStore,
    blockTypeStore,
    buildService,
    electiricty
    factoryService,
    historyController,
    sceneStore,
    sceneService,
    transactionService,
  );

  const cableDrawingService = new CableDrawingService(
    blockStore,
    factoryService,
    gridStore,
    sceneService,
    sceneStore,
    transactionService,
  );

  buildService.setDrawServices([addService, cableDrawingService]);

  toolService.setTools([
    new AddTool(addService, blockStore, blockTypeStore, gridStore, sceneService, transactionService),
    new MoveTool(blockStore, gameStore, gridStore, sceneService, transactionService),
    new SelectTool(
      blockStore,
      blockCategoryStore,
      sceneService,
      sceneStore,
      toolStore,
      transactionService,
      sceneService,
    ),
    new EraseTool(blockStore, sceneService, transactionService),
    new RayTool(blockStore, transactionService, sceneStore),
    new CableTool(
      blockStore,
      blockTypeStore,
      buildService,
      cableDrawingService,
      sceneService,
      store,
      transactionService,
    ),
  ]);

  const blockTypeSelectorService = new BlockTypeSelectorService(blockTypeStore);

  const editorContext: EditorContextType = {
    blockCategoryStore: blockCategoryStore,
    blockStore: blockStore,
    blockTypeSelectorService,
    buildService,
    cableDrawingService,
    eraser: new EraserService(blockStore, transactionService),
    serializer,
    gridStore: gridStore,
    sceneStore: sceneStore,
    sceneService: sceneService,
    tool: toolService,
    update: updateService,

    controllers: {
      game: gameController,
    },
  };

  editorContext.sceneStore.setToolService(editorContext.tool);

  return editorContext;
};

export default EditorContextType;
