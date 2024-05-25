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
import UpdateService from '@/client/editor/services/update/UpdateService';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import TemplateStore from '@/client/editor/stores/template/TemplateStore';
import ToolStore from '@/client/editor/stores/tool/ToolStore';
import SceneServiceImpl from '@/client/editor/components/scene/SceneServiceImpl';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
  const update = useMemo(() => new UpdateService(blockStore, store, scene), [blockStore, scene]);

  const editorContext = useMemo<EditorContextType>(
    () => ({
      tool: new ToolService(
        [
          new AddTool(blockStore, sceneStore, toolStore, update),
          new SelectTool(blockStore, scene, sceneStore, toolStore, update),
          new GroupTool(blockStore, update, templates),
          new CableTool(blockStore, sceneStore, update),
          new EraseTool(blockStore, update),
          new RayTool(blockStore, update, sceneStore),
          new ColorTool(blockStore, update),
        ],
        store,
        toolStore,
      ),
      keyboard: new KeyboardService(store),
      exporter: new ExportJson(store),
      importer: new ImportJson(store),
      scene: sceneStore,
    }),
    [blockStore, sceneStore, toolStore, update, scene, templates],
  );

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
