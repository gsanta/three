import { EditorContext, EditorContextType } from '@/app/editor/EditorContext';
import { setUser } from '../../user/userSlice';
import { useAppDispatch } from '../hooks/hooks';
import { store } from '../utils/store';
import React, { ReactNode, useEffect, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import AddTool from '@/editor/features/block/service/AddTool';
import ToolService from '@/editor/services/tool/service/ToolService';
import SelectTool from '@/editor/features/block/service/SelectTool';
import KeyboardService from '@/editor/services/tool/service/KeyboardService';
import GroupTool from '@/editor/features/block/service/GroupTool';
import ExportJson from '@/editor/services/io/ExportJson';
import ImportJson from '@/editor/services/io/ImportJson';
import EraseTool from '@/editor/features/block/service/EraseTool';
import CableTool from '@/editor/features/block/service/CableTool';
import SceneService from '@/editor/services/scene/SceneService';
import RayHelperTool from '@/editor/features/block/service/RayHelperTool';
import ColorTool from '@/editor/features/block/service/ColorTool';
import BlockService from '@/editor/features/block/service/BlockService';

type ProtectedPageProps = {
  children: ReactNode;
};

const StoreSetup = ({ children }: { children: ReactNode }): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const globalProps = window.globalProps || { user: { isLoggedIn: false } };

    dispatch(setUser(globalProps.user));
  }, [dispatch]);

  return <>{children}</>;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false },
  },
});

const ProtectedPage = ({ children }: ProtectedPageProps) => {
  const scene = useMemo(() => new SceneService(), []);
  const blockFactory = useMemo(() => new BlockService(store), []);

  const editorContext = useMemo<EditorContextType>(
    () => ({
      tool: new ToolService(
        [
          new AddTool(store, blockFactory),
          new SelectTool(store, scene),
          new GroupTool(store),
          new CableTool(store, scene),
          new EraseTool(store),
          new RayHelperTool(store, scene),
          new ColorTool(store, scene),
        ],
        store,
      ),
      keyboard: new KeyboardService(store),
      exporter: new ExportJson(store),
      importer: new ImportJson(store),
      scene,
    }),
    [blockFactory, scene],
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
