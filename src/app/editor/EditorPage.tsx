'use client';

import './app.scss';
import Canvas from '../../client/editor/ui/scene/components/Canvas';
import Header from '../../client/common/components/globals/Header';
import ProtectedPage from '../../client/common/components/globals/ProtectedPage';
import { useEffect } from 'react';
import { useAppDispatch } from '@/client/common/hooks/hooks';

import { Provider } from 'react-redux';
import { store } from '@/client/common/utils/store';
import { dispatchEditorData } from '@/client/editor/setupEditorData';
import EditorPageProps from './EditorPageProps';
import Toolbar from '@/client/editor/ui/tool/Toolbar';

const EditorPageContent = (props: EditorPageProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatchEditorData(props, dispatch);
  }, [dispatch, props]);

  return (
    <ProtectedPage>
      <header id="header">
        <Header />
      </header>
      <div className="flex h-[calc(100%-4rem)]">
        <div className="w-[50px]">
          <Toolbar />
        </div>
        <Canvas />
      </div>
    </ProtectedPage>
  );
};

const EditorPage = async (props: EditorPageProps) => {
  return (
    <Provider store={store}>
      <EditorPageContent {...props} />
    </Provider>
  );
};

export default EditorPage;
