'use client';

import './app.scss';
import Layout from '../../client/common/components/globals/Layout';
import Canvas from '../../client/editor/ui/scene/components/Canvas';
import Header from '../../client/common/components/globals/Header';
import Toolbar from '../../client/editor/ui/tool/Toolbar';
import ProtectedPage from '../../client/common/components/globals/ProtectedPage';
import { useEffect } from 'react';
import { useAppDispatch } from '@/client/common/hooks/hooks';

import { Provider } from 'react-redux';
import { store } from '@/client/common/utils/store';
import { dispatchEditorData } from '@/client/editor/setupEditorData';
import EditorPageProps from './EditorPageProps';

const EditorPageContent = (props: EditorPageProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatchEditorData(props, dispatch);
  }, [dispatch, props]);

  return (
    <ProtectedPage>
      <Layout header={<Header />} footer={<div className="bg-orange-600 h-10" />}>
        <div className="w-[50px]">
          <Toolbar />
        </div>
        <Canvas />
        {/* <Split className="split" direction="horizontal" sizes={[75, 25]} minSize={250}>
          <Split className="split-vertical" direction="vertical" sizes={[50, 50]}>
            <Tabs display="flex" flexDir="column" isLazy>
              <TabList>
                <Tab>Tool</Tab>
                <Tab>Color</Tab>
              </TabList>
              <TabPanels alignItems="stretch" display="flex" flex="1" overflow="auto">
                <TabPanel flex="1" paddingInline={0}>
                  <ToolOptionsPanel />
                </TabPanel>
              </TabPanels>
            </Tabs>
            <Box overflowY="auto"></Box>
          </Split>
        </Split> */}
      </Layout>
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
