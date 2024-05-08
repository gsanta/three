import { EditorContext, EditorContextType } from '@/app/editor/EditorContext';
import { setUser } from '../../user/userSlice';
import { useAppDispatch } from '../hooks/hooks';
import { store } from '../utils/store';
import React, { ReactNode, useEffect, useMemo } from 'react';
import { Provider } from 'react-redux';
import AddTool from '@/client/editor/features/block/use_cases/add/AddTool';
import ToolService from '@/client/editor/features/tool/service/ToolService';
import SelectTool from '@/client/editor/features/block/use_cases/select/SelectTool';
import KeyboardService from '@/client/editor/features/tool/service/KeyboardService';
import GroupTool from '@/client/editor/features/block/use_cases/group/GroupTool';

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

const TestPage = ({ children }: ProtectedPageProps) => {
  const editorContext = useMemo<EditorContextType>(
    () => ({
      tool: new ToolService([new AddTool(store), new SelectTool(store), new GroupTool(store)], store),
      keyboard: new KeyboardService(store),
    }),
    [],
  );

  return (
    <EditorContext.Provider value={editorContext}>
      <Provider store={store}>{children}</Provider>
    </EditorContext.Provider>
  );
};

export default TestPage;
