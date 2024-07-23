import { EditorContext, EditorContextType } from '@/app/editor/EditorContext';
import { store } from '../utils/store';
import { ReactNode, useMemo } from 'react';
import { Provider } from 'react-redux';
import AddTool from '@/client/editor/controllers/tools/add/AddTool';
import ToolService from '@/client/editor/services/ToolService';
import SelectTool from '@/client/editor/controllers/tools/SelectTool';
import KeyboardService from '@/client/editor/services/KeyboardService';
import ExportJson from '@/client/editor/controllers/io/ExportJson';
import ImportJson from '@/client/editor/controllers/io/ImportJson';
import EraseTool from '@/client/editor/controllers/tools/EraseTool';
import CableTool from '@/client/editor/controllers/tools/CableTool';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import RayTool from '@/client/editor/controllers/tools/RayTool';
import ColorTool from '@/client/editor/controllers/tools/ColorTool';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import ToolStore from '@/client/editor/stores/tool/ToolStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import ControllerService from '@/client/editor/services/controller/ControllerService';
import ElectricityStore from '@/client/editor/stores/electricity/ElectricityStore';
import ElectricitySystemHook from '@/client/editor/services/electricity/ElectricitySystemHook';
import SceneServiceImpl from '@/client/editor/components/scene/service/SceneServiceImpl';
import RoomModeTool from '@/client/editor/controllers/tools/RoomModeTool';

type ProtectedPageProps = {
  children: ReactNode;
};

const StoreSetup = ({ children }: { children: ReactNode }): JSX.Element => {
  return <>{children}</>;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false },
  },
});

const ProtectedPage = ({ children }: ProtectedPageProps) => {
  const sceneStore = useMemo(() => new SceneStore(), []);
  const toolStore = useMemo(() => new ToolStore(store), []);
  const blockStore = useMemo(() => new BlockStore(store), []);
  const scene = useMemo(() => new SceneServiceImpl(blockStore, sceneStore), [blockStore, sceneStore]);
  const factoryService = useMemo(() => new FactoryService(blockStore, scene), [blockStore, scene]);

  const electricityStore = useMemo(() => new ElectricityStore(), []);
  const electricitySystemHook = useMemo(
    () => new ElectricitySystemHook(blockStore, electricityStore),
    [blockStore, electricityStore],
  );

  const transaction = useMemo(
    () => new TransactionService(blockStore, store, scene, [electricitySystemHook]),
    [blockStore, scene, electricitySystemHook],
  );

  const editorContext = useMemo<EditorContextType>(
    () => ({
      controller: new ControllerService(transaction),
      exporter: new ExportJson(store),
      importer: new ImportJson(store),
      keyboard: new KeyboardService(store),
      scene: sceneStore,
      tool: new ToolService(
        [
          new AddTool(blockStore, factoryService, scene, sceneStore, transaction),
          new SelectTool(blockStore, scene, sceneStore, toolStore, transaction),
          new CableTool(blockStore, factoryService, scene, sceneStore, transaction),
          new EraseTool(blockStore, transaction),
          new RayTool(blockStore, transaction, sceneStore),
          new ColorTool(blockStore, transaction),
          new RoomModeTool(blockStore, scene, transaction),
        ],
        toolStore,
      ),
      transaction,
    }),
    [blockStore, factoryService, sceneStore, toolStore, transaction, scene],
  );

  editorContext.scene.setToolService(editorContext.tool);

  return (
    <QueryClientProvider client={queryClient}>
      <EditorContext.Provider value={editorContext}>
        <Provider store={store}>
          <StoreSetup>{children}</StoreSetup>
        </Provider>
      </EditorContext.Provider>
    </QueryClientProvider>
  );
};

export default ProtectedPage;
