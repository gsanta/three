import { EditorContext, EditorContextType } from '@/app/editor/EditorContext';
import { store } from '../utils/store';
import { ReactNode, useMemo } from 'react';
import { Provider } from 'react-redux';
import AddTool from '@/client/editor/controllers/tools/AddTool';
import ToolService from '@/client/editor/services/ToolService';
import SelectTool from '@/client/editor/controllers/tools/SelectTool';
import KeyboardService from '@/client/editor/services/KeyboardService';
import GroupTool from '@/client/group/GroupTool';
import ExportJson from '@/client/editor/controllers/io/ExportJson';
import ImportJson from '@/client/editor/controllers/io/ImportJson';
import EraseTool from '@/client/editor/controllers/tools/EraseTool';
import CableTool from '@/client/editor/controllers/tools/CableTool';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import RayTool from '@/client/editor/controllers/tools/RayTool';
import ColorTool from '@/client/editor/controllers/tools/ColorTool';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import TemplateStore from '@/client/editor/stores/template/TemplateStore';
import ToolStore from '@/client/editor/stores/tool/ToolStore';
import SceneServiceImpl from '@/client/editor/components/scene/SceneServiceImpl';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import ControllerService from '@/client/editor/services/controller/ControllerService';

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
  const templates = useMemo(() => new TemplateStore(store), []);
  const toolStore = useMemo(() => new ToolStore(store), []);
  const blockStore = useMemo(() => new BlockStore(store), []);
  const scene = useMemo(() => new SceneServiceImpl(sceneStore), [sceneStore]);
  const factoryService = useMemo(() => new FactoryService(blockStore, scene), [blockStore, scene]);
  const transaction = useMemo(() => new TransactionService(blockStore, store, scene), [blockStore, scene]);

  const editorContext = useMemo<EditorContextType>(
    () => ({
      controller: new ControllerService(transaction),
      exporter: new ExportJson(store),
      importer: new ImportJson(store),
      keyboard: new KeyboardService(store),
      scene: sceneStore,
      tool: new ToolService(
        [
          new AddTool(blockStore, factoryService, sceneStore, toolStore, transaction),
          new SelectTool(blockStore, scene, sceneStore, toolStore, transaction),
          new GroupTool(blockStore, transaction, templates),
          new CableTool(blockStore, factoryService, sceneStore, transaction),
          new EraseTool(blockStore, transaction),
          new RayTool(blockStore, transaction, sceneStore),
          new ColorTool(blockStore, transaction),
        ],
        store,
        toolStore,
      ),
      transaction,
    }),
    [blockStore, factoryService, sceneStore, toolStore, transaction, scene, templates],
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
