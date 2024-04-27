import { EditorContext, EditorContextType } from '@/app/editor/EditorContext';
import { setUser } from '../../user/userSlice';
import { useAppDispatch } from '../hooks/hooks';
import { store } from '../utils/store';
import React, { ReactNode, useEffect, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import AddTool from '@/client/editor/features/block/service/AddTool';
import ToolService from '@/client/editor/services/tool/service/ToolService';
import SelectTool from '@/client/editor/features/block/service/SelectTool';
import KeyboardService from '@/client/editor/services/tool/service/KeyboardService';
import GroupTool from '@/client/editor/features/block/service/GroupTool';
import ExportJson from '@/client/editor/services/io/ExportJson';
import ImportJson from '@/client/editor/services/io/ImportJson';
import EraseTool from '@/client/editor/features/block/service/EraseTool';
import CableTool from '@/client/editor/features/block/service/CableTool';
import SceneService from '@/client/editor/services/scene/SceneService';
import RayHelperTool from '@/client/editor/features/block/service/RayHelperTool';
import ColorTool from '@/client/editor/features/block/service/ColorTool';
import UpdateService from '@/client/editor/features/block/service/UpdateService';
import MoveService from '@/client/editor/features/block/service/move/MoveService';
import BlockStore from '@/client/editor/features/block/service/BlockStore';

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
  const blockStore = useMemo(() => new BlockStore(store), []);
  const update = useMemo(() => new UpdateService(blockStore, store), [blockStore]);
  const moveService = useMemo(() => new MoveService(store), []);

  const editorContext = useMemo<EditorContextType>(
    () => ({
      tool: new ToolService(
        [
          new AddTool(blockStore, update),
          new SelectTool(blockStore, scene, moveService, update),
          new GroupTool(store),
          new CableTool(blockStore, scene, update),
          new EraseTool(blockStore, update),
          new RayHelperTool(store, scene),
          new ColorTool(blockStore, update),
        ],
        store,
      ),
      keyboard: new KeyboardService(store),
      exporter: new ExportJson(store),
      importer: new ImportJson(store),
      scene,
    }),
    [blockStore, update, scene, moveService],
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
