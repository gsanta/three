import { EditorContext, EditorContextType } from '@/app/editor/EditorContext';
import { store } from '../utils/store';
import React, { ReactNode, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import AddTool from '@/client/editor/features/block/use_cases/add/AddTool';
import ToolService from '@/client/editor/features/tool/service/ToolService';
import SelectTool from '@/client/editor/features/block/use_cases/select/SelectTool';
import KeyboardService from '@/client/editor/features/tool/service/KeyboardService';
import GroupTool from '@/client/editor/features/block/use_cases/group/GroupTool';
import ExportJson from '@/client/editor/features/block/services/io/ExportJson';
import ImportJson from '@/client/editor/features/block/services/io/ImportJson';
import EraseTool from '@/client/editor/features/block/use_cases/erase/EraseTool';
import CableTool from '@/client/editor/features/block/use_cases/cable/CableTool';
import SceneStore from '@/client/editor/features/scene/SceneStore';
import RayTool from '@/client/editor/features/block/use_cases/ray/RayTool';
import ColorTool from '@/client/editor/features/block/use_cases/color/ColorTool';
import UpdateService from '@/client/editor/features/block/services/update/UpdateService';
import BlockStore from '@/client/editor/features/block/BlockStore';
import TemplateStore from '@/client/editor/features/template/TemplateStore';
import ToolStore from '@/client/editor/features/tool/ToolStore';
import SceneServiceImpl from '@/client/editor/features/scene/SceneServiceImpl';

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
  const blockStore = useMemo(() => new BlockStore(store), []);
  const update = useMemo(() => new UpdateService(blockStore, store), [blockStore]);
  const scene = useMemo(() => new SceneServiceImpl(sceneStore), [sceneStore]);
  const templates = useMemo(() => new TemplateStore(store), []);
  const toolStore = useMemo(() => new ToolStore(store), []);

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
