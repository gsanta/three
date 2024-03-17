import { EditorContext, EditorContextType } from '@/app/editor/EditorContext';
import { setUser } from '../../editor/features/user/userSlice';
import { useAppDispatch } from '../hooks/hooks';
import { store } from '../utils/store';
import React, { ReactNode, useEffect, useMemo } from 'react';
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
