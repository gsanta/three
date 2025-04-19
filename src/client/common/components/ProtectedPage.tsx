import { EditorContext, EditorContextType } from '@/app/editor/EditorContext';
import { store } from '../utils/store';
import { ReactNode, useMemo } from 'react';
import AddTool from '@/client/editor/controllers/tools/add/AddTool';
import ToolService from '@/client/editor/services/ToolService';
import SelectTool from '@/client/editor/controllers/tools/SelectTool';
import KeyboardService from '@/client/editor/services/KeyboardService';
import ExportJson from '@/client/editor/controllers/io/ExportJson';
import ImportJson from '@/client/editor/controllers/io/ImportJson';
import EraseTool from '@/client/editor/controllers/tools/EraseTool';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import RayTool from '@/client/editor/controllers/tools/RayTool';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import ToolStore from '@/client/editor/stores/tool/ToolStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import ControllerService from '@/client/editor/services/controller/ControllerService';
import ElectricityStore from '@/client/editor/stores/electricity/ElectricityStore';
import ElectricitySystemHook from '@/client/editor/services/electricity/ElectricitySystemHook';
import SceneServiceImpl from '@/client/editor/components/scene/service/SceneServiceImpl';
import UpdateService from '@/client/editor/services/update/UpdateService';
import DataContext from '@/client/editor/contexts/DataContext';
import BlockTypeStore from '@/client/editor/stores/blockType/BlockTypeStore';
import BlockCategoryStore from '@/client/editor/stores/blockCategory/BlockCategoryStore';

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
  const blockTypeStore = useMemo(() => new BlockTypeStore(store), []);
  const blockCategoryStore = useMemo(() => new BlockCategoryStore(store), []);
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

  const updateService = useMemo(
    () => new UpdateService(blockStore, transaction, sceneStore),
    [blockStore, sceneStore, transaction],
  );

  const dataContext = useMemo(
    () => new DataContext(blockStore, blockCategoryStore, blockTypeStore),
    [blockCategoryStore, blockStore, blockTypeStore],
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
          new AddTool(dataContext, factoryService, scene, sceneStore, transaction),
          new SelectTool(blockStore, scene, sceneStore, toolStore, transaction),
          new EraseTool(blockStore, transaction),
          new RayTool(blockStore, transaction, sceneStore),
        ],
        toolStore,
      ),
      transaction,
      update: updateService,
    }),
    [transaction, sceneStore, dataContext, factoryService, scene, blockStore, toolStore, updateService],
  );

  editorContext.scene.setToolService(editorContext.tool);

  return (
    <QueryClientProvider client={queryClient}>
      <EditorContext.Provider value={editorContext}>
        <StoreSetup>{children}</StoreSetup>
      </EditorContext.Provider>
    </QueryClientProvider>
  );
};

export default ProtectedPage;
