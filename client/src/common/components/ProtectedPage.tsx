import { EditorContext, EditorContextType } from '@/app/editor/EditorContext';
import { setUser } from '../../editor/features/user/userSlice';
import { useAppDispatch } from '../hooks/hooks';
import { store } from '../utils/store';
import React, { ReactNode, useEffect, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import AddTool from '@/editor/features/builder/AddTool';
import ToolService from '@/editor/features/tool/state/ToolService';
import SelectTool from '@/editor/features/builder/SelectTool';
import KeyboardService from '@/editor/features/tool/state/KeyboardService';
import GroupTool from '@/editor/features/builder/GroupTool';

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
  const editorContext = useMemo<EditorContextType>(
    () => ({
      tool: new ToolService([new AddTool(store), new SelectTool(store), new GroupTool(store)], store),
      keyboard: new KeyboardService(store),
    }),
    [],
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
