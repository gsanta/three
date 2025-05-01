'use client';

import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import './app.scss';
import Layout from '../../client/common/components/globals/Layout';
import Split from 'react-split';
import Canvas from '../../client/editor/ui/scene/components/Canvas';
import Header from '../../client/common/components/globals/Header';
import Toolbar from '../../client/editor/ui/tool/Toolbar';
import ToolOptionsPanel from '../../client/editor/ui/tool/ToolOptionsPanel';
import ProtectedPage from '../../client/common/components/globals/ProtectedPage';
import BlockCategoriesResponse from '@/common/response_types/BlockCategoriesResponse';
import BlockAddMethodsResponse from '@/common/response_types/BlockAddMethodsResponse';
import { useEffect } from 'react';
import { useAppDispatch } from '@/client/common/hooks/hooks';

import { Provider } from 'react-redux';
import { store } from '@/client/common/utils/store';
import BlockContextMenuActionsResponse from '@/common/response_types/BlockContextMenuActionsResponse';
import { dispatchEditorData } from '@/client/editor/setupEditorData';

type EditorPageProps = {
  blockAddMethods: BlockAddMethodsResponse['items'];
  blockCategories: BlockCategoriesResponse['items'];
  blockContextMenuActions: BlockContextMenuActionsResponse['items'];
};

const EditorPageContent = (props: EditorPageProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatchEditorData(props, dispatch);
  }, [dispatch, props]);

  return (
    <ProtectedPage>
      <Layout header={<Header />} footer={<Box bgColor="orange.600" height="40px"></Box>}>
        <Box width="50px">
          <Toolbar />
        </Box>
        <Split className="split" direction="horizontal" sizes={[75, 25]} minSize={250}>
          <Canvas />
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
        </Split>
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
